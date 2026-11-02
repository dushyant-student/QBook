import express from "express";
import { sendContactMessage } from "../controllers/contactController.js";
import contactLimiter from "../middleaware/contactLimiter.js";


const contactRoutes = express.Router();

contactRoutes.post("/contact",contactLimiter, sendContactMessage);

export default contactRoutes;