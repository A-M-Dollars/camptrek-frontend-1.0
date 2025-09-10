import { Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { arrowButton } from '@/public/svgs/svgs-file'
import bannerPhoto from '@/public/packages/Family-experience-at-kichwa-tembo-and-beyond.jpg'

type HeroProps = {
    scrollToAbout: () => void;
};

function Herosection({ scrollToAbout }: HeroProps) {
    return (
        <div>
            <div className="overflow-x-hidden bg-[url('/images/bg-5.jpeg')] bg-cover bg-center
 bg-no-repeat xl:bg-none flex items-center xl:hidden">
                <div className='mt-[400px] xl:mt-0 text-center h-full
                 xl:brightness-100 xl:bg-black bg-white/50 shadow-lg'>
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
                </div>
            </div>
            <div className="hidden xl:block xl:overflow-x-hidden xl:relative xl:h-screen xl:w-screen ">
                {/* Background Video */}
                <video
                    className="absolute brightness-60 top-0 left-0 min-w-full min-h-full object-cover -z-10"
                    src="/hero/herovid.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                {/* Content on top */}
                <div className="relative z-10  h-full text-black">
                    <div className='grid grid-cols-5 place-items-center gap-2 
                    h-[70px] mt-20 bg-white w-[35%] ml-10 rounded'>
                        <img src={bannerPhoto.src} alt="bannerPhoto" className='col-span-1 w-[780px] h-[70px]' />
                        <p className='flex place-items-center col-span-3 uppercase text-[12px]'>
                            Introducing our popular safari packages
                        </p>
                        <div onClick={scrollToAbout} className='bg-[#FD6D0D] w-[60px] h-[50px] 
                        flex place-items-center justify-center col-span-1 rounded cursor-pointer'>
                            {arrowButton}
                        </div>
                    </div>
                    <div className='mt-[15%] flex justify-end'>
                        <div className='w-[15%] mr-10'>
                            <p className='mb-5 text-white text-[18px]'>
                                Explore, discover, and unwind in Africa
                            </p>
                            <Link href={'/safaris'}>
                                <button
                                    className='bg-[#FD6D0D] text-white cursor-pointer
                                h-[70px] w-full mr-10 uppercase text-[14px] rounded
                                '>
                                    All Our Safari Packages
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Herosection