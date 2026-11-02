import "server-only";
import { cookies } from "next/headers";


const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function serverApi(endpoint, options = {}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`${API_URL}${endpoint}`,
        {
            ...options,
            headers: {
                ...options.headers,
                ...(token ? { Cookie: `token=${token}` } : {}),
            },
            cache: "no-store",
        });

    if (!response.ok) {
        throw new Error(`API failed: ${response.status}`);
    }

    return response.json();
}