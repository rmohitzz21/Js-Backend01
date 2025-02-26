// Importing the Router module from Express to define routes
import { Router } from 'express';

// Importing the registerUser controller function from the user controller file
import { registerUser } from '../controllers/user.controller.js';

const router = Router(); // Creating a new router instance

// Defining a POST route for user registration
// When a POST request is made to "/register", the registerUser function will handle it
router.route("/register").post(registerUser);

// Defining a POST route for user login (commented out for now)
// router.route("/login").post(loginUser);

export default router; // Exporting the router as the default export for use in other files
