'use client'

import React, { useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import ShowcaseCardsSkeleton from '@/components/all_safaris/marketplace-section/marketplace-section-skeleton/skeleton-show-cards'
import { baseInstance } from '@/constants/apis'
import { useParams } from 'next/navigation'
import ShowCaseCards from '@/components/all_safaris/marketplace-section/market-place-show/show-case-cards'
import { Itinerary } from '@/constants/itinerary'
import FilterBarSection from '@/components/all_safaris/filter-bar-section/filterbar'
import { useFilterStore } from '@/store/filterstore'
import { extractFilterOptions } from '@/constants/extracthelper'
import { useUserStore } from '@/store/userstore'
import {CompassLoader} from '@/components/about-us/travel-guides/loaders/loaders'


const SafarisPage = () => {

  const isAuthenticated = useUserStore(state => state.isAuthenticated)

  const params = useParams()

  const handleFetch = async () => {
    const response = await baseInstance.get('/itineraries', { params })
    return response.data
  }

  const { data: allSafaris, isLoading, error } = useQuery({
    queryKey: ['allSafaris', params],
    queryFn: handleFetch,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 35,
  })

  // Get filter values and actions from store
  const {
    location,
    accommodationType,
    days,
    budget,
    currency,
    setAvailableOptions // This is the key function!
  } = useFilterStore()

  // Update filter options when API data changes
  useEffect(() => {
    if (allSafaris?.itineraries && allSafaris.itineraries.length > 0) {
      console.log('🔄 Updating filter options from API data...')

      // Extract unique options from API data
      const options = extractFilterOptions(allSafaris.itineraries)
      console.log('📋 Available options:', options)

      // Update the store with available options
      setAvailableOptions(options)
    }
  }, [allSafaris?.itineraries, setAvailableOptions])

  // Currency conversion rates
  const rates = {
    USD: 1,
    KES: 130,
    EUR: 0.92,
    GBP: 0.78,
  }

  // Filter the itineraries based on filter criteria
  const filteredItineraries = useMemo(() => {
    if (!allSafaris?.itineraries) return []

    console.log('🔍 Applying filters:', { location, accommodationType, days, budget, currency })

    return allSafaris.itineraries.filter((itinerary: Itinerary) => {
      // Match location
      const matchesLocation = location
        ? itinerary.location?.toLowerCase().includes(location.toLowerCase())
        : true

      // Match accommodation type
      const matchesType = accommodationType
        ? itinerary.accommodation === accommodationType
        : true

      // Match days (handle both array and number types)
      const matchesDays = days
        ? (Array.isArray(itinerary.days)
          ? itinerary.days.length === days
          : itinerary.days === days)
        : true



      const passes = matchesLocation && matchesType && matchesDays

      // Debug logging (remove in production)
      if (!passes) {
        console.log('❌ Filtered out:', itinerary.title, {
          matchesLocation,
          matchesType,
          matchesDays,
        })
      }

      return passes
    })
  }, [allSafaris?.itineraries, location, accommodationType, days, currency])

  if (isLoading) {
    return (
      <div>
        <div className='grid grid-cols-4 gap-4'>
          {[...Array(10)].map((_, index) => (
            <ShowcaseCardsSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-red-500 p-4'>
        <h2>Error loading safaris</h2>
        <p>{error?.message || 'Unknown error occurred'}</p>
        <CompassLoader/>
      </div>
    )
  }

  if (!allSafaris) {
    return <div>No data available</div>
  }

  return (
    <div>
      {/* Filter section - will automatically use dynamic options */}
      <div className='ads mt-5 xl:mt-0'>
        <FilterBarSection />
      </div>

      {/* Results section */}
      <div className='alltours grid md:grid-cols-2 xl:grid-cols-5 gap-4 mb-5 ml-5 mr-5 xl:mr-5'>
        {filteredItineraries && filteredItineraries.length > 0 ? (
          filteredItineraries.map((itinerary: Itinerary) =>
            <ShowCaseCards key={itinerary.id} {...itinerary} />
          )
        ) : (
          <div className="col-span-5 text-center py-10">
            <h3 className="text-lg font-semibold text-gray-600">No matching safaris found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div>
        <div>
          <p className='
          text-[12px] font-light uppercase flex justify-center mb-10 text-black
          mt-10 xl:mt-0
          '
          >
            Page {allSafaris.current_page} of {allSafaris.pages}</p>
        </div>
      </div>

    </div>
  )
}

export default SafarisPage