"use client"

import BookingCard from '@/app/ComponentsClient.js/BookingCard'
import DocterInfo from '@/app/ComponentsClient.js/DocterInfo'
import NotFound from '@/app/not-found';
import { ShopOwnerProfileById } from '@/services/createShopServices';
import React, { use, useEffect, useState } from 'react'

export default function page({params}) {
   
    const [shopKepperProfile , setShopKepperProfile ] = useState();
    const { id } = use(params)

    const CallData = async()=>{
         if (!/^[a-fA-F0-9]{24}$/.test(id)) {
            NotFound();
        }
        try{
            const response = await ShopOwnerProfileById(id);
            setShopKepperProfile(response)

        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        CallData()
    },[id])
    
    
    return (
        <div className='mt-10 flex flex-col gap-10 ' >
            
            <DocterInfo ShopOwnerInfo = {shopKepperProfile?.data } />
            <BookingCard openTime={shopKepperProfile?.data?.openTime}  closeTime={shopKepperProfile?.data?.closeTime} shopId = {id} />
            
        </div>
    )
}
