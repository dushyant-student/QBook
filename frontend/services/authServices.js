import api from "@/lib/axios";



export const RegisterService =async (formData)=>{
    const response = await api.post("/auth/register",formData);
    return response.data ;
}


export const LoginService = async (formData)=>{
    const response = await api.post("/auth/login",formData);
    return response.data ;
}

export const FetchProfile = async()=>{
    const response =  await api.get("/auth/get-my-profile")
    return response.data ;
}

export const UpdateService = async(formData)=>{
    const response = await api.put("/auth/update-profile",formData);
    return response.data ;
}

export const LogoutService = async()=>{
    const response = await api.get("/auth/logout");
    return response.data ;
    
} 
