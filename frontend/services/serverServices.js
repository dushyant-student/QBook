import { serverApi } from "@/lib/server-api";


//My tickets Services 
export const myTickets = async(userId)=>{
    return serverApi(`/booking/my-tickets/${userId}`) ;
}