'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { ratingStar, clockIcon } from '@/public/svgs/svgs-file'
import { ItineraryProp } from '@/constants/itinerary'


const CustomCard = ({ images, title, location, duration, price, discount, id }: ItineraryProp) => {
    const router = useRouter()
    const handleClick = () => {
        router.push(`/safaris/${id}`)
    }

    return (
        <div onClick={handleClick} className='flex-wrap h-full cursor-pointer border border-gray-500 md:w-[10cm]'>
            <div className="relative bg-cover bg-center h-[258px] w-full"
                style={{ backgroundImage: `url(${images[0].image.url})` }}>
                <div className="absolute top-0 right-0 m-2">
                    <p className="bg-[#FD6D0D] text-white text-sm px-3 py-1">
                        {discount}% OFF
                    </p>
                </div>
            </div>

            <div className='justify-between items-center p-2 mx-5'>
                <div className="mr-6 xl:mr-6 xl:flex xl:flex-row items-center xl:justify-between w-full">
                    <p className='xl:mr-4 h-[20px] mb-10'>{title}</p>
                </div>
                <p className='text-gray-500 text-[14px]'>{location}</p>
                <div className='flex flex-row gap-2 items-center text-[14px] mt-3'>
                    {clockIcon}
                    <p>{duration} Days</p>
                </div>
            </div>
            <hr className='m-3 border-gray-500' />
            <div className='flex flex-row justify-between items-center p-4'>
                <div>
                    <p className='xl:text-[24px] font-semibold'>{price} USD</p>
                    <p className='font-light text-[10px] xl:text-[12px]'>PER PERSON</p>
                </div>
                <div>
                    <button className='bg-[#FD6D0D] text-[12px] xl:text-case font-light p-2 w-[100px] xl:w-[118px] xl:h-[39px] cursor-pointer'>BOOK NOW</button>
                </div>
            </div>
        </div>
    )
}

export default CustomCard