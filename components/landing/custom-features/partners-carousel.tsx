'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const Partnercarousel = ({ children }: { children: React.ReactNode }) => {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      containScroll: 'trimSnaps',
      slidesToScroll: 1,
      skipSnaps: false
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        playOnInit: true,
        stopOnFocusIn: false
      })
    ]
  )

  return (
    <div className="embla">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Partnercarousel
