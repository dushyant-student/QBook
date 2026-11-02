import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
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

        status: {
            type: String,
            default: "Active"
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

        }
    },
    {
        timestamps: true
    }
);

const ticketModel = mongoose.model("Ticket", ticketSchema);

export default ticketModel;