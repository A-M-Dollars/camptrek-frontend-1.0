import Image from 'next/image'
import React from 'react'
import { camptreksignImage } from '@/public/svgs/svgs-file'
import AboutUsSection from './about-accordion'


const giraffImage = '/images/TranspaGira.png'


const aboutUsInfo = [
    {
        title: 'Safari & Wildlife Safety',
        bgColor: "#FD6D0D",
        context: `Wildlife encounters are thrilling, but they require careful management. Studies show that nearly 90% of safari incidents occur when guests leave vehicles or ignore safety guidelines. That’s why our professional guides, trained in wildlife behavior, first aid, and emergency protocols, provide a full safety briefing before each activity. We also operate a fleet of well-maintained 4x4 vehicles and enforce strict wildlife etiquette—ensuring you stay safe while enjoying the beauty of nature.`
    },
    {
        title: "Health & Medical Preparedness",
        bgColor: "#FFFF",
        context: `Health risks on safari are often underestimated, yet the CDC reports that up to 25% of international travelers experience a health issue during their trip. To reduce this risk, Camptrek Safaris has a 24/7 emergency response system, partnerships with medical evacuation services, and guides trained in advanced first aid. Before your trip, we provide clear health advice on vaccinations, malaria prevention, hydration, and sun protection. On safari, we guarantee safe and hygienic meals and water so you can focus on the adventure.`
    },
    {
        title: "Security & Travel Logistics",
        bgColor: "#FD6D0D",
        context: `Travel security is a growing global concern. According to the World Travel & Tourism Council, over 40% of travelers cite safety as their top priority when choosing a destination. With this in mind, we only partner with trusted lodges and camps offering round-the-clock security. All transfers are handled by our approved professional drivers, and we strongly recommend comprehensive travel insurance that includes medical and evacuation coverage. Every detail is designed to give you peace of mind.`
    },
    {
        title: "Our Commitment to You",
        bgColor: "#ffff",
        context: `Safety is not just a checklist—it’s a promise. Research shows that travelers who feel secure are three times more likely to describe their trip as ‘life-changing.’ Our mission is to make your safari both memorable and safe by combining expert guidance, proven safety measures, financial transparency, and constant support. With Camptrek Safaris, you can embrace the adventure knowing your well-being and your money are in safe hands`
    }
]

function Aboutus() {
    return (
        <div className='over-flow-hidden text-black bg-white'>
            <div >
                <div className='mt-10 ml-5 xl:ml-25'>
                    <h1 className='font-semibold text-[30px] text-[#FD6D0D] xl:text-[32px]'>WHY CHOOSE CAMPTREK SAFARIS ?</h1>
                    <p className='text-[14px] mt-2 text-gray-600 font-light'>
                        GET FIRST-HAND INSIGHTS ABOUT THE DESTINATIONS YOU WILL VISIT <br />
                        FROM EXPERTS ON THE GROUND.
                    </p>
                </div>
                <div className='flex w-full'>
                    <Image src={giraffImage} alt={'Giraffe'} height={100} width={600} className="hidden xl:block xl:w-[40%]" />
                    <div className="hidden xl:block xl:w-[10%] xl:height-full xl:mt-40 xl:ml-10">
                        {camptreksignImage}
                    </div>
                    <div className=" xl:w-[45%] mt-5 xl:mt-10 pr-15 ml-5 xl:ml-0 xl:pr-25">
                        {
                            aboutUsInfo.map((item, idx) => (
                                <div key={idx}>
                                    <div className='flex flex-row place-items-center mb-5 mt-5'>
                                        <div className='ml-10'>
                                            <h2 className='text-[20px] font-semibold text-[#FD6D0D] mb-2'>{item.title}</h2>
                                            <div>
                                                {/* <li>
                                                    <p className='font-semibold'>Expert Guides</p>
                                                    <p>Trained in wildlife behavior, first aid, and emergency response.</p>
                                                </li> */}
                                                <p className='text-[14px] text-black text-pretty'>{item.context}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        }
                        <div className='mt-10 mb-5 flex justify-center items-center'>
                            <a href="/about-us">
                                <button className='bg-[#FD6D0D] font-light text-[16px] text-white p-4 cursor-pointer'>GET TO KNOW MORE ABOUT US</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutus