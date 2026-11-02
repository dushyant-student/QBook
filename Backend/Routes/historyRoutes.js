import express from "express" ;
import { callMyShopStatus, historyData } from "../controllers/historyControllers.js";


const historyRoutes = express.Router()
historyRoutes.get("/all/:shopId",historyData);
historyRoutes.get("/current-status/:shopId",callMyShopStatus);

export default historyRoutes ;