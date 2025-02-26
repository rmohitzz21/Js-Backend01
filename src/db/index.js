// Import mongoose to interact with MongoDB
import mongoose from "mongoose";

// Import the database name from the constants file
import { DB_NAME } from "../constants.js";

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using Mongoose
        // `process.env.MONGODB_URL` contains the MongoDB connection string from environment variables
        // `${DB_NAME}` is the database name imported from constants.js
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

        // Log a success message with the database host information
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        // Log the error message if the connection fails
        console.log("MONGODB connection error ", error);
        
        // Exit the process with failure (1) to prevent running the application without a database connection
        process.exit(1);
    }
}

// Export the function to use it in other parts of the application
export default connectDB;
