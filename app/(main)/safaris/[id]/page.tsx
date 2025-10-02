'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { baseInstance } from '@/constants/apis'
import { ItineraryProp, ImagesProp } from '@/constants/itinerary'
import SafariDetails from '@/components/individual_safari/trip-overview-section/safari-details'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import TripCostForm from '@/components/individual_safari/trip-cost-section/trip-cost-form-section/tripcostform'
import ImageShowcase from '@/components/individual_safari/trip-overview-section/images-showcase-carousel'
import ItineraryGoogleImage from '@/components/individual_safari/trip-itinerary-section/itinerary-google-map'
import { useUserStore } from '@/store/userstore'
import { useQuery } from "@tanstack/react-query"


const Individual = () => {
    const isAuthenticated = useUserStore(state => state.isAuthenticated)

    // calling the API to get the safari details
    const params = useParams()
    const id = params.id

    const handleFetch = async (id: string) => {
        const response = await baseInstance.get(`/itineraries/${id}`)
        return response.data
    }

    const {
        data: individualPackage,
        isLoading,
        error,
    } = useQuery<ItineraryProp>({
        queryKey: ['individualPackage', id],
        queryFn: () => handleFetch(id as string),
        staleTime: 1000 * 60 * 30
    })

    const adultPrice = individualPackage?.price ?? 0
    const kidsPrice = individualPackage?.price !== undefined ? individualPackage.price * 0.5 : 0
    const totalPackagePrice = adultPrice + kidsPrice

    // handling the handleClicks
    const scrollableRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const [activeTab, setActiveTab] = useState<string>('Trip Overview')
    const [activeImages, setActiveImages] = useState<ImagesProp[] | null>(null)
    const [selectedItem, setSelectedItem] = useState<ImagesProp | null>(null)

    // Scroll redirection effect
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const container = containerRef.current
            const scrollable = scrollableRef.current
            if (!container || !scrollable) return

            const rect = container.getBoundingClientRect()
            const isWithinComponent =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom

            if (isWithinComponent) {
                const scrollableRect = scrollable.getBoundingClientRect()
                const isOverScrollable =
                    e.clientX >= scrollableRect.left &&
                    e.clientX <= scrollableRect.right &&
                    e.clientY >= scrollableRect.top &&
                    e.clientY <= scrollableRect.bottom

                if (!isOverScrollable) {
                    e.preventDefault()
                    scrollable.scrollBy({ top: e.deltaY, behavior: 'auto' })
                }
            }
        }

        window.addEventListener('wheel', handleWheel, { passive: false })
        return () => {
            window.removeEventListener('wheel', handleWheel)
        }
    }, [])

    // Clean up intervals and reset state when tab changes
    const handleTabChange = (newTab: string) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }

        if (newTab !== 'Trip Itinerary') {
            setActiveImages(null)
            setSelectedItem(null)
        }

        setActiveTab(newTab)
    }

    // related to the itinerary section
    const items = activeImages ?? []
    const thumbnails: (ImagesProp | 'map')[] = activeTab === 'Trip Itinerary' ? ['map', ...items] : []

    const currentIndex = selectedItem && items.length > 0
        ? items.findIndex(item => item.image.public_id === selectedItem.image.public_id)
        : 0

    const visibleThumbnails = Math.floor(700 / (96 + 12))
    const startIndex = Math.max(0, Math.min(currentIndex - Math.floor(visibleThumbnails / 2), items.length - visibleThumbnails))

    const handleItemSelect = (item: ImagesProp) => {
        setSelectedItem(item)
        resetInterval()
    }

    const showNextItem = () => {
        if (items.length === 0) return
        const nextIndex = (currentIndex + 1) % items.length
        setSelectedItem(items[nextIndex])
    }

    const resetInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(showNextItem, 4000)
    }

    // Auto-cycling effect
    useEffect(() => {
        if (activeTab === 'Trip Itinerary' && items.length > 0) {
            resetInterval()
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [currentIndex, activeTab, items.length])

    const center = {
        lat: -1.9459491430465337,
        lng: 30.06519405688547,
    }

    const renderMainContent = () => {
        if (!selectedItem && center) {
            return <ItineraryGoogleImage center={center} />
        }

        if (selectedItem?.image.url) {
            return (
                <Image
                    src={selectedItem.image.url}
                    alt="itinerary image"
                    fill
                    placeholder="blur"
                    blurDataURL={selectedItem.image.url}
                    onClick={() => setSelectedItem(null)}
                    className="object-cover transition-opacity duration-600"
                />
            )
        }

        return null
    }

    const renderThumbnail = (thumb: ImagesProp | 'map') => {
        if (thumb === 'map') {
            return (
                <div
                    onClick={() => setSelectedItem(null)}
                    className="w-full h-full bg-green-100 flex items-center justify-center cursor-pointer"
                >
                    <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </div>
            )
        }

        return (
            <Image
                src={thumb.image.url}
                alt="itinerary thumbnail"
                fill
                className="object-cover"
            />
        )
    }

    const renderContentAccordingToTAb = () => {
        switch (activeTab) {
            case 'Trip Overview':
                return (
                    <div className='xl:grid xl:grid-cols-2 xl:gap-6 mb-10 mt-10'>
                        <div className='left w-full'>
                            <ImageShowcase images={individualPackage?.images ?? []} map={individualPackage?.map as ItineraryProp['map']} />
                        </div>
                        <div className='right w-full mt-2 xl:mt-0'>
                            <SafariDetails
                                tags={individualPackage?.tags ?? []}
                                title={individualPackage?.title ?? ''}
                                arrival_city={individualPackage?.arrival_city ?? ''}
                                departure_city={individualPackage?.departure_city ?? ''}
                                overview={individualPackage?.overview ?? ''}
                            />
                        </div>
                    </div>
                )

            case 'Trip Itinerary':
                return (
                    <div>
                        {individualPackage?.days && individualPackage?.days.length > 0 ? (
                            individualPackage.days.map((day) => (
                                <div className="xl:pl-50 xl:pr-50" key={day.day_number}>
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full border-2 p-3 mb-1 rounded-sm justify-center"
                                        defaultValue="item-1"
                                    >
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                Day {day.day_number} : {day.title}
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-2">
                                                <div className="itinerary-description">
                                                    <p className="text-[12px] xl:text-[13px] text-gray-600">
                                                        {day.details}
                                                    </p>
                                                </div>

                                                <div className="accomodation">
                                                    {day.hotel_detail && day.hotel_detail.images.length > 0 ? (
                                                        <Carousel opts={{ align: "start" }} className="w-full relative">
                                                            <h1 className="font-medium text-base mt-2 mb-2 ml-1" >Accomodation</h1>
                                                            <div className="mb-2 text-blue-600 ml-1 font-medium text-base capitalize">
                                                                {/* <p>
                                                                    {day.hotel_detail.name}
                                                                </p> */}
                                                                <a href={day.hotel_detail.url}>{day.hotel_detail.name}</a>
                                                            </div>
                                                            <CarouselContent>
                                                                {day.hotel_detail.images.map((imageWrapper, idx) => (
                                                                    <CarouselItem
                                                                        key={idx}
                                                                        className="md:basis-1/2 lg:basis-1/3 w-[150px] h-[350px]"
                                                                    >

                                                                        <img
                                                                            src={imageWrapper.image.url}
                                                                            className="w-full h-full object-cover"
                                                                            alt={`Day ${day.day_number} image ${idx + 1}`}
                                                                        />

                                                                    </CarouselItem>
                                                                ))}
                                                            </CarouselContent>

                                                            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm" />
                                                            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm" />
                                                        </Carousel>
                                                    ) : (
                                                        <p>No images available</p>
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            ))
                        ) : (
                            <p>No itinerary days available.</p>
                        )}
                    </div>
                )

            case 'Trip Cost Summary':
                return (
                    <div className='mb-10'>
                        <div className='left w-full'>
                            <TripCostForm
                                adultPrice={adultPrice}
                                kidsPrice={kidsPrice}
                                costIncludes={individualPackage?.cost_inclusive?.map(item => item.item) ?? []}
                                costExcludes={individualPackage?.cost_exclusive?.map(item => item.item) ?? []}
                                safariPackageTitle={individualPackage?.title ?? ''}
                                safariPackageDuration={individualPackage?.duration ?? 0}
                                itineraryId={individualPackage?.id ?? ''}
                            />
                        </div>
                    </div>
                )

            default:
                return (
                    <div className='xl:grid xl:grid-cols-2 xl:gap-6 mb-10'>
                        <div className='left w-full'>
                            <ImageShowcase images={individualPackage?.images ?? []} map={individualPackage?.map as ItineraryProp['map']} />
                        </div>
                        <div className='right w-full'>
                            <SafariDetails
                                tags={individualPackage?.tags ?? []}
                                title={individualPackage?.title ?? ''}
                                arrival_city={individualPackage?.arrival_city ?? ''}
                                departure_city={individualPackage?.departure_city ?? ''}
                                overview={individualPackage?.overview ?? ''}
                            />
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className='w-full'>
            <div className='w-full max-w-6xl mx-auto place-items-center'>
                <div className="flex space-x-8 border-b mb-6 mt-4 xl:mt-0">
                    {['Trip Overview', 'Trip Itinerary', 'Trip Cost Summary'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-[10px] xl:text-[12px] cursor-pointer uppercase border-b-2 ${activeTab === tab
                                ? 'border-[#FD6D0D] text-[#FD6D0D] xl:font-semibold'
                                : 'border-transparent text-gray-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            <div className="tab-content pl-4 pr-8">
                {renderContentAccordingToTAb()}
            </div>
        </div>
    )
}

export default Individual