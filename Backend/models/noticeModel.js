import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
    {   
        name:{
             type: String,
            required:true,
        },
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shops",
            required: true
        },
        shopName:{
            type: String,
            required:true,
        },
        type: {
            type: String,
            required:true,
        },

        message: {
            type: String,
            required: true
        },
        email:{
            type:String,
            required:true,

        },
        title:{
            type: String,
            required:true,
        },
        phone:{
          type:String,
          required:true
        }
        

    },
    {
        timestamps: true
    }
);

const noticeModel = mongoose.model("NoticePrivate", noticeSchema);

export default noticeModel;