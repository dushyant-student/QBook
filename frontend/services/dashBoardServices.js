import { serverApi } from "@/lib/server-api";

export const getDashBordDetails= async()=>{
    return serverApi("/dashboard");

}