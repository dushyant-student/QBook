"use client";

import { LoginService, LogoutService, RegisterService, } from "@/services/authServices";
import { myShopData } from "@/services/createShopServices";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getShopNotifications } from "@/services/genNotifiServices";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myShopInfo, setMyshopInfo] = useState(null);
  const userId = user?._id;
  const [viewALL, setViewAll] = useState(false)
  const [genNotification, setGenNotification] = useState(null);
  const [noti_len, setNoti_len] = useState(0);



  // CHECK AUTH USER
  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );


        const data = await response.json();

        if (!mounted) return;

        if (response.ok && data?.success) {

          setUser(data.user);

        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);

        if (mounted) {
          setUser(null);
        }

      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    getUser();

    return () => {
      mounted = false;
    };
  }, []);





  // 2. Register
  const register = async (formData) => {
    try {
      const data = await RegisterService(formData);

      if (!data.success || !data.user) {
        throw new Error(data.message || "Registration failed");
      }

      setUser(data.user);
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };



  // 3. Login
  const login = async (formData) => {
    try {
      const data = await LoginService(formData);

      if (!data.success || !data.user) {

        throw new Error(data.message || "Login failed");
      }

      setUser(data.user);
      return data;
    } catch (error) {
      // console.error("Login error:", error.response?.data?.message);
      throw error;
    }
  };



  // 4. Fetch logged-in user's shop
  const ShopInfo = useCallback(async (userId) => {
    if (!userId) {
      setMyshopInfo(null);
      return;
    }

    try {
      const response = await myShopData(userId);

      // console.log("Shop API response:", response);

      if (response.success) {
        setMyshopInfo(
          Array.isArray(response.data)
            ? response.data[0] || null
            : response.data || null
        );
      } else {
        setMyshopInfo(null);
      }

      // console.log("Shop info fetched:", response.data);
    } catch (error) {
      console.error("Shop info error:", error);
      setMyshopInfo(null);
    }
  }, []);



  //Logout
  const logout = async () => {
    try {
      const response = await LogoutService();

      setUser(null);
      setMyshopInfo(null);

      return response;
    } catch (err) {
      console.error("Logout failed:", err);
      throw err;
    }
  };



  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await getShopNotifications();

        setGenNotification(response?.data || null);
        setNoti_len(response?.data?.length ?? 0);
      } catch (error) {
        console.error("Notification fetch failed:", error);
      }
    };

    fetchNotification();
  }, []);




  // 6. Fetch shop whenever userId changes
  useEffect(() => {
    if (!isLoading) {
      ShopInfo(userId);
    }
  }, [userId, isLoading, ShopInfo]);


  // console.log("USERRRR****** FROM USEAUTH",user,noti_len,genNotification,myShopInfo)
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        register,
        login,
        myShopInfo,
        logout,
        viewALL,
        setViewAll,
        genNotification,
        noti_len
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}