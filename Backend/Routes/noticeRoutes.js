import express from "express" ;
import { getALlNotices, getNoticeById, NoticeController } from "../controllers/noticeController.js";


const noticeRoutes = express.Router()
noticeRoutes.get("/give-all/:shopId",getALlNotices);

noticeRoutes.post("/:shopId",NoticeController); //create a Shop Notice 
noticeRoutes.get("/:noticeId",getNoticeById); // find notice by id 

export default noticeRoutes ;

