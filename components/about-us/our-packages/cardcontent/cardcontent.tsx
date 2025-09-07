import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import lion from '@/public/about-us/lion.jpg'
import { safariPackages } from '@/constants/packages'

const Cardcontent = () => {
    return (
        <div className='xl:flex xl:flex-row xl:gap-2'>
            {safariPackages.map((camptrekpackage) => (
                <Card key={camptrekpackage.id}>
                    <CardContent>
                        <div>
                            <div className='h-[350px] w-full overflow-hidden'>
                                <img src={camptrekpackage.image} alt='CAMPTREK DIRECTION' style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                            </div>
                            <div className='pt-4 px-3 pb-3'>
                                <p className='font-medium text-[20px] uppercase mb-3'>{camptrekpackage.title}</p>
                                <p className='font-light text-[12px] mb-3'>
                                   {camptrekpackage.description}
                                </p>
                                <div>
                                    <p className='font-medium text-[14px] uppercase mb-3'>Hightlights</p>
                                    <p className='font-light text-[12px]'>
                                    {
                                        camptrekpackage.highlights.map((h, i) => (
                                            <li key={i}>{h}</li>
                                        ))
                                    }
                                </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            ))}
        </div>
    )
}

export default Cardcontent