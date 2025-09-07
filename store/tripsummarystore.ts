import { create } from "zustand"
import { persist } from "zustand/middleware"

type tripSummaryProp = {
    itineraryId: string,
    name: string,
    email: string,
    phoneNumber: string,
    safariPackage: string,
    adultsAttending: number,
    kidsAttending: number,
    bookedRooms: number,
    adultPrice: number,
    kidsPrice: number,
    costIncludes: string[],
    costExcludes: string[],

    setData: (
        name: string,
        email: string,
        phoneNumber: string,
        adultsAttending: number,
        kidsAttending: number,
        bookedRooms: number
    ) => void,

    setSafariDetails: (
        itineraryId: string,
        safariPackage: string,
        adultPrice: number,
        kidsPrice: number,
        costIncludes: string[],
        costExcludes: string[]
    ) => void,

    getTotalPrice: () => {
        newAdultPrice: number,
        newKidsPrice: number,
        totalPrice: string
    }
}

export const tripCostSummaryStore = create<tripSummaryProp>()(
    persist(
        (set, get) => ({
            itineraryId: '',
            name: '',
            email: '',
            phoneNumber: '',
            safariPackage: '',
            adultsAttending: 0,
            kidsAttending: 0,
            bookedRooms: 0,
            adultPrice: 0,
            kidsPrice: 0,
            costIncludes: [],
            costExcludes: [],

            setData: (name, email, phoneNumber, adultsAttending, kidsAttending, bookedRooms) => {
                set({ name, email, phoneNumber, adultsAttending, kidsAttending, bookedRooms });
            },

            setSafariDetails: (itineraryId, safariPackage, adultPrice, kidsPrice, costIncludes, costExcludes) => {
                set({ itineraryId, safariPackage, adultPrice, kidsPrice, costIncludes, costExcludes });
            },

            getTotalPrice: () => {
                const { adultPrice, kidsPrice, adultsAttending, kidsAttending } = get()
                const newAdultPrice = adultPrice * adultsAttending
                const newKidsPrice = kidsPrice * kidsAttending
                const totalPrice = (newAdultPrice + newKidsPrice).toString()

                return { newAdultPrice, newKidsPrice, totalPrice }
            }
        }),
        { name: 'trip-summary' }
    )
)
