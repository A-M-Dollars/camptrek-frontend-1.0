'use client'

import { Suspense } from 'react'
import { CompassLoader } from '@/components/about-us/travel-guides/loaders/loaders'
import React, { useMemo, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ShowcaseCardsSkeleton from '@/components/all_safaris/marketplace-section/marketplace-section-skeleton/skeleton-show-cards'
import { baseInstance } from '@/constants/apis'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import ShowCaseCards from '@/components/all_safaris/marketplace-section/market-place-show/show-case-cards'
import { ListItineraryProp, ItineraryProp } from '@/constants/itinerary'
import FilterBarSection from '@/components/all_safaris/filter-bar-section/filterbar'
import { useFilterStore } from '@/store/filterstore'
import { extractFilterOptions } from '@/constants/extracthelper'
import { useUserStore } from '@/store/userstore'

const SafarisContent = () => {
  const isAuthenticated = useUserStore(state => state.isAuthenticated)
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get current page from URL params, default to 1
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const handleFetch = async () => {
    // Include page parameter in the API request
    const apiParams = {
      ...params,
      page: currentPage
    }
    const response = await baseInstance.get('/itineraries', { params: apiParams })
    console.log(response.data)
    return response.data
  }

  const { data: allSafaris, isLoading, error } = useQuery<ListItineraryProp>({
    queryKey: ['allSafaris', params, currentPage],
    queryFn: handleFetch,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 35,
  })

  console.log(allSafaris)
  
  // Get filter values and actions from store
  const {
    location,
    accommodationType,
    days,
    budget,
    currency,
    setAvailableOptions
  } = useFilterStore()

  // Update filter options when API data changes
  useEffect(() => {
    if (allSafaris?.itineraries && allSafaris.itineraries.length > 0) {
      const options = extractFilterOptions(allSafaris.itineraries)
      setAvailableOptions(options)
    }
  }, [allSafaris?.itineraries, setAvailableOptions])

  // Filter the itineraries based on filter criteria
  const filteredItineraries = useMemo(() => {
    if (!allSafaris?.itineraries) return []

    return allSafaris.itineraries.filter((itinerary: ItineraryProp) => {
      // Match location
      const matchesLocation = location
        ? itinerary.location?.toLowerCase().includes(location.toLowerCase())
        : true

      // Match accommodation type
      const matchesType = accommodationType
        ? itinerary.accommodation === accommodationType
        : true

      // Match days (itinerary.days is an array, so check its length)
      const matchesDays = days
        ? itinerary.days.length === days
        : true

      return matchesLocation && matchesType && matchesDays
    })
  }, [allSafaris?.itineraries, location, accommodationType, days])

  // Function to handle page navigation
  const handlePageChange = (page: number) => {
    // Create new URLSearchParams to preserve existing query params
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', page.toString())
    
    // Navigate to new page with updated search params
    router.push(`?${newSearchParams.toString()}`)
  }

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    if (!allSafaris?.pages) return []
    
    const totalPages = allSafaris.pages
    const current = currentPage
    const pageNumbers = []
    
    // Show up to 5 page numbers with current page in center when possible
    const maxVisible = 5
    let start = Math.max(1, current - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)
    
    // Adjust start if we're near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }
    
    return pageNumbers
  }

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
      {/* Filter section */}
      <div className='ads mt-5 xl:mt-0'>
        <FilterBarSection />
      </div>

      {/* Results section */}
      <div className='alltours grid md:grid-cols-2 xl:grid-cols-5 gap-4 mb-5 ml-5 mr-5 xl:mr-5'>
        {filteredItineraries && filteredItineraries.length > 0 ? (
          filteredItineraries.map((itinerary: ItineraryProp) => 
            
            <ShowCaseCards key={itinerary.id} {...itinerary} />
          )
        ) : (
          <div className="col-span-5 text-center py-10">
            <h3 className="text-lg font-semibold text-gray-600">No matching safaris found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      {allSafaris.pages > 1 && (
        <div className="flex justify-center items-center space-x-2 mb-5 mt-10 xl:mt-0">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-[12px] font-medium uppercase cursor-pointer w-[84px] ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-[#FD6D0D] hover:text-white transition-colors'
            }`}
          >
            Previous
          </button>

          {/* First page if not visible in page numbers */}
          {generatePageNumbers()[0] > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                1
              </button>
              {generatePageNumbers()[0] > 2 && (
                <span className="px-3 py-2 text-gray-500">...</span>
              )}
            </>
          )}

          {/* Page numbers */}
          {generatePageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                pageNum === currentPage
                  ? 'bg-[#FD6D0D] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-[#FD6D0D] hover:text-white'
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* Last page if not visible in page numbers */}
          {generatePageNumbers()[generatePageNumbers().length - 1] < allSafaris.pages && (
            <>
              {generatePageNumbers()[generatePageNumbers().length - 1] < allSafaris.pages - 1 && (
                <span className="px-3 py-2 text-gray-500">...</span>
              )}
              <button
                onClick={() => handlePageChange(allSafaris.pages)}
                className="px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {allSafaris.pages}
              </button>
            </>
          )}

          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === allSafaris.pages}
            className={`px-3 py-2 text-[12px] font-medium uppercase cursor-pointer w-[84px] ${
              currentPage === allSafaris.pages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-[#FD6D0D] hover:text-white transition-colors'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Page info */}
      <div className="text-center mb-5">
        <p className="text-[12px] font-light uppercase text-[#FD6D0D]">
          Page {allSafaris.current_page} of {allSafaris.pages}
        </p>
      </div>
    </div>
  )
}

// Main component wrapped with Suspense
const SafarisPage = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <CompassLoader />
      </div>
    }>
      <SafarisContent />
    </Suspense>
  )
}

export default SafarisPage