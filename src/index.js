// Importing required modules
import dotenv from "dotenv"; // dotenv is used to load environment variables from a .env file
import connectDB from "./db/index.js"; // Importing the database connection function
import { app } from "./app.js"; // Importing the Express app instance

// Configuring dotenv to load environment variables from the specified file
dotenv.config({
    path: "./env",
});

// Establishing database connection and starting the server
connectDB()
    .then(() => {
        // Listening on the specified port after a successful DB connection
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is Running at Port: ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed!!!", err);
    });

/* ==============================
   Alternative Approach:
   Using an IIFE (Immediately Invoked Function Expression)
   ============================== */

// import mongoose from "mongoose";
// import { DB_NAME } from "./constant"; // Assuming this file contains the database name

// import express from "express";
// const app = express();

// (async () => {
//     try {
//         // Connecting to MongoDB with a dynamically set database name
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

//         // Handling application-level errors
//         app.on("error", (error) => {
//             console.log("ERROR:", error);
//             throw error;
//         });

//         // Starting the server after successful DB connection
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         });

//     } catch (err) {
//         console.log("Error:", err);
//         throw err;
//     }
// })();
