import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


export const getMe = async (req, res) => {
  try {

    const token = req.cookies?.token;
    console.log("TOKEN in BACKEND GET-ME:- ", token);

    if (!token) {
      return res.status(201).json({
        success: false,
        user: null,
      });
    }


    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    

    const user = await userModel
      .findById(decoded.id)
      .select("-passWord");


    if (!user) {
      return res.status(404).json({
        success: false,
        user: null,

      });
    }


    return res.status(200).json({
      success: true,
      user,

    });
  } catch (error) {
    // Token invalid or expired
    console.log(error)
    return res.status(200).json({
      success: false,
      user: null,

    });
  }
}

