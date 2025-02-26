// Importing the asyncHandler utility function to handle asynchronous errors gracefully
import { asyncHandler } from "../utils/asyncHandler.js"; 

// Defining the registerUser function, which handles user registration
// Wrapping it inside asyncHandler to catch and handle errors automatically
const registerUser = asyncHandler(async (req, res) => {
    // Sending a success response with a 200 status code
    res.status(200).json({
        message: "User registered successfully",
    });
});

export { registerUser };
