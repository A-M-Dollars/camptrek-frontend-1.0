import { ItineraryProp } from '@/constants/itinerary'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import ItineraryGoogleImage from '@/components/individual_safari/trip-itinerary-section/itinerary-google-map';

type ImageShowCaseProp = {
    isLoading?: boolean;
    error?: boolean;
    images: ItineraryProp['images'];
    map?: ItineraryProp['map'];
}

const ImageShowcase = ({ images, map, isLoading, error }: ImageShowCaseProp) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-cycle every 5s
    useEffect(() => {
        if (images.length === 0 && !map) return;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setSelectedIndex((prev) => {
                const total = images.length + (map ? 1 : 0);
                return (prev + 1) % total;
            });
        }, 5000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [images, map]);

    if (isLoading) {
        return <div className="w-full h-[515px] bg-gray-200 animate-pulse rounded"></div>;
    }
    if (error) {
        return <div className="w-full h-[515px] flex items-center justify-center text-gray-500">Error loading images</div>;
    }

    const totalItems = images.length + (map ? 1 : 0);

    return (
        <div>
            {/* Main Image / Map */}
            <div className="relative w-full h-[250px] md:h-[515px] xl:h-[615px] mb-1 overflow-hidden shadow-lg">
                {map && selectedIndex === 0 ? (
                    // Show the map if it's the first slide
                    <Image
                        src={map.image_url}
                        alt="Map"
                        fill
                        className="object-cover transition-opacity duration-300"
                        priority
                    />
                ) : (
                    images[selectedIndex - (map ? 1 : 0)] && (
                        <Image
                            src={images[selectedIndex - (map ? 1 : 0)].image.url}
                            alt="Gallery Image"
                            fill
                            className="object-cover transition-opacity duration-300"
                            priority
                        />
                    )
                )}
            </div>


            {/* Counter */}
            <div className="flex justify-between items-center mb-1 text-[12px] text-gray-600">
                <span>{selectedIndex + 1} of {totalItems}</span>
            </div>

            {/* Thumbnails */}
            <div className="relative overflow-hidden">
                <div
                    className="flex gap-3 transition-transform duration-300 ease-in-out"
                    style={{
                        transform: `translateX(-${Math.max(0, selectedIndex - 2) * (96 + 12)}px)`
                    }}
                >
                    {/* Map Thumbnail */}
                    {map && (
                        <button
                            onClick={() => setSelectedIndex(images.length)}
                            className={`relative flex-shrink-0 w-24 h-24 overflow-hidden flex items-center justify-center border transition-all duration-200 ${selectedIndex === images.length
                                ? 'scale-105 shadow-lg border-blue-500'
                                : 'hover:border-gray-400 hover:scale-102'
                                }`}
                        >
                            <Image
                                src={map.image_url}
                                alt="Gallery Thumbnail"
                                fill
                                className="object-cover"
                            />

                        </button>
                    )}

                    {/* other images */}

                    {images.map((img, idx) => (
                        <button
                            key={img.image.public_id}
                            onClick={() => setSelectedIndex(idx)}
                            className={`relative flex-shrink-0 w-24 h-24 overflow-hidden transition-all duration-200 ${selectedIndex === idx
                                ? 'scale-105 shadow-lg'
                                : 'hover:border-gray-400 hover:scale-102'
                                }`}
                        >
                            <Image
                                src={img.image.url}
                                alt="Gallery Thumbnail"
                                fill
                                className="object-cover"
                            />
                            {selectedIndex === idx && (
                                <div className="absolute inset-0 bg-blue-500/20" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-2 gap-2">
                {Array.from({ length: totalItems }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedIndex(idx)}
                        className={`w-1 h-1 rounded-full transition-all duration-200 ${idx === selectedIndex
                            ? 'bg-black scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageShowcase;
