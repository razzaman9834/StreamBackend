import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req,res)=>{
    //get user details from frontend
    //validation- not empty
    //check if user already exists
    //check for avatar
    //upload them to cloudinary
    //create user object - create entry in db
    //remove pwd and refresh token from response
    //response check for user creation
    //return res

    const {fullName,email,username,password} = req.body;
    console.log("data",fullName);


    if ([fullName,email,username,password].some((field)=>{
            field?.trim() === ""
    })) {
        throw new ApiError(400,"All fields is required")
    }

    const existedUser = User.findOne({
        $or: [{fullName},{email}]
    })

    if (existedUser) {
        throw new ApiError(409,"User with email or username Exists")
    }

    const avataLocalPath =req.files?.avatar[0]?.path;

    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avataLocalPath) {
        throw new ApiError(400,"avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avataLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName, avatar : avatar.url , coverImage: coverImage?.url || "" , email , password , username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering thr user")
    }

   return res.status(201).json(
    new ApiResponse(200 , createdUser, "User registered Successfully" )
   )


       
})

export {registerUser,}