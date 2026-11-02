import api from "@/lib/axios";

export const CreateShop = async(shopId,formData)=>{
    const response = await api.post(`/create-shop/${shopId}`,formData);
    return response.data ;
}


export const UpdateShop = async(shopId,formData)=>{
    const response = await api.post(`/update-shop/${shopId}`,formData);
    return response.data ;
}



export const myShopData = async(shopId)=>{
    const response = await api.get(`/my-shop-data/${shopId}`);
    return response.data ;
}



export const getAllShop = async()=>{
    const response = await api.get("/all-shops");
    return response.data;
}



export const ShopOwnerProfileById = async (shopId)=>{  
     
    const response = await api.get(`/shop-by-id/${shopId}`)
    
    return response.data ;

}

