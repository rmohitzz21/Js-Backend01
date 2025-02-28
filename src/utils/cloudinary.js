import {v2 as cloudinary} from "cloudinary"; // Import v2 from "cloudinary" library
import fs from "fs"; // Import the file system module

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret
});

// Function to upload files to Cloudinary



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("File path is required");
        }

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Automatically detect the file type
        });

        console.log("File uploaded successfully:", response.url);

        // Delete the file from local storage asynchronously
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting local file:", err);
            }
        });

        return response; // Return the uploaded file response

    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);

        // Ensure the file is deleted even if upload fails
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting local file after failure:", err);
            }
        });

        return null; // Indicate failure
    }
};


export { uploadOnCloudinary };