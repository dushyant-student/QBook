"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

export default function Back_View({shopId}) {
   
    const router = useRouter();

    return (
        <div className="flex justify-between items-center gap-3 mt-6">

           
            <button
                onClick={() => router.back()}
                className=" cursor-pointer rounded-lg  border-gray-300 bg-green-100 px-5 py-2 font-semibold text-gray-700 transition hover:bg-green-200 active:scale-95"
            >
                ← Back
            </button>


        
           
            <button
                onClick={() => router.push(`/shop/${shopId}`)}
                className="rounded-lg cursor-pointer bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            >
                Visit Shop →
            </button>

        </div>
    )
}
