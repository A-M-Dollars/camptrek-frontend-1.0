"use client"

import Image from 'next/image'
import React from 'react'
import part1 from '@/public/about-us/part1.png'
import part2 from '@/public/about-us/part2.png'
import { dash, readmore, whatsAppIcon } from '@/public/svgs/svgs-file'
import Link from 'next/link'

type blogList = {
  blog_id: string,
  blog_title: string,
  blog_date: string,
}

const WhatsAppLink = 'https://api.whatsapp.com/send/?phone=254720938799&text&type=phone_number&app_absent=0'

const Travelguides = ({ blog_date, blog_id, blog_title }: blogList) => {

  // Find Blog by using
  return (
    <div className='p-5 xl:mt-10'>
      <div className='xl:place-items-center'>
        <div className='xl:flex xl:place-items-center xl:mb-10'>
          <span className='hidden xl:block xl:mr-5'>{dash}</span>
          <h1 className='text-[30px] xl:text-[48px] font-medium uppercase text-[#ED1C24]
          '>Travel Guides</h1>
          <span className='xl:hidden mr-5'>{dash}</span>
        </div>
      </div>
      <div className='xl:flex xl:flex-row xl:gap-10 xl:justify-center'>
        <div className='righthand xl:grid xl:grid-cols-2 xl:gap-2 mb-5'>
          <div className=' hidden xl:block
          pl-[30px] pr-[30px] pt-[45px] pb-[45px] w-[300px] h-[250px] bg-[#D9D9D9]
          '>
            <p className='font-semibold text-[20px] uppercase mb-[5px]'>Let us create your tailor-made safari tour</p>
            <p className='text-[12px] uppercase font-light mb-[15px]'>start planning your dream trip</p>
            <Link href={'/safaris'}>
              <button className='cursor-pointer w-full h-[45px] text-white bg-primary p-2 font-light uppercase text-[12px] pr-5 pl-5'>
                Browse Our Packages
              </button>
            </Link>
          </div>
          <div className='hidden xl:block xl:w-[300px] xl:h-[250px]'>
            <Image src={part1} alt='camptrek' style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
          </div>
          <div className='hidden xl:block xl:w-[300px] xl:h-[250px]'>
            <Image src={part2} alt='camptrek' style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
          </div>
          <div className='
          pl-[30px] pr-[30px] pt-[30px] pb-[40px] w-[300px] h-[250px] bg-primary
          place-items-center
          '>
            <p className='text-white font-semibold text-[20px] uppercase mb-[5px]'>Chat with an expert</p>
            <p className='text-white text-[12px] uppercase font-light mb-[15px]'>start planning your dream trip</p>
            <img src="/about-us/see (3).png" alt="cheetah" className='p-1' />
            <Link href={WhatsAppLink}>
              <button className='
            cursor-pointer text-white p-3 font-light uppercase text-[14px] 
            pr-5 pl-5 flex gap-6 border rounded w-full justify-center
            '>{whatsAppIcon} +254-7209-38799</button>
            </Link>
          </div>
        </div>
        <div className='lefthand'>
          <div>
            {/* <p className='date font-semibold text-[12px] text-[#ED1C24]'>
              {new Date(blog_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p> */}
            <p className='title font-light'>
              {blog_title}
            </p>
            <Link href={`/blogs/${blog_id}`}>
              <div className='flex gap-2 place-items-center mb-3 cursor-pointer'>
                <p className='text-[#ED1C24] text-[14px]'>
                  Read Guide
                </p>
                <span>{readmore}</span>
              </div>
            </Link>
            <hr />
          </div>
        </div>


        <hr />
      </div>
    </div>
  )
}

export default Travelguides