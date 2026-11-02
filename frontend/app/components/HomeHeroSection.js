import Link from 'next/link'
import React from 'react'

export default function HomeHeroSection() {


  return ( 
      <section className="relative flex min-h-90 items-center justify-center pt-16">

        <div className="absolute inset-0 bg-black" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center text-white">

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Discover New
            <span className="text-orange-400"> Shops</span>
          </h1>

          <p className="mt-5 text-base text-gray-200 sm:text-lg">
            Explore Shops , discover new shops and book Now
            Shops near at  your home.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/"
              className="rounded-full bg-orange-600 px-7 py-2 font-semibold text-white transition hover:bg-orange-700"
            >
              Explore All Types Shops
            </Link>

            <Link
              href="/about"
              className="rounded-full border border-white px-7 py-2 font-semibold text-white transition hover:bg-white hover:text-gray-900"
            >
              Learn More
            </Link>

          </div>

        </div>
      </section>

  )
}
