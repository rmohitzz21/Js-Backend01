// Importing the asyncHandler utility function to handle asynchronous errors gracefully
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"; 
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

// Defining the registerUser function, which handles user registration
// Wrapping it inside asyncHandler to catch and handle errors automatically
const registerUser = asyncHandler(async (req, res) => {
    

    // Validation
   const {fullname, email, username, password} =  req.body // Get User Details From Frontend
    console.log("fullname : ",fullname);

    if (
        [fullname, email, username, password].some((field) =>  field?.trim() === "")
    ){
        throw new ApiError(400, "All Fields Are Required")
    }

    // check if user already exists : Username and Emai
    const existedUser  =await User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email and username Already Exists")
    }

    console.log("req.files : ",req.files);
    

    // Check For image, Avatar
   const avtarLocalPath =  req.files?.avtar[0]?.path // Check For image, Avatar

//    const coverImageLocalPath = req.files?.coverImage[0]?.path 
   
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
        coverImageLocalPath = req.files.coverImage[0].path
    }

   if (!avtarLocalPath){
         throw new ApiError(400, "Avtar Image is Required")
   }

   // Upload  them to cloudinary, avtar

   const avtar = await uploadOnCloudinary(avtarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avtar){
       throw new ApiError(500, "Avtar is required")
   }

    // create user object - create entry in database

    const user = await User.create({
        fullname,
        avtar: avtar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // remove password and refresh token from response


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // check user creation

    if(!createdUser){
        throw new ApiError(500, "User Creation Failed")
    }

    // return response

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
});


export { registerUser };


// ---------- Step For Register User -----------
// Get User Details From Frontend
// Validation
// check if user already exists : Username and Email
// Check For image, Avatar
// Upload  them to cloudinary, avtar : - // cloudinary is a cloud service that offers a solution to a problem that developers often face: managing images and videos.
// create user object - create entry in database
// remove password and refresh token from response
// check user creation
// return response



