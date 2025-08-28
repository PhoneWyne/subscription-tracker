
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        // [true/false, "validation message incase key is missing"]
        required: [true, 'User Name is required'],
        // trim removes leading and trailing whitespaces
        trim: true,
        minLength: 2,
        maxLength: 255,
    },
    // email will be unique, unlike name, which can have duplicates, but email will be unique to everyone
    email: {
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        // email tend to be true
        lowercase:true,
        minLength: 2,
        maxLength: 255,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    // no trim, or any string operations on password
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minLength: 6,
    }
}, { timestamps: true });
// timestamps: true, creates createdAt, updatedAt fields automatically


const User = mongoose.model('User', userSchema);

export default User;