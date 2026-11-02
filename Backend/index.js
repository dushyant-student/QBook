import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express"
import authuRoutes from "./Routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import createShopRoutes from "./Routes/createShopeRotes.js";
import bookingRoutes from "./Routes/bookingRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import dashRoutes from "./Routes/dashboardRoutes.js";
import historyRoutes from "./Routes/historyRoutes.js";
import noticeRoutes from "./Routes/noticeRoutes.js";
import shopNotificationRoutes from "./Routes/genralNotification.js";
import ChangeTimeRoutes from "./Routes/changeTimeRoutes.js";
import { searchShops } from "./controllers/shopSearchController.js";
import contactRoutes from "./Routes/contactRoutes.js";


export const app = express();

//Db connection 
connectDB();
connectCloudinary();

app.use(express.json({ limit: "10kb" }));
        
const allowedOrigins = (process.env.API_URL || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// app.use((req, res, next) => {
//             console.log("========== INCOMING REQUEST ==========");
//             console.log("METHOD:", req.method);
//             console.log("URL:", req.originalUrl);

//             console.log("RAW COOKIE HEADER:", req.headers.cookie);
//             console.log("PARSED COOKIES:", req.cookies);

//             next();
//         });
        
        


app.use("/api/auth",authuRoutes);
app.use("/api" ,createShopRoutes);
app.use("/api/booking" ,bookingRoutes);
app.use("/api/dashboard",dashRoutes);
app.use("/api/history",historyRoutes)
app.use("/api/notice",noticeRoutes)
app.use("/api/genral", shopNotificationRoutes);
app.use("/api",ChangeTimeRoutes)
app.get("/api/shops/search", searchShops);
app.use("/api", contactRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


