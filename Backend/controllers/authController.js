import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";


// GENERATE JWT + HTTP ONLY COOKIE After Login
export const generateToken = (res, userId) => {
    const token = jwt.sign(
        {
            id: userId,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "3d",
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000,
        path: "/",
    });

    return token;
};



// REGISTER

export const Register = async (req, res) => {
    try {
        const { name, email, passWord } = req.body;

        if (!name || !email || !passWord) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                user:[],
                success: false,
                message: "User already exists",
            });
        }

        const hashPassword = await bcrypt.hash(passWord, 10);

        const user = await userModel.create({  name,  email,  passWord: hashPassword, });

        return res.status(201).json({
            success: true,
            message: "Register Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.log("REGISTER Fault:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// LOGIN

export const Login = async (req, res) => {
    try {
        const { email, passWord } = req.body;

        if (!email || !passWord) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details",
            });
        }
        

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Account/profile doesn't exist",
            });
        }



        const matchPassword = await bcrypt.compare(
            passWord,
            user.passWord
        );



        if (!matchPassword) {
            return res.status(401).json({
                success: false,
                message: "Password does not match",
            });
        }

      
        
        generateToken(res, user._id.toString());
        

        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.log("LOGIN Fault:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};



// GET MY PROFILE
export const getServerProfile = async (req, res) => {
    try {
       

        if (!req?.user || !req?.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized User Credentials",
            });
        }

        const profile = await userModel
            .findById(req.user?.id)
            .select("-passWord");

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        return res.status(200).json({
            success: true,
            profile,
        });
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE PROFILE

export const updateProfile = async (req, res) => {
    try {
       
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const user = await userModel.findById(req.user?.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        // Update name
        if (req.body.name) {
            user.name = req.body?.name;
        }

        // Update email
        if (req.body.email) {
            user.email = req.body?.email;
        }

        // Update description
        if (req.body.description) {
            user.description = req.body?.description;
        }

        // Update profile image
        if (req.file) {
            // Delete old image
            if (user.public_id) {
                await cloudinary.uploader.destroy(
                    user.public_id
                );
            }

            // Upload new image
            const result = await cloudinary.uploader.upload(
                req.file.path
            );

            user.imageURL = result.secure_url;
            user.public_id = result.public_id;
        }

        // Update password
        if (req.body?.passWord) {
            if (req.body?.passWord.length < 6) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Password must be at least 6 characters long",
                });
            }

            user.passWord = await bcrypt.hash(
                req.body.passWord,
                10
            );
        }

        const updatedUser = await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            data: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                description: updatedUser.description,
                imageURL: updatedUser.imageURL,
            },
        });
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// LOGOUT

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Logout successfully",
        });
    } catch (error) {
       

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};