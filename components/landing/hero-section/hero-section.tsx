import Link from 'next/link'
import React from 'react'

function Herosection() {
    return (
        <div className="overflow-x-hidden bg-[url('/images/bg-5.jpeg')] bg-cover bg-center
        bg-no-repeat xl:bg-[url('/images/bg-3.jpg')]
        xl:bg-cover xl:bg-center xl:bg-no-repeat xl:brightness-70 flex items-center">
            <div className='mt-[400px] text-center h-full
            xl:brightness-100 xl:bg-black
            bg-white/50 shadow-lg
            '>
                <h1
                    className='text-[20px]
                    xl:text-[80px] font-black 
                    mb-1 text-black pt-5 xl:text-white'>
                    EXPLORE.DISCOVER.UNWIND
                </h1>
                <div
                    className='text-[10px] xl:text-[12px] text-black xl:text-white
                    uppercase xl:font-light px-10 xl:px-40'>
                    <p>Journey through the iconic Masai Mara and Serengeti as
                        you track majestic Big Cats, witness the awe-inspiring Great
                        Wildebeest Migration, and encounter the legendary Big Five. After the thrill,
                        relax on pristine beaches for a luxurious coastal escape.
                        It&apos;s the perfect balance of excitement and serenity—an unforgettable
                        vacation awaits!</p>
                </div>
                <Link href={'/safaris'}>
                    <button
                        className='bg-[#ED1C24] text-white p-2 xl:p-2.5 
                    w-[70%] xl:w-[16%] mt-3 xl:mt-5 text-[12px] xl:text-[14px]
                    uppercase mb-10 cursor-pointer '>
                        Browse Our Packages
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Herosection