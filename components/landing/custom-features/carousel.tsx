'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { previousButton, nextButton } from '@/public/svgs/svgs-file'


interface CustomCarouselProps {
  children: React.ReactNode
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className="relative">
      {/* Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#FD6D0D]/50 rounded-full hover:bg-[#FD6D0D]"
      >
        {previousButton}
      </button>

      <div className="overflow-hidden ml-10 mr-10" ref={emblaRef}>
        {/* Embla container */}
        <div className="flex">
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] px-2"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#FD6D0D]/50 rounded-full hover:bg-[#FD6D0D]"
      >
        {nextButton}
      </button>
    </div>
  )
}

export default CustomCarousel
