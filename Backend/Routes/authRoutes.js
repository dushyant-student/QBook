import express from "express";

import {
    getServerProfile,
    Login,
    Logout,
    Register,
    updateProfile
} from "../controllers/authController.js";

import { getMe } from "../controllers/AuthMeControllers.js";

import { protect } from "../middleaware/protect.js";
import upload from "../middleaware/multer.js";


const authuRoutes = express.Router();

// Check currently logged-in user
authuRoutes.get("/me", getMe);


// Register
authuRoutes.post("/register", Register);


// Login
authuRoutes.post("/login", Login);

//Logout
authuRoutes.get("/logout",Logout);


//Get Login profile
authuRoutes.get( "/get-my-profile",protect,  getServerProfile );


// Update profile
authuRoutes.put( "/update-profile", protect, upload.single("imageURL"), updateProfile);


export default authuRoutes;