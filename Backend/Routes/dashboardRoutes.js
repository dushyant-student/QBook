import express from "express" ;


import { dashBoardDetails } from "../controllers/dashboardControllers.js"
import { protect } from "../middleaware/protect.js"

const dashRoutes = express.Router()
dashRoutes.get("/",protect ,dashBoardDetails)


export default dashRoutes ;