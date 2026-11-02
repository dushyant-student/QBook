import mongoose from "mongoose";

const bookingHistoryScheme = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shops",
            required: true
        },

        tokenNo: {
            type: Number,
            required: true
        },
        subject:{
            type:String,
            required:true
        } ,
        method:{
            type:String,
            required:true,

        },
        status:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
);

const bookingHistoryModel = mongoose.model("histories", bookingHistoryScheme);

export default bookingHistoryModel ;