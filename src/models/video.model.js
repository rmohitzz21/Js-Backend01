// Import necessary modules
import mongoose, { Schema } from "mongoose"; // Mongoose for MongoDB interaction
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // Pagination plugin

// Define the Video Schema
const videoSchema = new Schema(
    {
        // Video file URL (stored in Cloudinary or another CDN)
        videoFile: {
            type: String,
            required: true,
        },

        // Thumbnail image URL for the video
        thumbnail: {
            type: String,
            required: true    
        },

        // Title of the video
        title: {
            type: String,
            required: true
        },

        // Description of the video
        description: {
            type: String,
            required: true
        },

        // Duration of the video in seconds
        duration: {
            type: Number,
            required: true
        },

        // View count (default is 0)
        views: {
            type: Number,
            default: 0
        },

        // Publish status of the video (default is true)
        isPublished: {
            type: Boolean,
            default: true
        },

        // Reference to the user who uploaded the video (One-to-Many relationship)
        owner: {
            type: Schema.Types.ObjectId, // Stores ObjectId of the User
            ref: "User" // Links to the User model
        }
    },
    {
        timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// 🔹 **Enable Pagination Support for Aggregation Queries**
videoSchema.plugin(mongooseAggregatePaginate);

// Export the Video model to use in other parts of the application
export const Video = mongoose.model("Video", videoSchema);
