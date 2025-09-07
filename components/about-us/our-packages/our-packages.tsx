import React from 'react'
import Image from 'next/image'
import lion from '@/public/about-us/lion.jpg'
import Cardcontent from './cardcontent/cardcontent'
import { dash } from '@/public/svgs/svgs-file'


// import { Card, CardContent } from "@/components/ui/carousel"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


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
            <div className='package-carousel'>
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
            {/* <div className='xl:flex xl:flex-rows-5 xl:gap-5 hidden xl:block'>
                <div className='old_Customers  xl:border '>
                    <div className='old_Customers'>
                        <div className='h-[330px] w-[350px] overflow-hidden'>
                            <Image src={lion} alt='CAMPTREK DIRECTION' style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                        </div>
                        <div className='p-5'>
                            <p className='font-medium text-[20px] uppercase mb-3'>seniors travelers</p>
                            <p className='font-light text-[10px] uppercase'>
                                Our senior-friendly safari packages are <br />
                                thoughtfully designed for comfort, safety, and <br />
                                flexibility. Expect shorter travel days, premium <br />
                                lodges with accessibility in mind, and experienced <br />
                                guides who cater to your unique needs. Enjoy <br />
                                breathtaking landscapes and wildlife encounters <br />
                                without the rush.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='safari_and_beaches xl:border'>
                    <div className='old_Customers'>
                        <div className='h-[330px] w-[350px] overflow-hidden'>
                            <Image src={lion} alt='CAMPTREK DIRECTION' style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                        </div>
                        <div className='p-5'>
                            <p className='font-medium text-[20px] uppercase mb-3'>seniors travelers</p>
                            <p className='font-light text-[10px] uppercase'>
                                Our senior-friendly safari packages are <br />
                                thoughtfully designed for comfort, safety, and <br />
                                flexibility. Expect shorter travel days, premium <br />
                                lodges with accessibility in mind, and experienced <br />
                                guides who cater to your unique needs. Enjoy <br />
                                breathtaking landscapes and wildlife encounters <br />
                                without the rush.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='family_safaris xl:border'>
                    <div className='old_Customers'>
                        <div className='h-[330px] w-[350px] overflow-hidden'>
                            <Image src={lion} alt='CAMPTREK DIRECTION' style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                        </div>
                        <div className='p-5'>
                            <p className='font-medium text-[20px] uppercase mb-3'>seniors travelers</p>
                            <p className='font-light text-[10px] uppercase'>
                                Our senior-friendly safari packages are <br />
                                thoughtfully designed for comfort, safety, and <br />
                                flexibility. Expect shorter travel days, premium <br />
                                lodges with accessibility in mind, and experienced <br />
                                guides who cater to your unique needs. Enjoy <br />
                                breathtaking landscapes and wildlife encounters <br />
                                without the rush.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='luxury_safaris xl:border'>
                    <div className='old_Customers'>
                        <div className='h-[330px] w-[350px] overflow-hidden'>
                            <Image src={lion} alt='CAMPTREK DIRECTION' style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                        </div>
                        <div className='p-5'>
                            <p className='font-medium text-[20px] uppercase mb-3'>seniors travelers</p>
                            <p className='font-light text-[10px] uppercase'>
                                Our senior-friendly safari packages are <br />
                                thoughtfully designed for comfort, safety, and <br />
                                flexibility. Expect shorter travel days, premium <br />
                                lodges with accessibility in mind, and experienced <br />
                                guides who cater to your unique needs. Enjoy <br />
                                breathtaking landscapes and wildlife encounters <br />
                                without the rush.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='honeymoon safaris xl:border'>
                    <div className='old_Customers'>
                        <div className='h-[230px] w-[250px] overflow-hidden'>
                            <Image src={lion} alt='CAMPTREK DIRECTION' style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                        </div>
                        <div className='p-5'>
                            <p className='font-medium text-[20px] uppercase mb-3'>seniors travelers</p>
                            <p className='font-light text-[10px] uppercase'>
                                Our senior-friendly safari packages are <br />
                                thoughtfully designed for comfort, safety, and <br />
                                flexibility. Expect shorter travel days, premium <br />
                                lodges with accessibility in mind, and experienced <br />
                                guides who cater to your unique needs. Enjoy <br />
                                breathtaking landscapes and wildlife encounters <br />
                                without the rush.
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Ourpackages