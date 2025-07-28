import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import path from "path";
const registerUser = asyncHandler(

    async (req, res) => {

        // get user details from frontend
        // validation 
        // check if user already exists: username, email
        // check for images, check for avatar
        // upload them to cloudinary
        // create user object - create entry in db
        // remove password and refresh token field from response
        // check for user createion 
        // return response

        const { fullName, email, userName, password } = req.body
        //  console.log("email :", email);
        console.log("FILES RECEIVED:", req.files);

        if (
            [fullName, email, userName, password].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const existedUser = await User.findOne({
            $or: [{ userName }, { email }]
        })
        if (existedUser) {
            throw new ApiError(409, "User email or username already exits")
        }
        const avatarLocalPath = req.files?.avatar[0]?.path;
        // const avatarLocalPath = path.resolve(req.files?.avatar[0]?.path);
        // const coverImageLocalPath = req.files?.coverImage[0]?.path;
        // const coverImageLocalPath = path.resolve(req.files?.coverImage[0]?.path);

        let coverImageLocalPath;
        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
            coverImageLocalPath = rwq.files.coverImage[0].path
        }


        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar files is required")
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        console.log("Avatar upload result:", avatar);
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if (!avatar) {
            throw new ApiError(400, "Avatar file is required")
        }

        const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            userName: userName.toLowerCase()
        })

        const createduser = await User.findById(user._id).select(
            "-password -refershToken"
        )

        if (!createduser) {
            throw new ApiError(500, "Something went wrong while while register the user")
        }

        return res.status(201).json(
            new ApiResponse(200, createduser, "User register successfully")
        )
    }
)


export { registerUser };
