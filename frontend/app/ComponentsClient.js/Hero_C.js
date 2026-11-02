"use client"

import Link from 'next/link'
import React from 'react'
import ShowTime from '../components/ShowTime'

export default function Hero_C({ shopImg, shopId, openTime, closeTime }) {

  return (
    <>
      <section className="mb-7 flex flex-col py-2 md:flex-row min-h-31 justify-around items-center overflow-hidden rounded-xl border border-blue-100 bg-linear-to-r from-[#edf7ff] to-[#eaf5ff]">
        <div className="flex rounded-xl " >
          <img src={shopImg} className='h-50  object-cover rounded-xl ' />
        </div>

        <ShowTime openTime={openTime} closeTime={closeTime} />


        <div className="flex flex-col relative">
          <img
            src="/image/waiting.png"
            alt="Waiting"
            className="w-64 h-64 object-cover"
          />

          <Link
            href={`/book-ticket/${shopId}`}
            className="absolute bottom-8 left-0 w-full rounded-xl bg-blue-400 px-4 py-2 text-center text-lg font-bold text-white hover:bg-blue-500 animate-stretch"
          >
            Book Ticket
          </Link>
        </div>


      </section>

    </>
  )
}
