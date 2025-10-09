'use client'

import Aboutus from '@/components/landing/about-us-section/about-us'
import Herosection from '@/components/landing/hero-section/hero-section'
import Partners from '@/components/landing/partners-section/partners'
import CustomCarousel from '../../components/landing/custom-features/carousel'
import CustomCard from '../../components/landing/custom-features/custom-card'
import { baseInstance } from '@/constants/apis'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import React, { useRef } from 'react'
import { ItineraryProp} from '@/constants/itinerary'
import Link from 'next/link'
import Reviews from '@/components/landing/review-section/reviews'

const Landing = () => {

  const params = useParams()
  const handleFetch = async () => {
    const response = await baseInstance.get('/itineraries/', { params })
    return response.data
  }

  const { data: tours, isLoading } = useQuery({
    queryKey: ['toursList', params],
    queryFn: handleFetch,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 35
  })

  const aboutRef = useRef<HTMLDivElement>(null)

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FD6D0D]"></div>
          <p className="text-white text-lg mt-4">Camptrek Safaris loading .....</p>
        </div>
      </div>
    )
  }

  return (
    <div className='overflow-x-hidden'>
      <div className='h-[40%] xl:h-[65%]'>
        <Herosection
          scrollToAbout={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
        />
      </div>
      {/* everything below is for the tour section */}
      <div ref={aboutRef} className="overflow-x-hidden xl:brightness-100 bg-[black] text-white pb-10 px-[0.5] py-5 xl:py-10">
        <div className="ml-[10px] xl:ml-[55px]">
          <div className="mb-10 xl:ml-10">
            <h1 className="font-semibold text-[#FD6D0D] text-[24px] md:text-[32px]">POPULAR SAFARI ITINERARIES</h1>
            <div className="text-[14px] mt-4 font-light">
              <p>
                When you travel with us we will ensure you get the best seamless safari experience throughout your vacation.
                <br />
                You will not have to worry about overspending on your travel budget, hidden costs, or unreliable communication
                <br />
                that you might get from inexperienced tour operators.
              </p>
            </div>
          </div>

          <div>
            <Link href="/safaris">
              <p className='flex justify-end mr-10 mb-2 underline text-[#FD6D0D] cursor-pointer capitalize'>
                see all safaris
              </p>
            </Link>
            <CustomCarousel>
              {tours?.itineraries && tours.itineraries.length > 0 ? (
                tours.itineraries.map((tour: ItineraryProp) => (
                  <CustomCard key={tour.id} {...tour} />
                ))
              ) : (
                <div className="hidden">Tours coming up</div>
              )}
            </CustomCarousel>
          </div>
        </div>
      </div>

      {/* it ends here */}
      <Aboutus />
      {/* <Reviews /> */}
      <Partners />
    </div>
  )
}

export default Landing