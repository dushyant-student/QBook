import express from "express";
import { getShopNotifications } from "../controllers/Gen_notifi_controllers.js";


const shopNotificationRoutes = express.Router();

shopNotificationRoutes.get("/shop-notifications", getShopNotifications);

export default shopNotificationRoutes;