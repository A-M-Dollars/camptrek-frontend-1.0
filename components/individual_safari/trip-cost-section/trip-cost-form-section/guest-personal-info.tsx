'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { countryCodes } from '@/constants/countrycodes'



function GuestPersonalInfo() {

    const { register, formState: { errors }, watch } = useFormContext()


    return (
        <div>
            <h1 className='uppercase text-[12px] font-bold text-center'>Guest & Contact Information </h1>
            <div className='grid grid-row gap-2 mt-4 mb-4'>
                <label className='text-[10px] titlecase pl-1 font-light'>Full Name</label>
                <input
                    type="text"
                    {...register('fullName')}
                    className='border w-full h-[45px] opacity-75
            placeholder: font-light titlecase text-[10px] opacity-100 p-4'
                />

                {/* email address  */}
                <label className='text-[10px] titlecase pl-1 font-light'>Email Address</label>
                <input
                    type="text"
                    {...register('email')}
                    className='border w-full h-[45px] opacity-75
            placeholder: font-light titlecase text-[10px] opacity-100 p-4'
                />

                {/* country code & phone number  */}
                <label className='text-[10px] titlecase pl-1 font-light'> Phone Number </label>
                <div className='grid grid-cols-4 gap-2'>
                    <div className='col-span-2 xl:col-span-1'>
                        <select {...register('countryCode')} 
                        className='border w-full h-[45px] opacity-75 text-[10px] p-4 font-light'
                        >
                            <option value="" disabled>Country Code </option>
                            {countryCodes.map((country, index) => (
                                <option key={index} value={country.code}>
                                    {country.country} {country.code}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='col-span-2 xl:col-span-3'>
                        <input
                            placeholder="Enter Your Phone Number"
                            type="text"
                            {...register('phoneNumber')}
                            className='border w-full h-[45px] opacity-75
            placeholder: font-light titlecase text-[10px] opacity-100 p-4'
                        />
                        {errors.phoneNumber?.message && <p className='text-[10px] text-[#ED1C24]'>{errors.phoneNumber.message as string}</p>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GuestPersonalInfo