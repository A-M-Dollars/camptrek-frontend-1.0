import React from 'react'

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
        context: `Safety is not just a checklist—it’s a promise. Research shows that travelers who feel secure are three times more likely to describe their trip as “life-changing.” Our mission is to make your safari both memorable and safe by combining expert guidance, proven safety measures, and constant support. With Camptrek Safaris, you can embrace the adventure knowing you are in safe hands.`
    }
]

const AboutUsSection = () => {
    return (
        <div className='m-24 overflow-hidden text-black bg-white'>
            <div className='sect1 w-full h-[100px] mb-10'>
                <h1 className='align-center font-light text-[32px] text-[#FD6D0D] flex justify-center items-center'>
                    About us
                </h1>
            </div>
            {
                aboutUsInfo.map((item, idx) => (
                    <div key={idx} className='sect2 grid grid-cols-4 w-full h-[200px] mb-10'
                      style={{ backgroundColor: item.bgColor }}
>
                        <div className='col-span-1 p-10'>
                            <div className='flex gap-4'>
                                <p>{idx + 1}</p>
                                <p>{item.title}</p>
                            </div>
                        </div>
                        <div className='col-span-3 p-10'>
                            <p>{item.context}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default AboutUsSection