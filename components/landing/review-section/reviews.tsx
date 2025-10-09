import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Pause } from 'lucide-react';



function StaggeredCarousel() {
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);

    // Sample images with different aspect ratios
    const images = [
        { url: '/camptrek reviews/cs0.png', ratio: 16 / 9 },
        { url: '/camptrek reviews/cs1.png', ratio: 4 / 3 },
        { url: '/camptrek reviews/cs2.png', ratio: 16 / 9 },
        { url: '/camptrek reviews/cs3.png', ratio: 3 / 4 },
        { url: '/camptrek reviews/cs4.png', ratio: 16 / 9 },
        { url: '/camptrek reviews/cs5.png', ratio: 4 / 3 },
        { url: '/camptrek reviews/cs6.png', ratio: 16 / 10 },
        { url: '/camptrek reviews/cs7.png', ratio: 3 / 4 },
    ];

    // Duplicate images for seamless loop
    const duplicatedImages = [...images, ...images, ...images];

    // Auto-scroll effect
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setScrollPosition(prev => {
                const newPos = prev + 0.5;
                // Reset when we've scrolled through one set
                if (newPos >= images.length * 320) {
                    return 0;
                }
                return newPos;
            });
        }, 20);

        return () => clearInterval(interval);
    }, [isPaused, images.length]);

    // Fixed uniform height for all cards
    const cardHeight = 600;

    const handleMouseEnter = (index: number) => {
        setIsPaused(true);
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        setHoveredIndex(null);
    };

    return (
        <div className="w-full p-10 bg-[black] flex items-center justify-center overflow-hidden">
            <div className="w-full px-8">
                <h1 className="font-semibold text-[30px] text-[#FD6D0D] xl:text-[32px] uppercase">
                    What Clients Says About Camptrek Safaris
                </h1>

                <div className="relative">
                    {/* Status indicator */}
                    <div className="absolute top-4 right-4 z-20 bg-[black]/50 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                        {isPaused && (
                            <>
                                <Pause className="w-4 h-4 text-[#FD6D0D]" />
                                <span className="text-white text-sm">Paused</span>
                            </>
                        )}
                    </div>

                    {/* Carousel container */}
                    <div
                        ref={containerRef}
                        className="h-[600px] overflow-hidden rounded-sm p-12"
                    >
                        {/* Cards track */}
                        <div
                            className="absolute flex gap-6 items-end"
                            style={{
                                transform: `translateX(-${scrollPosition}px)`,
                                transition: isPaused ? 'transform 0.3s ease-out' : 'none'
                            }}
                        >
                            {duplicatedImages.map((img, index) => {
                                const cardHeight = 300;
                                const isHovered = hoveredIndex === index;

                                return (
                                    <div
                                        key={index}
                                        className="relative flex-shrink-0 cursor-pointer transition-all duration-200"
                                        style={{
                                            width: '300px',
                                            height: `${cardHeight}px`,
                                            transform: isHovered ? 'scale(1.4) translateY(-20px)' : 'scale(1)',
                                            zIndex: isHovered ? 50 : 1,
                                        }}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="w-full h-full rounded-sm overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-800">
                                            <img
                                                src={img.url}
                                                alt={`Slide ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Overlay on hover */}
                                            {isHovered && (
                                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                                                    <img
                                                        src={img.url}
                                                        alt={`Slide ${index + 1}`}
                                                        className="w-full h-full object-fit"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Reviews = () => {
    return (
        <div className='overflow-x-hidden h-screen'
        >
            <StaggeredCarousel />
        </div>
    )
}

export default Reviews