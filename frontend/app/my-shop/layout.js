import React from 'react'
import NaveBar from '../shopComponents/NaveBar'
import { getMeServer } from '@/services/getMeServer'
import { redirect } from 'next/navigation';


export default async function layout({children}) {
 const user =  await getMeServer();
   
   if ( ! user ){
 
     redirect("/login")
 
   }

  return (
    <>
      <NaveBar />
      
      <div className='mt-20' >
        {children}
      </div>
    
    </>
    
  )
}
