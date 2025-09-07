import React from 'react'
import { dash } from '@/public/svgs/svgs-file'

const Mottosection = () => {
  return (
    <div className='
    xl:flex xl:place-items-center xl:mt-10 xl:p-5 xl:mr-20 xl:ml-20 ml-10 mr-10'
    >
      <div className='
      xl:flex xl:flex-row xl:place-items-center xl:w-1/2'
      >
        <h1 className='
        xl:text-[48px] xl:mr-5 xl:uppercase xl:font-medium xl:text-[#ED1C24]
        text-[30px] uppercase font-semibold text-[#ED1C24] mt-5 text-[30px] 
        '
        >
          Our Motto
        </h1>
        <span>{dash}</span>
      </div>
      <div className='xl:w-1/2'>
        <p className='
        xl:font-light-200 xl:uppercase xl:text-[12px]
        mt-5 text-gray-600 text-[14px]
        '
        >
          “Every safari is unique, be trustworthy, be transparent, and always go above and beyond. – Every single time.”
          We live by this in every aspect of our operations. We design safari itineraries that cater to all budgets,
          from lodges outside the Parks to staying in high-end tented camps inside the parks within Kenya,
          Tanzania, Uganda, and Rwanda.
        </p>
      </div>
    </div>
  )
}

export default Mottosection