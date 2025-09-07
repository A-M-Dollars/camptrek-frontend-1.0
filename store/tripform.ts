import { z } from 'zod'

const currencySchema = z.enum(["KES", "USD", "GBP", "EUR", "JPY"])

export const tripInfoFormSchema = z.object({
    fullName: z.string().min(1, { message: "Please enter your full name" }),
    email: z.email({ message: "Please enter a valid email address" }),
    countryCode: z.string().max(4, { message: "Please select a valid country code" }),
    phoneNumber: z.string().min(1, { message: "Please enter your phone number" }),

    country: z.string(),
    currency: z.enum(["KES", "USD", "GBP", "EUR", "JPY"]), // requ

    startDate: z.string().min(1, { message: "Please select your trip start date" }),
    numberOfRooms: z.number().min(1, { message: "Please specify at least 1 room" }),
    numberOfAdults: z.number().min(1, { message: "Please specify at least 1 adult guest" }),
    numberOfKids: z.number().min(0, { message: "Number of children cannot be negative" }),

    dietaryNeeds: z.string().optional(),
    dietInfo: z.string().optional(),
    specialRequest: z.string().optional(),
    occasionInfo: z.string().optional()
})

export type TripInfoForm = z.infer<typeof tripInfoFormSchema>