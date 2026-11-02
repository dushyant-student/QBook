import express from "express";
import { ChangeTiming, getShopTiming } from "../controllers/TimeScheduleController.js";


const router = express.Router();

router.put("/change-timing/:id", ChangeTiming);
router.get("/shop-timing/:id", getShopTiming);

export default router;