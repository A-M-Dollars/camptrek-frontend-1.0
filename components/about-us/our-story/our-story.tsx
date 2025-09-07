import Image from 'next/image'
import React from 'react'
import lion from '@/public/about-us/lion.jpg'
import { dash } from '@/public/svgs/svgs-file'

const Ourstory = () => {
  return (
    <div className='
    xl:p-5 xl:place-items-center xl:mt-10 overflow-x-hidden
    '>
      <div className='xl:flex xl:flex-row xl:place-items-center mb-5 xl:mb-20 
      ml-10 mr-10 xl:ml-0 xl:mr-0
      '>
        <span className='hidden xl:block xl:mr-5'>{dash}</span>
        <h1
          className='xl:font-medium xl:text-[48px] uppercase text-[#ED1C24]
          text-[30px] font-semibold mt-5 text-[30px]
          '>
          Our Story
        </h1>
        <span className='xl:hidden xl:mr-5'>{dash}</span>
      </div>
      <div className='xl:grid xl:grid-cols-1 xl:gap-20'>
        <div className='xl:flex xl:flex-row xl:gap-30'>
          <div className='xl:mt-10'>
            <p className='xl:font-light xl:text-[12px] xl:uppercase xl:mb-10 mb-5
            text-gray-600 xl:text-black text-[14px] ml-10 mr-10 xl:ml-0 xl:mr-0
            '>
              Camptrek Safaris was envisioned by our director, driven by the belief that <br /> everyone should experience
              the incredible beauty of East Africa at a fair <br /> price. Whether you choose a luxurious safari or
              a budget-friendly <br /> adventure, we ensure that the price is fair and the quality uncompromised.
            </p>
            <p className='xl:font-light xl:text-[12px] xl:uppercase
            text-gray-600 xl:text-black text-[14px] ml-10 mr-10 xl:ml-0 xl:mr-0 mb-5 xl:mb-0
            '>
              We promise flexibility, dedication, and an unparalleled safari experience. <br />
              Our cheerful and experienced guides, skilled consultants who arrange <br />
              the best itineraries, and our commitment to using top equipment like high-end <br />
              binoculars make every safari unique. Instant customer support <br />
              ensures your adventure is seamless from start to finish.
            </p>
          </div>
          <div className='border w-[385px]'>
            <div className='xl:hidden xl:flex xl:flex-row xl:place-items-center 
            mb-10 mt-10 xl:mb-20 ml-10 mr-10 xl:ml-0 xl:mr-0
            '>
              <h1
                className='xl:font-medium xl:text-[48px] uppercase
                text-[#ED1C24] text-[30px] font-semibold text-[30px]
                '>
                Our team
              </h1>
              <span className='xl:hidden xl:mr-5'>{dash}</span>
            </div>
            <div className='ml-10 mr-10 xl:ml-0 xl:mr-0'>
              <div className='h-[316px] w-[300px] xl:w-[383px] overflow-hidden'>
                <Image
                  src={lion} alt='CAMPTREK DIRECTION'
                  style={{ objectFit: 'cover' }}
                  className='w-full h-full' />
              </div>
              <div className='p-5'>
                <p>John Mburu</p>
                <p>CAMPTREK Safaris, Director</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row gap-30'>
          <div className='ml-10 mr-10 xl:ml-0 xl:mr-0'>
            <div className='h-[316px] w-[300px] xl:w-[383px] overflow-hidden'>
              <Image
                src={lion} alt='CAMPTREK DIRECTION'
                style={{ objectFit: 'cover' }}
                className='w-full h-full' />
            </div>
            <div className='p-5'>
              <p>John Mburu</p>
              <p>CAMPTREK Safaris, Director</p>
            </div>
          </div>
          <div className='xl:mt-10 hidden xl:block'>
            <p className='font-light text-[12px] uppercase mb-10'>
              Camptrek Safaris was envisioned by our director, driven by the belief that <br /> everyone should experience
              the incredible beauty of East Africa at a fair <br /> price. Whether you choose a luxurious safari or
              a budget-friendly <br /> adventure, we ensure that the price is fair and the quality uncompromised.
            </p>
            <p className='font-light text-[12px] uppercase'>
              We promise flexibility, dedication, and an unparalleled safari experience. <br />
              Our cheerful and experienced guides, skilled consultants who arrange <br />
              the best itineraries, and our commitment to using top equipment like high-end <br />
              binoculars make every safari unique. Instant customer support <br />
              ensures your adventure is seamless from start to finish.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ourstory