
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 255,
    },
    // email will be unique, unlike name, which can have duplicates
    email: {
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        minLength: 2,
        maxLength: 255,
    },
})