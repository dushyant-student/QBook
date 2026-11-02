import express from "express";
import { deleteCustomer, deleteTicket, MyTickets, MyCustomers, Ticket, confirmCustomer } from "../controllers/ticketController.js";
import { protect } from "../middleaware/protect.js";



const bookingRoutes = express.Router();

bookingRoutes.post("/ticket/:shopId" ,protect , Ticket) ;

bookingRoutes.get("/my-tickets/:userId", protect  , MyTickets);

bookingRoutes.get("/my-all-customers/:userId",protect ,MyCustomers) 

bookingRoutes.delete("/cancle-ticket/:customerId",protect ,deleteTicket)



// Shop Owner routes 
bookingRoutes.delete("/shopowner-deleteCustomer",protect, deleteCustomer)

bookingRoutes.delete("/shopowner-confirmCustomer",protect, confirmCustomer)


export default bookingRoutes ;
