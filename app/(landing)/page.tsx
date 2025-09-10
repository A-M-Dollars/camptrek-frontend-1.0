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
import { Itinerary } from '@/constants/itinerary'

const Landing = () => {

  const params = useParams()
  const handleFetch = async () => {
    const response = await baseInstance.get('/itineraries', { params })
    return response.data
  }

  const { data: tours } = useQuery({
    queryKey: ['toursList', params],
    queryFn: handleFetch,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 35
  })

  const aboutRef = useRef<HTMLDivElement>(null)

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div className='overflow-x-hidden'>
      <Herosection scrollToAbout={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}/>
      {/* everything below is for the tour section */}
      <div  ref={aboutRef} className="overflow-x-hidden xl:brightness-100 bg-[black] text-white pb-10 px-4 py-5 xl:py-10">
        <div className="ml-[15px] xl:ml-[55px]">
          <div className="mb-10 xl:ml-10">
            <h1 className="font-semibold text-[#FD6D0D] text-[32px]">POPULAR SAFARI ITINERARIES</h1>
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

          <CustomCarousel>
            {tours?.itineraries && tours.itineraries.length > 0 ? (
              tours.itineraries.map((tour: Itinerary) => (
                <CustomCard key={tour.id} {...tour} />
              ))
            ) : (
              <div className="hidden">Tours coming up</div>
            )}
          </CustomCarousel>
        </div>
      </div>

      {/* it ends here */}
      <Aboutus />
      <Partners />
    </div>
  )
}

export default Landing