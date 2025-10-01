'use client'

import React from 'react'
import { ItineraryProp } from '@/constants/itinerary'
import { useRouter } from 'next/navigation'
import { useFilterStore } from '@/store/filterstore'
import fallbackimage from '@/public/images/bg-5.jpeg'

const ShowCaseCards = ({ id, discount, title, location, duration, price, images, overview }: ItineraryProp) => {

    const imageUrl = images?.[0]?.image?.url || fallbackimage

    const currency = useFilterStore(state => state.currency)
    const rates = {
        USD: 1,
        KES: 130,
        EUR: 0.92,
        GBP: 0.78,
    }

    const convertedPrice = Number((price * rates[currency]).toFixed(2))



    const truncateWords = (text: string, wordlimit = 10) => {
        const words = text.split(' ');
        if (words.length <= wordlimit) return text;
        return words.slice(0, wordlimit).join(' ') + '...';
    }

    const tripDescription = truncateWords(overview, 18);

    const router = useRouter()
    const handleClick = () => {
        router.push(`/safaris/${id}`)
    }

    return (
        <div onClick={handleClick} className='border mt-4 cursor-pointer'>
            <div
                className="relative bg-cover bg-center h-[200px] xl:h-[150px] w-full"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <div className="absolute top-0 right-0 m-2">
                    {discount && discount > 0 && (
                        <p className="bg-[#FD6D0D] text-white px-3 py-1 text-[10px]">
                            {discount}% OFF
                        </p>
                    )}
                </div>
            </div>

            <div className='justify-between items-center p-4'>
                <div className="w-full mb-1">
                    <p className='mr-4 font-semibold text-[12px] mb-1'>{title}</p>
                    <p className='text-[10px] opacity-[75%] font-light ' >{tripDescription}</p>
                </div>
                <p className='text-[primary] text-[10px] font-light mb-1'>{location}</p>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row items-center text-[10px] font-light opacity-[75%]'>
                        <p>{duration} Days</p>
                    </div>
                </div>
            </div>
            <hr className='m-3' />
            <div className='flex flex-row justify-between items-center p-4'>
                <div>
                    <p className='text-[14px] font-semibold'>{convertedPrice} {currency}</p>
                    <p className='font-light text-[10px]'>PER PERSON</p>
                </div>
                <div>
                    <button className='bg-[#FD6D0D] text-white text-[10px] font-light p-2 w-[80px] h-[30px] cursor-pointer'>BOOK NOW</button>
                </div>
            </div>
        </div>
    )
}

export default ShowCaseCards