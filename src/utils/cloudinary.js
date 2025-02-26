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
        if(!localFilePath){
            throw new Error("File path is required");
        }
        // Upload the file to Cloudinary
       const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Automatically detect the file type

        })
        // file has been uploaded successfully
        console.log("File uploaded successfully", response.url);
        return response

        
    } catch (error) {
        
        fs.unlinkSync(localFilePath); // Delete the file from the local storage
        return null;

    }
}

export { uploadOnCloudinary };