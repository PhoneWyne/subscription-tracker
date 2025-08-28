import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater than zero'],        
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'PKR'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'learning', 'other'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
    },
    startDate: {
        type: Date,
        required: true,
        // validator runs on each startDate
        // message is output, if validator returns false (inputted value didn't meet the condition)
        validate: {
            // value is less or equal than new Date() => new Date() is current date
            // this condition is saying entered startDate must be before current date, aka startDate must be in the past
            // since, we cannot book/acquire subscriptions in the future
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            // this does not work with arrow functions 
            // validator: (value) => value > this.startDate,
            validator: function (value) {
                // comparing it with startDate of whatever instance it's being entered against
                return value > this.startDate 
            },
            message: 'Renewal date must be after the start date',
        }
    },
    // foreign key
    user: {
        // id of referene to existing user model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        // optimize queries by indexing the user field
        index: true,
    }
}, { timestamps: true})

// .pre() ran before document is created and saved to db
// using this. , so use function() {}, not arrow functions () => {}
// auto-calculate renewal date if missing
subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        // adding renewalPeriods to startDate on basis of frequency we passed
        // startDate = Jan 1st, frequency = Monthly (30 days)
        // renewalDate = Jan 1st + 30 days => Jan 31st
        this.renewalDate.setDate(this.renewalDate.getDate() + this.renewalDate[this.frequency]);
    }

    // auto-update the status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

    // makes creation of document proceed on
    next();
});