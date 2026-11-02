import mongoose from "mongoose";

const TimeSchema = new mongoose.Schema(
    {

        shopId:{
            type:String,
            required:true
        },
        openTime:{
            type:String,
            required:true
        },
        closeTime:{
            type:String,
            required:true
        }

    }
)

const TimeModel = mongoose.model("Time",TimeSchema);
export default TimeModel ;