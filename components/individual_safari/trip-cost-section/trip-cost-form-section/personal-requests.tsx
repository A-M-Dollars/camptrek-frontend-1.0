import React from 'react'
import { useFormContext } from 'react-hook-form'

function PersonalRequest() {

  const { register, formState: { errors } } = useFormContext()


  return (
    <div className='mt-12 xl:mt-0'>
      <h1 className='text-[12px] font-bold text-center uppercase'>Personal Preferences & Special Requests <span className='text-red-400 font-semibold'>(optional)</span> </h1>
      <div className='grid grid-row gap-2 mt-4 mb-4'>
        {/* Dietary Needs */}
        <label className='text-[11px] titlecase pl-1 font-regular'>Dietary Needs</label>
        <input
          type="text"
          {...register('dietaryNeeds')}
          className='border w-full h-[45px] opacity-75
            placeholder: font-regular titlecase text-[11px] opacity-100 p-4'
        />
        {/* Additional Information */}
        <label className='text-[11px] titlecase pl-1 font-regular'>Additional Information</label>
        <textarea
          rows={5}
          {...register('dietInfo')}
          className='border w-full opacity-75
            placeholder: font-regular titlecase text-[11px] opacity-100 p-4'
        />
        {/* Special Occassions Requests */}
        <label className='text-[11px] titlecase pl-1 font-regular'>Special Occassion (Requests)</label>
        <input
          type="text"
          {...register('specialRequest')}
          className='border w-full h-[45px] opacity-75
            placeholder: font-regular titlecase text-[11px] opacity-100 p-4'
        />
        {/* Additional Information */}
        <label className='text-[11px] titlecase pl-1 font-regular'>Additional Information</label>
        <textarea
          rows={5}
          {...register('occasionInfo')}
          className='border w-full opacity-75
            placeholder: font-regular titlecase text-[11px] opacity-100 p-4'
        />
      </div>
    </div>
  )
}

export default PersonalRequest