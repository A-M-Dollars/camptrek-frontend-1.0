import Image from 'next/image'
import React from 'react'
import lion from '@/public/about-us/lion.jpg'
import { dash } from '@/public/svgs/svgs-file'

import john from '@/public/about-us/team/j1.jpg'

import e1 from '@/public/about-us/team/e1.jpg'
import e2 from '@/public/about-us/team/e2.jpg'
import e3 from '@/public/about-us/team/e3b.png'
import e4 from '@/public/about-us/team/e4.jpg'

const team = [
  { img: e1, name: 'Augustine Mwaura', role: 'Tour Consultant' },
  { img: e2, name: 'Margaret Nyambura', role: 'Tour Consultant' },
  { img: e3, name: 'Rose Khasiala', role: 'Tour Consultant' },
  { img: e4, name: 'Lucy Kagure', role: 'Tour Consultant' },
]

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

const Ourstory = () => {

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


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
        <div className='xl:flex xl:flex-row xl:gap-30 xl:place-items-center'>
          <div>
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
                  src={john} alt='CAMPTREK DIRECTOR'
                  style={{ objectFit: 'cover' }}
                  className='w-full h-full' />
              </div>
              <div className='p-5'>
                <p className='text-[14px] mb-1'>Papa John</p>
                <p className='text-gray-600 text-[12px] uppercase'>Director</p>
              </div>
            </div>
          </div>
        </div>
        <div className='xl:flex xl:flex-row xl:gap-30 xl:place-items-center'>
          <div className='border w-[385px]'>
            {/* Header - Keep outside carousel or move to parent component */}
            <div className='xl:hidden xl:flex xl:flex-row xl:place-items-center
            mb-10 mt-10 xl:mb-20 ml-10 mr-10 xl:ml-0 xl:mr-0'>
              <span className='xl:hidden xl:mr-5'>{dash}</span>
            </div>

            {/* Carousel Container */}
            <div className='ml-10 mr-10 xl:ml-0 xl:mr-0'>
              <Carousel className="w-full h-full relative">
                <CarouselContent>
                  {team.map((member, idx) => (
                    <CarouselItem key={idx}>
                      {/* Individual Team Member Card */}
                      <div className='ml-10 mr-0 xl:ml-0 xl:mr-0'>
                        <div className='h-[316px] w-[300px] xl:w-[383px] overflow-hidden'>
                          <Image
                            src={member.img}
                            alt={member.name}
                            style={{ objectFit: 'cover' }}
                            className='w-full h-full'
                          />
                        </div>
                        <div className='p-5'>
                          <p className='text-[14px] mb-1'>{member.name}</p>
                          <p className='text-gray-600 text-[12px] uppercase'>{member.role}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 mt-20 top-1/2 -translate-y-1/2" />
                <CarouselNext className="right-2 mt-20 top-1/2 -translate-y-1/2" />
              </Carousel>
            </div>
          </div>
          <div className='hidden xl:block'>
            <p className='xl:font-light xl:text-[12px] xl:uppercase xl:mb-10 mb-5
            text-gray-600 xl:text-black text-[14px] ml-10 mr-10 xl:ml-0 xl:mr-0
            '>
              At the heart of Camptrek Safaris is a passionate team of professionals <br /> who bring our vision to life.
              From our seasoned safari guides who share <br /> their deep knowledge of wildlife  and landscapes, to our
              dedicated operations staff <br />  who coordinate every detail with precision, each member plays a vital role
              in <br />  creating unforgettable journeys. Their expertise, warmth, and commitment ensure <br /> that every guest feels
              safe, cared for, and inspired throughout their adventure.
            </p>
            <p className='xl:font-light xl:text-[12px] xl:uppercase
            text-gray-600 xl:text-black text-[14px] ml-10 mr-10 xl:ml-0 xl:mr-0 mb-5 xl:mb-0
            '>
              Beyond their professional skills, our team embodies a spirit of collaboration and hospitality.
              <br />They are more than employees—they are storytellers, problem-solvers, and cultural <br />
              ambassadors who take pride in showcasing the beauty of East Africa.<br />
              Their shared dedication, enthusiasm, and respect for both people and nature drive Camptrek Safaris
              <br /> forward, making each safari not just a trip, but a life-enriching experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ourstory