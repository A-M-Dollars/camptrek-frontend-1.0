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
import { useRouter } from 'next/navigation';

type TripCostFormProps = {
  safariPackageTitle: string;
  safariPackageDuration: number;
  itineraryId: string;
  adultPrice: number;
  kidsPrice: number;
  costIncludes: string[];
  costExcludes: string[];
}

const TripCostForm = ({ adultPrice, kidsPrice, costExcludes, costIncludes, safariPackageTitle, safariPackageDuration, itineraryId }: TripCostFormProps) => {
  const { email, name } = useUserStore()
  const { setData, getTotalPrice } = tripCostSummaryStore()
  const router = useRouter() // ✅ Fixed: Moved to component level

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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // ✅ Payment submission (opens new tab)
  const onSubmit = async (data: TripInfoForm) => {
    setIsSubmitting(true)
    setSubmitError(null)

    const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;
    let newTab: Window | null = null;

    if (redirectUrl) {
      newTab = window.open('about:blank', '_blank');
    }

    const savedPhoneNumber = watched.countryCode + ' ' + watched.phoneNumber

    const payLoad = {
      full_name: data.fullName,
      email: data.email,
      phone_number: savedPhoneNumber,
      start_date: data.startDate,
      number_of_rooms: data.numberOfRooms,
      number_of_adults: data.numberOfAdults,
      number_of_children: data.numberOfKids,
      dietary_needs: data.dietaryNeeds,
      dietary_info: data.dietInfo,
      special_requests: data.specialRequest,
      occasion_info: data.occasionInfo,
      itinerary_id: itineraryId,
      country: data.country,
      total_amount: totalPrice,
      currency: data.currency
    }

    // payload expects

    const newPayload = {
      itinerary_name: safariPackageTitle,
      itinerary_duration: safariPackageDuration,
      full_name: data.fullName,
      email: data.email,
      phone_number: savedPhoneNumber,
      start_date: data.startDate,
      number_of_rooms: data.numberOfRooms,
      number_of_adults: data.numberOfAdults,
      number_of_children: data.numberOfKids,
      total_amount: totalPrice,
      dietary_needs: data.dietaryNeeds,
      dietary_info: data.dietInfo,
      special_requests: data.specialRequest,
      occasion_info: data.occasionInfo,
      country: data.country,
      currency: data.currency,
    }

    try {
      const response = await baseInstance.post('/customer-inquiry/trip-cost-submittion', newPayload);

      if (response.status === 201) {
        const finalUrl = redirectUrl;
        if (newTab && finalUrl) {
          newTab.location.href = finalUrl;
        }
      }
    } catch (error: any) {
      if (newTab) {
        newTab.close();
      }

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

  // ✅ Inquiry submission (navigates to contacts)
  const onSubmit2 = async (data: TripInfoForm) => {
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
      number_of_children: data.numberOfKids,
      dietary_needs: data.dietaryNeeds,
      dietary_info: data.dietInfo,
      special_requests: data.specialRequest,
      occasion_info: data.occasionInfo,
      itinerary_id: itineraryId,
      country: data.country,
      total_amount: totalPrice,
      currency: data.currency
    }

      // payload expects

    const newPayload = {
      itinerary_name: safariPackageTitle,
      itinerary_duration: safariPackageDuration,
      full_name: data.fullName,
      email: data.email,
      phone_number: savedPhoneNumber,
      start_date: data.startDate,
      number_of_rooms: data.numberOfRooms,
      number_of_adults: data.numberOfAdults,
      number_of_children: data.numberOfKids,
      total_amount: totalPrice,
      dietary_needs: data.dietaryNeeds,
      dietary_info: data.dietInfo,
      special_requests: data.specialRequest,
      occasion_info: data.occasionInfo,
      country: data.country,
      currency: data.currency,
    }

    try {
      const response = await baseInstance.post('/customer-inquiry/trip-cost-submittion', newPayload);

      if (response.status === 201) {
        router.push('/safaris') // ✅ Fixed: Using router from component level
      }
    } catch (error: any) {

      if (error.code === 'ERR_NETWORK') {
        setSubmitError(
          'Network error: Unable to connect to service. Please check your internet connection and try again'
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
      <FormProvider {...methods}>
        <form>
          <div className='xl:grid xl:grid-cols-2 xl:gap-6'>
            <div>
              <GuestPersonalInfo />
              <TripDetails
                newAdultPrice={newAdultPrice}
                newKidsPrice={newKidsPrice}
                totalPrice={totalPrice}
                numberOfAdults={watched.numberOfAdults}
                numberofKids={watched.numberOfKids}
                costIncludesi={costIncludes}
                costExcludesi={costExcludes}
              />
              <PersonalRequest />
            </div>

            <div className='hidden xl:block'>
              <div className='mt-5'>
                <h1 className='font-bold text-[12px] uppercase text-center'>Booking Details</h1>
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
                    <h1 className='font-bold text-[10px] uppercase'>Price Summary</h1>
                    <div className='mt-2'>
                      <div className='upper mt-2 mb-15'>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[12px] titlecase pl-1 opacity-50'>No. of People</p>
                          <p className='text-[12px] titlecase pr-1'>Price <br /> (Per Person)</p>
                        </div>
                        <hr />
                      </div>
                      <div className='middle mb-8'>
                        <div className='flex flex-row justify-between mb-2'>
                          <p className='text-[12px] titlecase pl-1 opacity-50'>Price of {watched.numberOfAdults} Adult(s)</p>
                          <p className='text-[14px] font-semibold pr-1'>{newAdultPrice} USD</p>
                        </div>
                        <hr />
                      </div>
                      <div className='middle2 mb-8'>
                        <div className='flex flex-row justify-between mb-2'>
                          <p className='text-[12px] titlecase pl-1 opacity-50'>Price of {watched.numberOfKids} Kid(s)</p>
                          <p className='text-[14px] font-semibold pr-1'>{newKidsPrice} USD</p>
                        </div>
                        <hr />
                      </div>
                      <div className='last'>
                        <div className='flex flex-row justify-between mb-2'>
                          <p className='text-[12px] titlecase pl-1 opacity-50'>Total</p>
                          <p className='text-[14px] font-semibold pr-1 text-[#ED1C24]'>{totalPrice} USD</p>
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

          {/* ✅ Display error message if exists */}
          {submitError && (
            <div className="text-red-600 text-sm mb-4 text-center">
              {submitError}
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <button
              type="button" // ✅ Fixed: Changed from "submit" to "button"
              onClick={handleSubmit(onSubmit)} // ✅ Fixed: Changed from onSubmit to onClick
              disabled={isSubmitting}
              className="cursor-pointer bg-blue-600 uppercase text-[12px] 
                text-white font-light w-[200px] h-[40px] items-center disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Pay'}
            </button>

            <button
              type="button" // ✅ Added explicit type
              onClick={handleSubmit(onSubmit2)} // ✅ Consistent with first button
              disabled={isSubmitting} // ✅ Added disabled state
              className="cursor-pointer bg-[#FD6D0D] uppercase text-[12px] 
                text-white font-light w-[170px] h-[40px] items-center disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Send an enquiry'}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default TripCostForm