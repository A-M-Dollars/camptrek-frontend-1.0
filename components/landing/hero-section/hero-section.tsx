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
            <div className="overflow-x-hidden relative w-screen ">
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
                <div className="relative z-10 mb-10 xl:mb-0  h-full text-black">
                    <div className='grid grid-cols-5 place-items-center gap-2 
                    h-[70px] mt-15 xl:mt-20 bg-white xl:w-[35%] ml-2 mr-2 xl:mr-2 xl:ml-10 rounded'>
                        <img src={bannerPhoto.src} alt="bannerPhoto" className='col-span-1 h-15 ml-2 xl:ml-0 rounded xl:rounded-0 xl:w-[780px] xl:h-[70px]' />
                        <p className='flex place-items-center col-span-3 uppercase text-[12px]'>
                            Introducing our popular safari packages
                        </p>
                        <div onClick={scrollToAbout} className='bg-[#FD6D0D] w-[60px] h-[50px] 
                        flex place-items-center justify-center col-span-1 mr-2 rounded cursor-pointer'>
                            {arrowButton}
                        </div>
                    </div>
                    <div className='mt-[80%] xl:mt-[45%] flex justify-end'>
                        <div className=' w-[50%] xl:w-[15%] mr-10'>
                            <p className='mb-5 text-white text-[14px] xl:text-[18px]'>
                                Explore, discover, and unwind in Africa
                            </p>
                            <Link href={'/safaris'}>
                                <button
                                    className='bg-[#FD6D0D] text-white cursor-pointer
                                 h-[50px] xl:h-[60px] w-full mr-10 uppercase text-[12px] xl:text-[14px] rounded
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