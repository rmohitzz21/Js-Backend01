// Importing the 'multer' package for handling file uploads in Express
import multer from "multer";

// Configuring the storage engine for Multer
const storage = multer.diskStorage({
    // Setting the destination folder where uploaded files will be stored
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // Files will be stored inside the "public/temp" directory
    },

    // Naming the uploaded file (keeps the original filename)
    filename: function (req, file, cb) {
        // If needed, you can generate a unique filename using a timestamp and random numbers
        // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        
        cb(null, file.originalname); // Saves the file with its original name
    },
});

// Creating an instance of Multer with the specified storage configuration
const upload = multer({
    storage, // Using the configured storage engine
});

// Exporting 'upload' so it can be used in routes for handling file uploads
export { upload };
