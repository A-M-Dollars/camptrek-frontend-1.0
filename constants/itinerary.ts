import { Dispatch, SetStateAction } from "react";


export type ImageProps = {
  id: string
  image_url: string
}

export type DaysProps = {
  id: string
  day_number: number
  title: string
  details: string
  images: ImageProps[]
}

export type Itinerary = {
  id: string
  title: string
  duration: number
  overview: string
  images: ImageProps[]
  days: DaysProps[]
  price: number
  tags: string
  arrival_city: string
  departure_city: string
  accommodation: string
  location: string
  discount: number
  cost_inclusive: string[]
  cost_exclusive: string[]
}

export type ItineraryProps = {
  safariData: Itinerary
  onImageChange: Dispatch<SetStateAction<ImageProps[] | null>> 
}