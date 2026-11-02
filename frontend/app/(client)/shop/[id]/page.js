"use client"

import { Bell } from "lucide-react";
import DocterInfo from "../../../ComponentsClient.js/DocterInfo";
import TurnInfo from "../../../ComponentsClient.js/TurnInfo_C";
import Hero_C from "../../../ComponentsClient.js/Hero_C";
import { ShopOwnerProfileById } from "@/services/createShopServices";
import { myAllCustomers } from "@/services/bookingTicketService";
import Footer from "@/app/components/Footer";
import { use, useEffect, useState } from "react";
import { useAuth } from "@/context/authProvider";
import { useRouter } from "next/navigation";


export default  function AppointmentPage({ params }) {
  const [ShopOwnerInfo, setShopOwnerInfo] = useState([]);
  const [tableData, setTableData] = useState([]);

  const { id } = use(params);
  let shopId = id ;
  
  const { user ,isLoading  } =  useAuth();
  const router = useRouter();

  useEffect(() => {
  if (isLoading) return;

  if (!user) {
    router.replace("/login");
  }
}, [user, isLoading, router]);


const dataCall = async () => {
    try {
      const response = await ShopOwnerProfileById(shopId);
      
      setShopOwnerInfo(response?.data || []);

      const response2 = await myAllCustomers(shopId);
      setTableData(response2 )
     


    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    dataCall()
  }, [id,isLoading])

 
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#102d57] pt-16 ">
      <main className="mx-auto max-w-365 px-5 py-6 lg:px-8">
        <Hero_C shopImg={ShopOwnerInfo.shopImage} shopId={ShopOwnerInfo?.shopId} openTime={ShopOwnerInfo?.openTime} closeTime={ShopOwnerInfo?.closeTime} />
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,2fr)_365px]">
          <TurnInfo TableData={tableData?.data} shopId = {shopId} />
          <DocterInfo ShopOwnerInfo={ShopOwnerInfo} />
        </div>

     
        <section className="mt-5 flex items-center rounded-xl border border-blue-100 bg-gradient-to-r from-[#0b7bc5] to-[#f0faff] px-6 py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100">
            <Bell
              size={22}
              className="text-blue-600"
            />
          </div>

          <div>
            <p className="font-bold text-blue-800">
              We will notify you when it&apos;s your turn.
            </p>

            <p className="text-sm text-[#a2c6f8]">
              Please keep this page open.
            </p>
          </div>

        </section>

      </main>
      <Footer />
    </div>
  );
}
