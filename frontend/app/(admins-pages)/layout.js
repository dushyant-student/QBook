import React from "react";
import NaveBar from "../shopComponents/NaveBar";
import SideBar from "../components/SideBar";
import { getMeServer } from "@/services/getMeServer";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  
  const user =  await getMeServer();
  
  
  if ( ! user ){
    redirect("/login")
  }


  return (
    <div className="flex min-h-screen w-full bg-white">
      
      <SideBar />

      <section className="flex min-w-0 flex-1 flex-col">
        <NaveBar />

        <main className="min-w-0 flex-1">
          {children}
        </main>
      </section>

    </div>
  );
}