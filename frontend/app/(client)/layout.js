import React from "react";
import HomeNavBar from "../components/HomeNavBar";

export default function Layout({ children }) {
  return (
    <div className=" min-h-screen w-full bg-white">

        <HomeNavBar/>

        <main className="min-w-0 flex-1">
          {children}
        </main>
    

    </div>
  );
}