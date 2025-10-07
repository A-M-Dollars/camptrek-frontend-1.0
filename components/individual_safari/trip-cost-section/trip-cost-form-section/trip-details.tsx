'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { countryCodes } from '@/constants/countrycodes'
import { smile, sad } from '@/public/svgs/svgs-file'

type tripCostSummaryMobile = {

  newAdultPrice: number,
  newKidsPrice: number,
  totalPrice: number

  numberOfAdults: number,
  numberofKids: number,

  costIncludesi: string[],
  costExcludesi: string[]
  

}

function TripDetails({ newAdultPrice, newKidsPrice, totalPrice, numberOfAdults, numberofKids, costExcludesi, costIncludesi }: tripCostSummaryMobile) {

  const { register, formState: { errors } } = useFormContext()

  const currencyList = ["USD"]
  const currencyListb = ["USD", "GBP", "EUR", "JPY"]


  return (
    <div>
      <h1 className='text-[12px] font-bold text-center uppercase'>Trip Details</h1>
      <div className='grid grid-row gap-2 mt-4 mb-4'>
        {/* currency and country issue */}
        <div className='grid grid-cols-2 gap-2'>
          <div className='currency'>
            <label className='text-[11px] titlecase pl-1 font-regular'>Preferred Currency</label>
            <select {...register('currency')}
              className='border w-full h-[45px] opacity-75
            placeholder: font-regular titlecase text-[10px] opacity-50 p-4'
            >
              {/* {countryCodes.map((currency) => (
                <option key={currency.country} value={currency.currency}>
                  {currency.currency}
                </option>
              ))} */}
              {currencyList.map(
                (currency: any, index: any) => (
                  <option key={index} value={currency}>{currency}</option>
                )
              )}
            </select>
          </div>
          <div className='country'>
            <label className='text-[11px] titlecase pl-1 font-regular'>Country of Origin</label>
            <select {...register("country")}
              className='border w-full h-[45px] opacity-75
            placeholder: font-regular titlecase text-[10px] opacity-50 p-4'
            >
              {countryCodes.map((country) => (
                <option key={country.country} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>

          </div>
        </div>
        {/* start Date */}
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <label className='text-[11px] titlecase pl-1 font-regular'>Start Date</label>
            <input
              type="date"
              {...register('startDate')}
              className='border w-full h-[45px] opacity-75
            placeholder: font-regular titlecase text-[11px] opacity-50 p-4'
            />
          </div>
          <div>
            <label className='text-[11px] titlecase pl-1 font-regular'>Rooms Needed</label>
            <input
              type="number"
              min="1"
              onInput={(e: any) => {
                if (parseInt(e.target.value) < 1) e.target.value = 1;
              }}
              {...register('numberOfRooms', {
                valueAsNumber: true,
                min: { value: 1, message: "Rooms cannot be negative" }
              })}
              className='border w-full h-[45px] opacity-75
            placeholder: font-regular titlecase text-[11px] opacity-100 p-4'
            />
            {errors.numberOfRooms && (
              <span className="text-red-500 text-[9px] pl-1">{errors.numberOfRooms.message as string}</span>
            )}
          </div>
        </div>

        {/* Adults and Kids Attending */}
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <label className='text-[11px] titlecase pl-1 font-regular'>Adults Attending (12+ Years)</label>
            <input
              type="number"
              min="1"
              onInput={(e: any) => {
                if (parseInt(e.target.value) < 1) e.target.value = 1;
              }}
              {...register('numberOfAdults', {
                valueAsNumber: true,
                min: { value: 1, message: "At least 1 adult is required" }
              })}
              className='border w-full h-[45px] opacity-75
            placeholder: font-regular titlecase text-[11px] opacity-100 p-4'
            />
            {errors.numberOfAdults && (
              <span className="text-red-500 text-[9px] pl-1">{errors.numberOfAdults.message as string}</span>
            )}
          </div>
          <div>
            <label className='text-[11px] titlecase pl-1 font-regular'>Kids Attending (3-12 Years)</label>
            <input
              type="number"
              min="0"
              onInput={(e: any) => {
                if (parseInt(e.target.value) < 0) e.target.value = 0;
              }}
              {...register('numberOfKids', {
                valueAsNumber: true,
                min: { value: 0, message: "Kids cannot be negative" }
              })}
              className='border w-full h-[45px] opacity-75
            placeholder: font-regular titlecase text-[11px] opacity-100 p-4'
            />
            {errors.numberOfKids && (
              <span className="text-red-500 text-[9px] pl-1">{errors.numberOfKids.message as string}</span>
            )}
          </div>
        </div>

        {/* Price total show */}
        <div className='mt-2 xl:hidden'>
          <div>
            <div className='mb-10'>
              <h1 className='font-bold text-[10px] uppercase mb-2' >Price Summary</h1>
              <div className='mt-2'>
                <div className='upper mt-2 mb-15'>
                  <div className='flex flex-row justify-between'>
                    <p className='text-[12px] titlecase pl-1 opacity-50'>No. of People</p>
                    <p className='text-[12px] titlecase pr-1' >Price <br /> (Per Person)</p>
                  </div>
                  <hr />
                </div>
                <div className='middle mb-8' >
                  <div className='flex flex-row justify-between mb-2'>
                    <p className='text-[12px] titlecase pl-1 opacity-50'>{numberOfAdults} (Adult Price)</p>
                    <p className='text-[14px] font-semibold pr-1' >{newAdultPrice} USD</p>
                  </div>
                  <hr />
                </div>
                <div className='middle2 mb-8'>
                  <div className='flex flex-row justify-between mb-2'>
                    <p className='text-[12px] titlecase pl-1 opacity-50'>{numberofKids} (Kids Price)</p>
                    <p className='text-[14px] font-semibold pr-1' >{newKidsPrice} USD</p>
                  </div>
                  <hr />
                </div>
                <div className='last'>
                  <div className='flex flex-row justify-between mb-2'>
                    <p className='text-[12px] titlecase pl-1 opacity-50'>Total Amount</p>
                    <p className='text-[14px] font-semibold pr-1 text-[#ED1C24]' >{totalPrice} USD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost includes and Excludes */}
        <div className='mt-2 xl:hidden'>
          <div className='items-center bg-[#D3D3D3] text-primary p-[40px]'>
            <div className='costIncludes mb-10'>
              <h1 className='font-bold uppercase text-[12px] mb-2'>Cost Includes</h1>
              {costIncludesi.map((includes) => (
                <div key={includes} className='flex items-center gap-2 mb-2'>
                  <span>{smile}</span>
                  <p className='text-[11px] mb-2'>{includes}</p>
                </div>
              ))}
            </div>
            <div className='costExcludes'>
              <h1 className='font-bold uppercase text-[12px] mb-2'>Cost Excludes</h1>
              {costExcludesi.map((excludes, index) => (
                <div key={`${excludes}-${index}`} className='flex items-center gap-2 mb-2'>
                  <span>{sad}</span>
                  <p className='text-[11px] mb-2'>{excludes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripDetails