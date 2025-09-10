import { Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Herosection() {
    return (
        <div className="overflow-x-hidden bg-[url('/images/bg-5.jpeg')] bg-cover bg-center
        bg-no-repeat xl:bg-none]
        xl:bg-cover xl:bg-center xl:bg-no-repeat xl:brightness-70 flex items-center">
            <div className='mt-[400px] xl:mt-0 text-center h-full
            xl:brightness-100 xl:bg-black
            bg-white/50 shadow-lg
            '>
                <h1
                    className='text-[20px]
                    xl:text-[80px] font-black 
                    mb-1 text-black pt-5 xl:text-[#FD6D0D]'>
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
                        className='bg-[#FD6D0D] text-white p-2 xl:p-2.5 
                    w-[70%] xl:w-[16%] mt-3 xl:mt-5 text-[12px] xl:text-[14px]
                    uppercase mb-10 cursor-pointer '>
                        Browse Our Packages
                    </button>
                </Link>
                <div className='relative h-screen w-screen overflow-hidden'>
                    <iframe
                        src="https://www.canva.com/design/DAGyjQtP4MI/fwoseGa9H2Pae7H5TBTsZQ/watch?embed&loop=1&autoplay=1&muted=1&controls=0"
                        width="100%"
                        height="600"
                        // frameborder="0"
                        allowFullScreen
                        allow="autoplay">
                    </iframe>


                    {/* Content on top */}
                    <div className="relative z-10 flex items-center justify-center h-full text-white">
                        <h1 className="text-5xl font-bold">Welcome</h1>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Herosection