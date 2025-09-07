import React from 'react'
import Partnercarousel from '../custom-features/partners-carousel'
import Custompartnercard from '../custom-features/custom-partners-card'

function Partners() {
  return (
    <div className='xl:mt-15 xl:ml-5 ml-5 mt-15 mb-15'>
        <div className='mb-15 mr-2'>
            <h1 className='font-semibold text-[32px] text-black'>OUR PARTNERS</h1>
            <p className='text-[12px] xl:text-[14px] mt-2 text-gray-600 font-light uppercase'>
                At the heart of our unforgettable safari experiences are the strong relationships we&apos;ve built with trusted <br />
                partners across Kenya, Tanzania, and Zanzibar.
            </p>
        </div>
        <Partnercarousel>
            <Custompartnercard/>
        </Partnercarousel>
    </div>
  )
}

export default Partners