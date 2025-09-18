import React from 'react'
import Image from 'next/image'
import lion from '@/public/about-us/lion.jpg'
// import Cardcontent from './cardcontent/cardcontent'
import { Card, CardContent } from "@/components/ui/card"
import { safariPackages } from '@/constants/packages'
import { arrowButton2, arrowButton3, dash, readmore } from '@/public/svgs/svgs-file'


// import { Card, CardContent } from "@/components/ui/carousel"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Cardcontent from './cardcontent/cardcontent'
import Link from 'next/link'


const Ourpackages = () => {
    return (
        <div className='p-5 mt-10'>
            <div className='xl:place-items-center mb-10'>
                <div className='xl:flex xl:flex-row xl:place-items-center
                '>
                    <span className='hidden xl:block xl:mr-5'>{dash}</span>
                    <h1 className='xl:text-[48px] xl:font-medium uppercase 
                    text-[#ED1C24] text-[30px] font-semibold text-[30px]
                    '
                    >Our Packages</h1>
                    <span className='xl:hidden xl:mr-5'>{dash}</span>
                </div>
            </div>
            <div className='hidden xl:block pl-50 pr-50 pt-5 pb-20'>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                >
                    {
                        safariPackages.map((pack) => (
                            <AccordionItem value={pack.id} key={pack.id}>
                                <AccordionTrigger>
                                    <div className='flex flex-col'>
                                        <span className='uppercase mb-1'>
                                            {pack.title}
                                        </span>
                                        <span className='font-light text-[13px] text-gray-600'>
                                            {pack.description}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {/* <p className='text-[12px] text-blue-600 uppercase'>
                                        <Link href="/safaris" className='underline text-[10px]'>
                                            <span>
                                                Explore our safaris 
                                            </span>
                                        </Link>
                                    </p> */}
                                    <div className='package-carousel'>
                                        <Carousel>
                                            <CarouselContent>
                                                <CarouselItem>
                                                    <div>
                                                        <Card key={pack.id}>
                                                            <CardContent>
                                                                <div className='flex flex-row gap-1'>
                                                                    {
                                                                        pack.images && pack.images.length > 0 && (
                                                                            pack.images.map((album: string, idx: number) => (
                                                                                <div
                                                                                    className='h-[250px] w-full overflow-hidden'
                                                                                    key={idx}>
                                                                                    <img
                                                                                        src={album}
                                                                                        alt='CAMPTREK DIRECTION'
                                                                                        style={{ objectFit: 'cover' }}
                                                                                        className='w-full h-full'
                                                                                    />
                                                                                </div>
                                                                            ))
                                                                        )
                                                                    }
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                </CarouselItem>
                                            </CarouselContent>
                                        </Carousel>
                                    </div>
                                    <p className='text-[12px] text-blue-600 uppercase'>
                                        <Link href="/safaris" className=' flex gap-2 underline text-[12px] justify-end flex'>
                                            <span>
                                                Explore our safaris
                                            </span>
                                            {arrowButton3}
                                        </Link>
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>
            <div className='package-carousel xl:hidden'>
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>
                            <div>
                                <Cardcontent />
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    )
}

export default Ourpackages