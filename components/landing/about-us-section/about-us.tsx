import Image from 'next/image'
import React from 'react'
import { camptreksignImage } from '@/public/svgs/svgs-file'


const giraffImage = '/images/TranspaGira.png'


function Aboutus() {
    return (
        <div className='over-flow-hidden text-black bg-white'>
            <div className='mt-10 ml-5 xl:ml-25'>
                <h1 className='font-semibold text-[30px] text-[#FD6D0D] xl:text-[32px]'>WHY CHOOSE CAMPTREK SAFARIS ?</h1>
                <p className='text-[14px] mt-2 text-gray-600 font-light'>
                    GET FIRST-HAND INSIGHTS ABOUT THE DESTINATIONS YOU WILL VISIT <br />
                    FROM EXPERTS ON THE GROUND.
                </p>
            </div>
            <div className='flex w-full'>
                <Image src={giraffImage} alt={'Giraffe'} height={200} width={700} className="hidden xl:block xl:w-[45%]" />
                <div className="hidden xl:block xl:w-[10%] xl:height-full xl:mt-40">
                    {camptreksignImage}
                </div>
                <div className=" xl:w-[45%] mt-5 xl:mt-30 pr-15 ml-5 xl:ml-0 xl:pr-25">
                    <div className='flex flex-row mb-15 mt-15'>
                        <div className='bg-[#FD6D0D] h-[70px] xl:h-[70px] w-[140px] xl:w-[70px] flex justify-center items-center'>
                            <h1 className='text-white  font-extrabold text-[32px]'>01</h1>
                        </div>
                        <div className='ml-10'>
                            <h2 className='text-[20px] font-semibold text-[#FD6D0D]'>The Best Travel Destinatios</h2>
                            <p className='text-[14px] mt-2 text-gray-600'>
                                Plan your dream vacation with a safari to Kenya, <br /> Tanzania, and Zanzibar.
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className='flex flex-row mb-15 mt-15'>
                        <div className='bg-[#FD6D0D] h-[70px] xl:h-[70px] w-[140px] xl:w-[70px] flex justify-center items-center'>
                            <h1 className='text-white  font-extrabold text-[32px]'>02</h1>
                        </div>
                        <div className='ml-10'>
                            <h2 className='text-[20px] font-semibold text-[#FD6D0D]'>All-inclusive Africa Safari Tours</h2>
                            <p className='text-[14px] mt-2 text-gray-600'>
                                Combining thrilling Big Cat tracking, the Great <br /> Wildebeest Migration, and Big Five encounters in <br /> the world-famous Masai Mara and Serengeti.
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className='flex flex-row mb-15 mt-15'>
                        <div className='bg-[#FD6D0D] h-[70px] xl:h-[70px] w-[160px] xl:w-[70px] flex justify-center items-center'>
                            <h1 className='text-white  font-extrabold text-[32px]'>03</h1>
                        </div>
                        <div className='ml-10'>
                            <h2 className='text-[20px] font-semibold text-[#FD6D0D]'>The perfect blend of wildlife and relaxation</h2>
                            <p className='text-[14px] mt-2 text-gray-600'>
                                After your safari, you can unwind with a luxurious <br /> beach escape in Zanzibar or Diani, creating the <br /> perfect blend of wildlife and relaxation. A vacation <br /> like no other!
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className='mt-10 mb-5 flex justify-center items-center'>
                        <button className='bg-[#FD6D0D] font-light text-[16px] text-white p-4 cursor-pointer'>GET TO KNOW MORE ABOUT US</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutus