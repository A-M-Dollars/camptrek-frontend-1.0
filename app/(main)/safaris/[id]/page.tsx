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
import { Card, CardContent } from "@/components/ui/card"

import { baseInstance } from '@/constants/apis'
import { Itinerary, ImageProps } from '@/constants/itinerary'
import SafariDetails from '@/components/individual_safari/trip-overview-section/safari-details'
import TripItineraryContainer, { TripItineraryCalltoAction } from '@/components/individual_safari/trip-itinerary-section/trip-itinerary'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import TripCostForm from '@/components/individual_safari/trip-cost-section/trip-cost-form-section/tripcostform'
import ImageShowcase from '@/components/individual_safari/trip-overview-section/images-showcase-carousel'
import ItineraryGoogleImage from '@/components/individual_safari/trip-itinerary-section/itinerary-google-map'
import { useUserStore } from '@/store/userstore'
import NewItinerarysect from '@/components/newChanges/newItinerarysect'



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
        error, } = useQuery<Itinerary>({
            queryKey: ['individualPackage', id],
            queryFn: () => handleFetch(id as string),
            staleTime: 1000 * 60 * 30
        })

    console.log(individualPackage)

    const adultPrice = individualPackage?.price ?? 0
    const kidsPrice = individualPackage?.price !== undefined ? individualPackage.price * 0.5 : 0
    const totalPackagePrice = adultPrice + kidsPrice


    // handling the handleClicks

    const scrollableRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const categories = ['Trip Summary', 'Trip Itinerary', 'Trip Cost Summary'];
    const [activeTab, setActiveTab] = useState<string>('Trip Summary');
    const [activeImages, setActiveImages] = useState<ImageProps[] | null>(null);
    const [selectedItem, setSelectedItem] = useState<ImageProps | null>(null);


    // Scroll redirection effect
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const container = containerRef.current;
            const scrollable = scrollableRef.current;
            if (!container || !scrollable) return;

            const rect = container.getBoundingClientRect();
            const isWithinComponent =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;

            if (isWithinComponent) {
                const scrollableRect = scrollable.getBoundingClientRect();
                const isOverScrollable =
                    e.clientX >= scrollableRect.left &&
                    e.clientX <= scrollableRect.right &&
                    e.clientY >= scrollableRect.top &&
                    e.clientY <= scrollableRect.bottom;

                if (!isOverScrollable) {
                    e.preventDefault();
                    scrollable.scrollBy({ top: e.deltaY, behavior: 'auto' });
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    // Clean up intervals and reset state when tab changes
    const handleTabChange = (newTab: string) => {
        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Reset image-related state when leaving Trip Itinerary
        if (newTab !== 'Trip Itinerary') {
            setActiveImages(null);
            setSelectedItem(null);
        }

        setActiveTab(newTab);
    };

    // related to the itinerary section, this is used to handle the click on the image

    const items = activeImages ?? [];
    const thumbnails: (ImageProps | 'map')[] = activeTab === 'Trip Itinerary' ? ['map', ...items] : [];

    const currentIndex = selectedItem && items.length > 0
        ? items.findIndex(item => item.id === selectedItem.id)
        : 0;

    const visibleThumbnails = Math.floor(700 / (96 + 12));
    const startIndex = Math.max(0, Math.min(currentIndex - Math.floor(visibleThumbnails / 2), items.length - visibleThumbnails));

    const handleItemSelect = (item: ImageProps) => {
        setSelectedItem(item);
        resetInterval();
    };

    const showNextItem = () => {
        if (items.length === 0) return;
        const nextIndex = (currentIndex + 1) % items.length;
        setSelectedItem(items[nextIndex]);
    };

    const resetInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(showNextItem, 4000);
    };

    // Auto-cycling effect - only run when on Trip Itinerary tab with images
    useEffect(() => {
        if (activeTab === 'Trip Itinerary' && items.length > 0) {
            resetInterval();
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [currentIndex, activeTab, items.length]);

    // some little for the gooogle maps
    const center = {
        lat: -1.9459491430465337,
        lng: 30.06519405688547,
    }

    const renderMainContent = () => {
        // If no image selected, show map
        if (!selectedItem && center) {
            return <ItineraryGoogleImage center={center} />;
        }

        if (selectedItem?.image_url) {
            return (
                <Image
                    src={selectedItem.image_url}
                    alt="itinerary image"
                    fill
                    placeholder="blur"
                    blurDataURL={selectedItem.image_url}
                    onClick={() => setSelectedItem(null)}
                    className="object-cover transition-opacity duration-600"
                />
            );
        }

        return null;
    };

    const renderThumbnail = (thumb: ImageProps | 'map') => {
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
            );
        }

        return (
            <Image
                src={thumb.image_url}
                alt="itinerary thumbnail"
                fill
                className="object-cover"
            />
        );
    };

    // handling layout: Here tabs are declared to render different content 
    const renderContentAccordingToTAb = () => {
        switch (activeTab) {
            case 'Trip Overview':
                return (
                    <div className='
                    xl:grid xl:grid-cols-2 xl:gap-6 mb-10
                    '>
                        <div className='left w-full'>
                            <ImageShowcase images={individualPackage?.images ?? []} />
                        </div>
                        <div className='right w-full mt-2 xl:mt-0'>
                            <SafariDetails
                                tags={individualPackage?.tags ?? ''}
                                title={individualPackage?.title ?? ''}
                                arrival_city={individualPackage?.arrival_city ?? ''}
                                departure_city={individualPackage?.departure_city ?? ''}
                                overview={individualPackage?.overview ?? ''}
                            />
                        </div>
                    </div>
                )

            case 'Trip Itinerary':
                // Updated code with scrollable itinerary container
                // if (!activeImages || activeImages.length === 0) {
                //     return (
                //         <div className='xl:grid xl:grid-cols-2 xl:gap-6 xl:items-start mb-10'>
                //             <div className='left w-full xl:sticky xl:top-4'>
                //                 <TripItineraryCalltoAction />
                //             </div>
                //             <div className='right w-full xl:max-h-[600px] xl:overflow-y-auto xl:pr-2'> {/* Added scrollable container */}
                //                 <TripItineraryContainer
                //                     onImageChange={setActiveImages}
                //                     safari={individualPackage || {} as Itinerary}
                //                     isLoading={isLoading}
                //                     error={!!error}
                //                 />
                //             </div>
                //         </div>
                //     )
                // }
                // return (
                //     <div className='xl:grid xl:grid-cols-2 xl:gap-6 xl:items-start mb-10'> {/* Added xl:items-start here too */}
                //         <div className='left w-full xl:sticky xl:top-4'> {/* Made images sticky */}
                //             <div>
                //                 {/* Main Content */}
                //                 <div className="relative w-full h-[250px] md:h-[515px] xl:h-[515px] mb-1 overflow-hidden shadow-lg">
                //                     {renderMainContent()}
                //                 </div>

                //                 {/* Image Counter */}
                //                 <div className="flex justify-between items-center mb-1 text-[12px] text-gray-600">
                //                     <span>{currentIndex + 1} of {activeImages.length}</span>
                //                 </div>

                //                 {/* Thumbnails */}
                //                 <div className="relative">
                //                     <div className="overflow-hidden justify-between items-center">
                //                         <div
                //                             className="flex gap-3 transition-transform duration-150 ease-in-out"
                //                             style={{
                //                                 transform: `translateX(-${startIndex * (96 + 12)}px)`
                //                             }}
                //                         >
                //                             {thumbnails.map((thumb, index) => (
                //                                 <button
                //                                     key={index}
                //                                     onClick={() =>
                //                                         thumb === 'map' ? setSelectedItem(null) : handleItemSelect(thumb as ImageProps)
                //                                     }
                //                                     className={`relative flex-shrink-0 w-24 h-24 overflow-hidden transition-all duration-200 ${thumb !== 'map' &&
                //                                         selectedItem &&
                //                                         selectedItem.id === (thumb as ImageProps).id
                //                                         ? 'scale-105 shadow-lg'
                //                                         : 'hover:border-gray-400 hover:scale-102'
                //                                         }`}
                //                                 >
                //                                     {renderThumbnail(thumb)}
                //                                     {thumb !== 'map' &&
                //                                         selectedItem &&
                //                                         selectedItem.id === (thumb as ImageProps).id && (
                //                                             <div className="absolute inset-0 bg-blue-500/20" />
                //                                         )}
                //                                 </button>
                //                             ))}
                //                         </div>
                //                     </div>
                //                 </div>

                //                 {/* Dots */}
                //                 <div className="flex justify-center mt-3 xl:mt-2 gap-2">
                //                     {items.map((_, index) => (
                //                         <button
                //                             key={index}
                //                             onClick={() => handleItemSelect(items[index])}
                //                             className={`w-1 h-1 rounded-full transition-all duration-200 ${index === currentIndex
                //                                 ? 'bg-black scale-125'
                //                                 : 'bg-gray-300 hover:bg-gray-400'
                //                                 }`}
                //                         />
                //                     ))}
                //                 </div>
                //             </div>
                //         </div>
                //         <div className='right w-full xl:max-h-[600px] xl:overflow-y-auto xl:pr-2'> {/* Added scrollable container */}
                //             <TripItineraryContainer
                //                 onImageChange={setActiveImages}
                //                 safari={individualPackage || {} as Itinerary}
                //                 isLoading={isLoading}
                //                 error={!!error}
                //             />
                //         </div>
                //     </div>
                // )
                return (
                    <div>
                        {individualPackage?.days && individualPackage?.days.length > 0 ? (
                            individualPackage.days.map((day) => (
                                <div className="xl:pl-50 xl:pr-50" key={day.id}>
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full"
                                        defaultValue="item-1"
                                    >
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                Day {day.day_number} : {day.title}
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-2">
                                                {/* related images */}
                                                {/* Details */}
                                                <div className="itinerary-description">
                                                    <p className="text-[12px] xl:text-[13px] text-gray-600">
                                                        {day.details}
                                                    </p>
                                                </div>

                                                {/* Accommodation images */}
                                                <div className="accomodation">
                                                    <h1 className="mb-2 text-sm font-medium">Accommodation</h1>

                                                    {day.images && day.images.length > 0 ? (
                                                        <Carousel opts={{ align: "start" }} className="w-full relative">
                                                            <CarouselContent>
                                                                {day.images.map((image) => (
                                                                    <CarouselItem
                                                                        key={image.id}
                                                                        className="md:basis-1/2 lg:basis-1/3 w-[150px] h-[350px]"
                                                                    >
                                                                        <img
                                                                            src={image.image_url}
                                                                            className="w-full h-full object-cover"
                                                                            alt=""
                                                                        />
                                                                    </CarouselItem>
                                                                ))}
                                                            </CarouselContent>

                                                            {/* Small, side-aligned buttons */}
                                                            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm" />
                                                            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm" />
                                                        </Carousel>
                                                    ) : (
                                                        <p>No images available</p>
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <hr />
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
                                costIncludes={individualPackage?.cost_inclusive ?? []}
                                costExcludes={individualPackage?.cost_exclusive ?? []}
                                safariPackageTitle={individualPackage?.title ?? ''}
                                itineraryId={individualPackage?.id ?? ''}
                            />
                        </div>
                    </div>
                )

            default:
                return (
                    <div className='
                    xl:grid xl:grid-cols-2 xl:gap-6 mb-10
                    '>
                        <div className='left w-full'>
                            <ImageShowcase images={individualPackage?.images ?? []} />
                        </div>
                        <div className='right w-full'>
                            <SafariDetails
                                tags={individualPackage?.tags ?? ''}
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
                {/* Tabs */}
                <div className="flex space-x-8 border-b mb-6 mt-4 xl:mt-0">
                    {['Trip Overview', 'Trip Itinerary', 'Trip Cost Summary'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-2 text-[10px] xl:text-[12px] cursor-pointer uppercase border-b-2 ${activeTab === tab ? 'border-[#FD6D0D] text-[#FD6D0D] xl:font-semibold' : 'border-transparent text-gray-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            <div className="tab-content pl-4 pr-8">
                {/* Tab Content */}
                {renderContentAccordingToTAb()}
            </div>
        </div>
    )
}

export default Individual