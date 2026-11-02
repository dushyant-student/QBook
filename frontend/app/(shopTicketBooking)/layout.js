import React from 'react'
import Footer from '../components/Footer'
import { getMeServer } from '@/services/getMeServer';
import HomeNavBar from '../components/HomeNavBar';
import { redirect } from 'next/navigation';

export default async function layout({children}) {

  const user =  await getMeServer();
  
    if ( ! user || user?.length === 0 ){
      redirect("/login")
    }

  return (
    <div>
        <HomeNavBar/>
        <div className=' flex flex-col justify-center items-center mt-20' >
        {children}

        </div>
        <Footer/>
    </div>
  )
}
