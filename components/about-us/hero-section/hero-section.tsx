import Image from 'next/image'
import React from 'react'

import lion from '@/public/about-us/lion.jpg'
import rhino from '@/public/about-us/rhino.jpg'
import elephant from '@/public/about-us/elephant.jpg'
import leopard from '@/public/about-us/leopard.jpeg'
import bufallo from '@/public/about-us/bufallo.jpg'

import serve from '@/public/about-us/serve.png'


const bigFive = [lion, rhino, elephant, leopard, bufallo]
const Herosection = () => {
    return (
        <div className='mt-5'>
            <div className='xl:place-items-center'>
                <h1 className='
                text-[35px] xl:text-[48px] font-semibold uppercase
                ml-10 mr-10
                '>
                    Africa is a feeling — an unforgettable one
                </h1>
                <img
                    src={serve.src} alt="serving" height={400} width={400}
                    className='scale-x-[-1] p-8 xl:hidden '
                />
                <p className='
                xl:font-light xl:uppercase text-[14px] xl:mb-8
                text-gray-600 ml-10 mr-10
                '>
                    Experience the soul of Africa — where untamed beauty,
                    rich culture, and breathtaking wildlife <br /> create a safari
                    journey that touches the heart and lingers for a lifetime.
                </p>
            </div>
            <div className='hidden xl:flex xl:flex-row justify-center'>
                {bigFive.map((src, index) => (
                    <div key={index} style={{ height: '446px', width: '279px', overflow: 'hidden' }}>
                        <Image
                            src={src}
                            alt="the big five"
                            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                            className="p-[1px]"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Herosection