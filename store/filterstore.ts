import { create } from "zustand"

type Currency = "USD" | "KES" | "EUR" | "GBP"

// Import the type from utils
import type { FilterOptions } from '@/constants/extracthelper'

type FilterState = {
  // Current filter selections
  location: string
  accommodationType: string
  days: number | null
  budget: number | null
  currency: Currency
  
  // Available options from API data
  availableOptions: FilterOptions
  
  // Actions for filter selections
  setLocation: (loc: string) => void
  setAccommodationType: (type: string) => void
  setDays: (days: number | null) => void
  setBudget: (amount: number | null) => void
  setCurrency: (currency: Currency) => void
  resetFilters: () => void
  
  // Actions for available options
  setAvailableOptions: (options: FilterOptions) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  // Default filter values
  location: "",
  accommodationType: "",
  days: null,
  budget: null,
  currency: "USD",
  
  // Default empty options (will be populated from API)
  availableOptions: {
    locations: [],
    accommodationTypes: [],
    availableDays: []
  },
  
  // Filter actions
  setLocation: (loc) => set({ location: loc }),
  setAccommodationType: (type) => set({ accommodationType: type }),
  setDays: (days) => set({ days }),
  setBudget: (amount) => set({ budget: amount }),
  setCurrency: (currency) => set({ currency }),
  
  // Reset filters but keep available options
  resetFilters: () =>
    set((state) => ({
      location: "",
      accommodationType: "",
      days: null,
      budget: null,
      currency: "USD",
      availableOptions: state.availableOptions // Keep the options!
    })),
    
  // Set available options from API data
  setAvailableOptions: (options) => 
    set({ availableOptions: options }),
}))