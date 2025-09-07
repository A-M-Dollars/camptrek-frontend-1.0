// src/utils/extractFilterOptions.ts

import { Itinerary } from '@/constants/itinerary'

// Type for the options we'll extract
export type FilterOptions = {
  locations: string[]
  accommodationTypes: string[]
  availableDays: number[]
}

// Helper function to extract unique filter options from API data
export const extractFilterOptions = (itineraries: Itinerary[]): FilterOptions => {
  if (!itineraries || itineraries.length === 0) {
    return {
      locations: [],
      accommodationTypes: [],
      availableDays: []
    }
  }

  console.log('🔧 Extracting options from', itineraries.length, 'itineraries')

  // Extract unique locations
  const locations = Array.from(
    new Set(
      itineraries
        .map(item => item.location)
        .filter(location => location && location.trim() !== "") // Remove empty/null values
        .map(location => location.trim()) // Clean up whitespace
    )
  ).sort() // Sort alphabetically

  // Extract unique accommodation types
  const accommodationTypes = Array.from(
    new Set(
      itineraries
        .map(item => item.accommodation)
        .filter(type => type && type.trim() !== "")
        .map(type => type.trim())
    )
  ).sort()

  // Extract unique day durations
  const availableDays = Array.from(
    new Set(
      itineraries
        .map(item => {
          // Handle both array and number types for days
          if (Array.isArray(item.days)) {
            return item.days.length
          } else if (typeof item.days === 'number') {
            return item.days
          }
          return null
        })
        .filter(days => days !== null && days > 0) // Remove invalid days
    )
  ).sort((a, b) => (a! - b!)) // Sort numerically, non-null assertion

  const result = {
    locations,
    accommodationTypes,
    availableDays: availableDays as number[]
  }

  console.log('✅ Extracted options:', result)
  return result
}

// Optional: Export individual extractors if you need them separately
export const extractUniqueLocations = (itineraries: Itinerary[]): string[] => {
  return extractFilterOptions(itineraries).locations
}

export const extractUniqueAccommodationTypes = (itineraries: Itinerary[]): string[] => {
  return extractFilterOptions(itineraries).accommodationTypes
}

export const extractUniqueDays = (itineraries: Itinerary[]): number[] => {
  return extractFilterOptions(itineraries).availableDays
}