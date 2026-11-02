import { cookies } from "next/headers";

export async function getMeServer() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    API_URL = process.env.BACKEND_API_URL;
    if (!token) {
        return null;
    }
   

    try {
        const response = await fetch(
            `${API_URL}/auth/me`,
            {
                method: "GET",
                headers: {
                    Cookie: `token=${token}`,
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            console.log("Auth failed:", response.status);
            return null;
        }

        return await response.json();

    } catch (error) {
        console.error("requireAuth fetch error:", error);
        return null;
    }
}