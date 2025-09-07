import { Itinerary } from '@/constants/itinerary'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';


type ImageShowCaseProp = {
    isLoading?: boolean;
    error?: boolean;
    images: Itinerary['images'];
}

const ImageShowcase = ({ images, isLoading, error }: ImageShowCaseProp) => {

    const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Set first image once images load
    useEffect(() => {
        if (images.length > 0 && !selectedImage) {
            setSelectedImage(images[0]);
        }
    }, [images, selectedImage]);

    useEffect(() => {
        if (selectedImage && images.length > 0) {
            const currentIndex = images.findIndex(img => img.id === selectedImage.id);

            const resetInterval = () => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                intervalRef.current = setInterval(() => {
                    const nextIndex = (currentIndex + 1) % images.length;
                    setSelectedImage(images[nextIndex]);
                }, 5000);
            };

            resetInterval();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [selectedImage, images]);

    // Loading states
    // You can pass a loading state as a prop like this:
    // const ImageShowcase = ({ images, isLoading }: Itinerary & { isLoading?: boolean }) => {
    // Then use isLoading below as needed.
    if (isLoading) {
        return <div className="w-full h-[515px] bg-gray-200 animate-pulse rounded"></div>;
    }
    if (error) {
        return <div className="w-full h-[515px] bg-gray-100 flex items-center justify-center text-gray-500">Error loading images</div>;
    }

    if (images.length === 0) {
        return <div className="w-full h-[515px] bg-gray-100 flex items-center justify-center text-gray-500">No images available</div>;
    }

    if (!selectedImage) {
        return <div className="w-full h-[515px] bg-gray-200 animate-pulse rounded"></div>;
    }

    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const visibleThumbnails = Math.floor(700 / (96 + 12));
    const startIndex = Math.max(0, Math.min(currentIndex - Math.floor(visibleThumbnails / 2), images.length - visibleThumbnails));

    const handleImageSelect = (image: typeof images[0]) => {
        setSelectedImage(image);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    return (
        <div>
            {/* Main Image */}
            <div className="
            relative w-full h-[250px] md:h-[515px] xl:h-[515px] mb-1 overflow-hidden shadow-lg
            ">
                <Image
                    src={selectedImage.image_url}
                    alt="Gallery Image"
                    fill
                    className="object-cover transition-opacity duration-300"
                    priority
                />
            </div>

            {/* Counter */}
            <div className="flex justify-between items-center mb-1 text-[12px] text-gray-600">
                <span>{currentIndex + 1} of {images.length}</span>
            </div>

            {/* Thumbnails */}
            <div className="relative">
                <div className="overflow-hidden justify-between items-center">
                    <div
                        className="flex gap-3 transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${startIndex * (96 + 12)}px)`
                        }}
                    >
                        {images.map(image => (
                            <button
                                key={image.id}
                                onClick={() => handleImageSelect(image)}
                                className={`relative flex-shrink-0 w-24 h-24 overflow-hidden transition-all duration-200 ${selectedImage.id === image.id
                                    ? 'scale-105 shadow-lg'
                                    : 'hover:border-gray-400 hover:scale-102'
                                    }`}
                            >
                                <Image
                                    src={image.image_url}
                                    alt="Gallery Image Thumbnail"
                                    fill
                                    className="object-cover"
                                />
                                {selectedImage.id === image.id && (
                                    <div className="absolute inset-0 bg-blue-500/20" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-2 gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleImageSelect(images[index])}
                        className={`w-1 h-1 rounded-full transition-all duration-200 ${index === currentIndex
                            ? 'bg-black scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ImageShowcase