import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    try {
        // GET TOKEN FROM COOKIE
        const token = req.cookies?.token;

       
        // console.log("========== PROTECT ==========");
        // console.log("COOKIES:", req.cookies);
        // console.log("TOKEN FROM BACKEND:", token);


        // TOKEN NOT FOUND
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please Login",
            });
        }


       
        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        

        // FIND USER
        const user = await User
            .findById(decoded.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


       
        req.user = user;
        next();

    } catch (error) {
        console.log("PROTECT ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
