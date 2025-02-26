// Import necessary modules
import mongoose, { Schema } from "mongoose"; // Mongoose for database interaction
import jwt from "jsonwebtoken"; // JSON Web Token for authentication
import bcrypt from "bcrypt"; // Bcrypt for password hashing

// Define the User Schema with fields and validation rules
const userSchema = new Schema(
    {
        // Username field (unique and indexed for faster queries)
        username: {
            type: String,
            required: true,
            unique: true,    // Ensures usernames are unique
            lowercase: true, // Converts to lowercase to maintain consistency
            trim: true,      // Removes extra spaces
            index: true      // Optimizes search queries
        },

        // Email field (unique)
        email: {
            type: String,
            required: true,
            unique: true,    // Ensures no duplicate emails
            lowercase: true, // Converts to lowercase for consistency
            trim: true       // Removes spaces before/after email
        },

        // Full name of the user
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true // Indexed for optimized search performance
        },

        // Avatar (profile picture) - URL stored (e.g., Cloudinary)
        avtar: {
            type: String,
            required: true,
        },

        // Optional cover image for profile
        coverImage: {
            type: String
        },

        // Watch History - Stores video references (One-to-Many relationship)
        watchHistory: [
            {
                type: Schema.Types.ObjectId, // Stores ObjectId references
                ref: "Video" // Refers to the Video model
            }
        ],

        // Password field (hashed before saving)
        password: {
            type: String,
            required: [true, 'Password is required'] // Validation error message
        },

        // Refresh Token for user authentication
        RefreshToken: {
            type: String
        },

    },
    {
        timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// 🔹 **Mongoose Pre-save Middleware** - Hash Password Before Saving
userSchema.pre("save", async function (next) {
    // If the password is not modified, skip hashing
    if (!this.isModified("password")) return next();

    // Hash the password with 10 salt rounds
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// 🔹 **Method to Compare Entered Password with Stored Hashed Password**
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// 🔹 **Method to Generate Access Token for Authentication**
userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key from environment variables
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Token expiry time
        }
    );
};

// 🔹 **Method to Generate Refresh Token for Authentication**
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.REFRESH_TOKEN_SECRET, // Secret key for refresh tokens
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Expiry for refresh token
        }
    );
};

// Export the User model to use it in other parts of the application
export const User = mongoose.model("User", userSchema);
