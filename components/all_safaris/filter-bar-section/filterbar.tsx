'use client'

import { useFilterStore } from '@/store/filterstore'
import React from 'react'

const FilterBarSection = () => {
    const {
        // Current filter values
        location,
        accommodationType,
        days,
        budget,
        currency,
        
        // Available options from API
        availableOptions,
        
        // Actions
        setLocation,
        setAccommodationType,
        setDays,
        setBudget,
        setCurrency,
        resetFilters,
    } = useFilterStore()

    // Get the dynamic options from store
    const { locations, accommodationTypes, availableDays } = availableOptions

    return (
        <div className="
        p-4 space-y-4 ml-[15%] mr-[15%] mb-3
        shadow xl:grid xl:grid-cols-5 gap-2 items-center">
            
            {/* Dynamic Location Filter */}
            <div className='filterLocation'>
                <label className="block font-regular text-[10px] text-center uppercase pb-2">Filter by location</label>
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-2 w-full border p-2 w-full block font-regular text-[12px] text-center uppercase pb-2"
                >
                    <option value="">All Locations</option>
                    {locations.length > 0 ? (
                        locations.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))
                    ) : (
                        <option disabled>Loading locations...</option>
                    )}
                </select>
            </div>

            {/* Dynamic Accommodation Type Filter */}
            <div className='filterAccommodation'>
                <label className="block font-regular text-[10px] text-center uppercase pb-2">Filter by Accommodation</label>
                <select
                    value={accommodationType}
                    onChange={(e) => setAccommodationType(e.target.value)}
                    className="border p-2 w-full border p-2 w-full block font-regular text-[12px] text-center uppercase pb-2"
                >
                    <option value="">All Types</option>
                    {accommodationTypes.length > 0 ? (
                        accommodationTypes.map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))
                    ) : (
                        <option disabled>Loading types...</option>
                    )}
                </select>
            </div>

            {/* Dynamic Days Filter */}
            <div className='filterbyDays'>
                <label className="block font-regular text-[10px] text-center uppercase pb-2">Filter by Days</label>
                <select
                    value={days ?? ''}
                    onChange={(e) => setDays(e.target.value ? Number(e.target.value) : null)}
                    className="border p-2 w-full border p-2 w-full block font-regular text-[12px] text-center uppercase pb-2"
                >
                    <option value="">All Durations</option>
                    {availableDays.length > 0 ? (
                        availableDays.map((dayCount) => (
                            <option key={dayCount} value={dayCount}>
                                {dayCount} {dayCount === 1 ? 'Day' : 'Days'}
                            </option>
                        ))
                    ) : (
                        <option disabled>Loading durations...</option>
                    )}
                </select>
            </div>

            {/* Budget Filter */}
            {/* <div className="budget">
                <label className="block font-regular text-[12px] capitalize">Max Budget</label>
                <input
                    type="number"
                    placeholder={`Enter max budget in ${currency}`}
                    value={budget ?? ""}
                    onChange={(e) => {
                        const value = e.target.value.trim()
                        setBudget(value && !isNaN(Number(value)) ? Number(value) : null)
                    }}
                    className="border p-2 rounded w-full"
                    min="0"
                    step="1"
                />
            </div> */}
            
            {/* Currency Filter */}
            <div className='select currency'>
                <label className="block font-regular text-[10px] text-center uppercase pb-2">Currency Calculator</label>
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="border p-2 w-full block font-regular text-[12px] text-center uppercase pb-2"
                >
                    <option value="USD">USD ($)</option>
                    <option value="KES">KES (KSh)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                </select>
            </div>

            {/* Reset Button */}
            <button
                onClick={resetFilters}
                className="
                bg-[#FD6D0D] text-white font-light uppercase
                text-[12px] h-[32px] w-full hover:bg-blue-600
                transition-colors duration-200 mt-[18px]"
            >
                Reset filters
            </button>
            
            {/* Debug Info (remove in production) */}
            <div className="col-span-6 text-xs text-gray-500 bg-gray-50 p-2 rounded mt-2">
                <strong>Available Options:</strong><br/>
                Location(s): {locations.length} | 
                Accomodation Type: {accommodationTypes.length} | 
                Days: {availableDays.length}
                {locations.length === 0 && <span className="text-orange-500"> ⚠️ Waiting for API data...</span>}
            </div>
        </div>
    )
}

export default FilterBarSection