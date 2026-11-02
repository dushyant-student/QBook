import axios from "axios";
import { cookies } from "next/headers";

export const api = async () => {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    const headers = {};

    if (token) {
        headers.Cookie = `token=${token}`;
    }

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers,
    });
};

