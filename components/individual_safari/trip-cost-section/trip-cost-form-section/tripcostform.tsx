'use client'

import { TripInfoForm, tripInfoFormSchema } from '@/store/tripform'
import { useUserStore } from '@/store/userstore'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from 'react-hook-form'
import GuestPersonalInfo from './guest-personal-info'
import TripDetails from './trip-details'
import PersonalRequest from './personal-requests'
import { tripCostSummaryStore } from '@/store/tripsummarystore'
import { smile, sad } from '@/public/svgs/svgs-file'
import { baseInstance } from '@/constants/apis';


type TripCostFormProps = {
  safariPackageTitle: string;
  itineraryId: string;
  adultPrice: number;
  kidsPrice: number;
  costIncludes: string[];
  costExcludes: string[];
}


const TripCostForm = ({ adultPrice, kidsPrice, costExcludes, costIncludes, safariPackageTitle, itineraryId }: TripCostFormProps) => {
  const { email, name } = useUserStore()
  const { setData, getTotalPrice } = tripCostSummaryStore()



  const methods = useForm<TripInfoForm>({
    resolver: zodResolver(tripInfoFormSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: name || "",
      email: email || "",
      countryCode: "",
      phoneNumber: "",
      country: "United States",
      currency: "USD",
      startDate: "",
      numberOfRooms: 1,
      numberOfAdults: 1,
      numberOfKids: 0,
    }
  })

  const { handleSubmit, watch } = methods
  const watched = watch()

  useEffect(() => {
    const newNumber = (watched.countryCode || '') + ' ' + (watched.phoneNumber || '')
    setData(
      watched.fullName || '',
      watched.email || '',
      newNumber.trim(),
      watched.numberOfAdults || 1,
      watched.numberOfKids || 0,
      watched.numberOfRooms || 1
    )
  }, [
    watched.fullName,
    watched.email,
    watched.countryCode,
    watched.phoneNumber,
    watched.numberOfAdults,
    watched.numberOfKids,
    watched.numberOfRooms,
    setData
  ])

  const newAdultPrice = adultPrice * watched.numberOfAdults
  const newKidsPrice = kidsPrice * watched.numberOfKids
  const totalPrice = newAdultPrice + newKidsPrice


  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const onSubmit = async (data: TripInfoForm) => {
    setIsSubmitting(true)
    setSubmitError(null)

    const savedPhoneNumber = watched.countryCode + ' ' + watched.phoneNumber

    const payLoad = {
      full_name: data.fullName,
      email: data.email,
      phone_number: savedPhoneNumber,
      start_date: data.startDate,
      number_of_rooms: data.numberOfRooms,
      number_of_adults: data.numberOfAdults,
      number_of_children: data.numberOfKids, // Fixed typo: was "numberofKids"
      dietary_needs: data.dietaryNeeds,
      dietary_info: data.dietInfo,
      special_requests: data.specialRequest,
      occasion_info: data.occasionInfo, // Fixed typo: was "occassionInfo"
      itinerary_id: itineraryId,
      country: data.country,
      total_amount: totalPrice,
      currency: data.currency
    }

    try {
      const response = await baseInstance.post('/bookings/create-payment', payLoad)
      console.log(response.data)

      // if 200, take redirect_url from [response.data]
      if (response.data?.redirect_url) {
        const pesaPalResponse = response.data
        setRedirectUrl(pesaPalResponse.redirect_url)
      } else {
        throw new Error('There was a problem connecting to PesaPal')
      }

      // return response.data
    } catch (error: any) {
      // Added proper error handling
      console.error('Payment creation failed:', error)

      if (error.code === 'ERR_NETWORK') {
        setSubmitError(
          'Network error: Unable to connect to payment service. Please check your internet connection and try again'
        )
      } else if (error.response?.status === 400) {
        setSubmitError(
          'Invalid booking information. Please check your details and try again.'
        )
      } else if (error.response?.status === 500) {
        setSubmitError(
          'Server error. Please try again later or contact support.'
        )
      } else {
        setSubmitError(
          'An unexpected error occurred. Please try again.'
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const showNumber = watched.countryCode + ' ' + watched.phoneNumber


  return (
    <div>
      {!redirectUrl ? (
        <FormProvider {...methods}>
          <form>
            <div className='
            xl:grid xl:grid-cols-2 xl:gap-6
            '>
              <div>
                {/* guest personal information */}
                <GuestPersonalInfo />
                {/* trip details */}
                <TripDetails
                  newAdultPrice={newAdultPrice}
                  newKidsPrice={newKidsPrice}
                  totalPrice={totalPrice}

                  numberOfAdults={watched.numberOfAdults}
                  numberofKids={watched.numberOfKids}

                  costIncludesi={costIncludes}
                  costExcludesi={costExcludes}
                />
                {/* personal request */}
                <PersonalRequest />

              </div>
              <div className='hidden xl:block'>
                <div className='mt-5'>
                  <h1 className='font-bold text-[12px] uppercase text-center' >Booking Details</h1>
                  <div>
                    <div className='mb-5'>
                      <h1 className='font-bold text-[10px] uppercase'>safari guest's Details</h1>
                      <div className='mt-2'>
                        <div className='grid grid-cols-3'>
                          <div className='2 mb-2 mt-2'>
                            <h1 className='font-bold text-[12px] opacity-50 capitalize'>Guest's Name</h1>
                            <p className='text-[12px]'>{watched.fullName}</p>
                          </div>
                          <div className='mb-2 mt-2'>
                            <h1 className='font-bold text-[12px] opacity-50 capitalize'>Guest's email</h1>
                            <p className='text-[12px]'>{watched.email}</p>
                          </div>
                          <div className='mb-2 mt-2'>
                            <h1 className='font-bold text-[12px] opacity-50 capitalize'>Guest's phone number</h1>
                            <p className='text-[12px]'>{showNumber}</p>
                          </div>
                        </div>
                        <div className='flex gap-2 mb-2 mt-2'>
                          <h1 className='font-bold text-[12px] opacity-50 capitalize'>selected safari package:</h1>
                          <p className='text-[12px]'>{safariPackageTitle}</p>
                        </div>
                      </div>
                    </div>
                    <div className='mb-10'>
                      <h1 className='font-bold text-[10px] uppercase' >Price Summary</h1>
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
                            <p className='text-[12px] titlecase pl-1 opacity-50'>Price of {watched.numberOfAdults} Adult(s)</p>
                            <p className='text-[14px] font-semibold pr-1' >{newAdultPrice} USD</p>
                          </div>
                          <hr />
                        </div>
                        <div className='middle2 mb-8'>
                          <div className='flex flex-row justify-between mb-2'>
                            <p className='text-[12px] titlecase pl-1 opacity-50'>Price of {watched.numberOfKids} Kid(s)</p>
                            <p className='text-[14px] font-semibold pr-1' >{newKidsPrice} USD</p>
                          </div>
                          <hr />
                        </div>
                        <div className='last'>
                          <div className='flex flex-row justify-between mb-2'>
                            <p className='text-[12px] titlecase pl-1 opacity-50'>Total</p>
                            <p className='text-[14px] font-semibold pr-1 text-[#ED1C24]' >{totalPrice} USD</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2 items-center bg-[#D3D3D3] text-primary p-[40px] divide-x-1 divide-gray-500'>
                      <div className='costIncludes'>
                        <h1 className='font-bold uppercase text-[12px] mb-2 pl-5'>Cost Includes</h1>
                        {costIncludes.map((includes) => (
                          <div key={includes} className='flex items-center gap-2 mb-2'>
                            <span>{smile}</span>
                            <p className='text-[10px]'>{includes}</p>
                          </div>
                        ))}
                      </div>
                      {/* <div className='costDivider p-[20px]'>{divider}</div> */}
                      <div className='costExcludes ml-10'>
                        <h1 className='font-bold uppercase text-[12px] mb-2 pl-5'>Cost Excludes</h1>
                        {costExcludes.map((excludes, index) => (
                          <div key={`${excludes}-${index}`} className='flex items-center gap-2 mb-2'>
                            <span>{sad}</span>
                            <p className='text-[10px]'>{excludes}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                onSubmit={handleSubmit(onSubmit)}
                className="cursor-pointer bg-blue-600 uppercase text-[12px] 
              text-white font-light w-[200px] h-[40px] items-center"
              >
                Proceed to Pay
              </button>
              <a href="/contacts-us">
                <button
                  type='button'
                  className="cursor-pointer bg-[#FD6D0D] uppercase text-[12px] 
              text-white font-light w-[170px] h-[40px] items-center"
                >
                  Send an enquiry
                </button></a>
            </div>
          </form>
        </FormProvider>
      ) : (
        <div>
          <iframe src={redirectUrl}
            width="100%"
            height="600px"
            className="border-0 rounded-lg shadow-lg"
            title="Payment Processing"
            sandbox="allow-scripts allow-forms allow-same-origin allow-top-navigation"
          />
        </div>
      )}
    </div>
  )
}

export default TripCostForm
