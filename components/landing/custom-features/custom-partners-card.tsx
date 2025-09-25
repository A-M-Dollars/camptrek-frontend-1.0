// File1: Custompartnercard.tsx
import React from 'react'
import partner1 from '../../../public/partners/AMREF-Flying-Doctors.jpg'
import partner2 from '../../../public/partners/Magical-Kenya-Logo-2023.jpg'
import partner3 from '../../../public/partners/kenya-wildlife-service-logo-png_seeklogo-321792.png'
import partner4 from '../../../public/partners/lbdma5zi_400x400.jpg'
import partner5 from '../../../public/partners/safari-bookings-tanzania.jpg'
import partner6 from '../../../public/partners/tosk_logo_v2.png'
import Image from 'next/image'

const partners = [
  { name: 'AMREF Flying Doctors', image: partner1 },
  { name: 'Magical Kenya', image: partner2 },
  { name: 'Kenya Wildlife Service', image: partner3 },
  { name: 'LBDMA', image: partner4 },
  { name: 'SafariBookings', image: partner5 },
  { name: 'TOSK', image: partner6 }
]

const Custompartnercard = () => {
  // Duplicate the partners array multiple times for smooth infinite scrolling
  const duplicatedPartners = [...partners, ...partners, ...partners]
  
  return (
    <>
      {duplicatedPartners.map((partner, index) => (
        <div
          key={index}
          className="embla__slide flex-[0_0_180px] min-w-0 flex justify-center items-center "
        >
          <Image
            src={partner.image}
            alt={partner.name}
            width={120} height={120}
            className="object-contain h-[120px] w-[120px]"
          />
        </div>
      ))}
    </>
  )
}

export default Custompartnercard