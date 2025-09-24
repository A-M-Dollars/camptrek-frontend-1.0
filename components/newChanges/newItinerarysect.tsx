'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { safariPackages } from "@/constants/packages";

import photo from "@/public/images/Royal-Zanzibar-family-scuba.jpg"
import photo2 from "@/public/images/TranspaGira.png"

const images = [
    {
        imagesrc: { photo },
        alt: "Image to like",
        hotelUrl: "https://www.royalzanzibar.com/",

    },
    {
        imagesrc: { photo: photo2 },
        alt: "Image to like",
        hotelUrl: "https://www.royalzanzibar.com/",
    }

];




const NewItinerarysect = () => {
    return (
        <div className='xl:ml-40 xl:mr-40 xl:mt-10 xl:mb-10'>
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger>Product Information</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="related images">
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full relative"
                            >
                                <CarouselContent>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        Item {index + 1}
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>

                                {/* Small, side-aligned buttons */}
                                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm" />
                                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm" />
                            </Carousel>
                        </div>
                        <div className="itinerary-description">
                            <p>
                                Our flagship product combines cutting-edge technology with sleek
                                design. Built with premium materials, it offers unparalleled
                                performance and reliability.
                            </p>
                            <p>
                                Key features include advanced processing capabilities, and an
                                intuitive user interface designed for both beginners and experts.
                            </p>
                        </div>
                        <div className="accomodation">
                            <h1
                                className="mb-2"
                            >Accomodation</h1>
                            <div>
                                <Carousel
                                    opts={{
                                        align: "start",
                                    }}
                                    className="w-full relative"
                                >
                                    <CarouselContent>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                                <div className="p-1">
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                                            Item {index + 1}
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>

                                    {/* Small, side-aligned buttons */}
                                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm" />
                                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm" />
                                </Carousel>
                            </div>

                        </div>

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default NewItinerarysect