import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { safariPackages } from '@/constants/packages'
import Link from 'next/link'
import { arrowButton3 } from '@/public/svgs/svgs-file'

const Cardcontent = () => {
    return (
        <div className='xl:flex xl:flex-row xl:gap-2'>
            {safariPackages.map((camptrekpackage) => (
                <Card key={camptrekpackage.id}>
                    <CardContent>
                        <div>
                            <div className='h-[350px] w-full overflow-hidden'>
                                {/* Using regular img tag - more reliable */}
                                {camptrekpackage.images && camptrekpackage.images.length > 0 && (
                                    <img
                                        src={camptrekpackage.images[0]}
                                        alt={camptrekpackage.title}
                                        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                        className='w-full h-full'
                                        onError={(e) => {
                                            console.error('Image failed to load:', camptrekpackage.images[0]);
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                )}

                                {/* Fallback if no image */}
                                {(!camptrekpackage.images || camptrekpackage.images.length === 0) && (
                                    <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                                        <span className='text-gray-500'>No image available</span>
                                    </div>
                                )}
                            </div>
                            <div className='pt-4 px-3 pb-3'>
                                <p className='font-medium text-[20px] uppercase mb-3'>{camptrekpackage.title}</p>
                                <p className='font-light text-[12px] mb-3'>
                                    {camptrekpackage.description}
                                </p>
                                <div>
                                    <p className='font-medium text-[14px] uppercase mb-3'>Highlights</p>
                                    <ul className='font-light text-[12px] pl-4'>
                                        {camptrekpackage.highlights.map((h, i) => (
                                            <li key={i} className='list-disc mb-1'>{h}</li>
                                        ))}
                                    </ul>
                                </div>
                                <p className='text-[12px] text-blue-600 uppercase'>
                                    <Link href="/safaris" className=' flex gap-2 underline text-[10px] mt-4 pl-1 flex'>
                                        <span>
                                            Explore our safaris
                                        </span>
                                        {arrowButton3}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Cardcontent

// Alternative: If you want an image carousel for each card
const CardcontentWithCarousel = () => {
    return (
        <div className='xl:flex xl:flex-row xl:gap-2'>
            {safariPackages.map((camptrekpackage) => (
                <Card key={camptrekpackage.id}>
                    <CardContent>
                        <div>
                            <div className='h-[350px] w-full overflow-hidden relative'>
                                {/* Image carousel/slider for multiple images */}
                                {camptrekpackage.images && camptrekpackage.images.length > 0 && (
                                    <div className='flex transition-transform duration-300'>
                                        {camptrekpackage.images.map((image, idx) => (
                                            <div key={idx} className='min-w-full h-[350px] relative'>
                                                <Image
                                                    src={image}
                                                    alt={`${camptrekpackage.title} - Image ${idx + 1}`}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className='pt-4 px-3 pb-3'>
                                <p className='font-medium text-[20px] uppercase mb-3'>{camptrekpackage.title}</p>
                                <p className='font-light text-[12px] mb-3'>
                                    {camptrekpackage.description}
                                </p>
                                <div>
                                    <p className='font-medium text-[14px] uppercase mb-3'>Highlights</p>
                                    <ul className='font-light text-[12px] pl-4'>
                                        {camptrekpackage.highlights.map((h, i) => (
                                            <li key={i} className='list-disc mb-1'>{h}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}