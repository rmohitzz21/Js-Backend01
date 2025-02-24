// Importing required modules
import express from "express"; // Express is a web framework for Node.js used to build APIs and web applications
import cors from "cors"; // CORS (Cross-Origin Resource Sharing) middleware to allow requests from different origins
import cookieParser from "cookie-parser"; // Middleware to parse cookies in incoming requests

// Creating an instance of Express application
const app = express();

// Configuring CORS to allow requests from a specific origin
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allowed origin set via environment variables
    Credential: true // This should be "credentials" instead of "Credential" (case-sensitive)
}));

// Middleware to parse JSON request bodies with a size limit of 16kb
app.use(express.json({
    limit: "16kb"
}));

// Middleware to parse URL-encoded request bodies with a size limit of 16kb
app.use(express.urlencoded({
    extended: true, // Allows nested objects in URL-encoded data
    limit: "16kb"
}));

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));

// Middleware to parse cookies in incoming requests
app.use(cookieParser());

// Exporting the app instance for use in other files
export { app };
