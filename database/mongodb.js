import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";


if(!DB_URI){
    throw new Error("PLease define the MONGODB_URI environemtn variable insde the .env.<developlment/production>.local");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV} mode` );
    } catch (error) {
        console.error("Error connecting to database: ", error);
        // exit process, .exit, code for exit is 1
        process.exit(1);
    }
}

export default connectToDatabase;