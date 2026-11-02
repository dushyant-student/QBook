import mongoose from "mongoose";


const userShopSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        passWord: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        experience: {
            type: String,
            required: true
        },
        shopName: {
            type: String,
            required: true
        },
        country: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        shopImage: {
            type: String,
            required: true
        },
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        public_id :{
            type:String,
            required:true
        },
        openTime: {
            type:String,
            default:"9:00",
        },
        closeTime: {
            type:String,
            default:"6:00"
          },

    },
    {
        timestamps: true
    }

)

const ShopModel = mongoose.model("Shops", userShopSchema);

export default ShopModel;