// Blog Card Skeleton Loader
export const BlogCardSkeleton = () => {
    return (
        <div className="max-w-[350px] flex flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900" style={{ borderRadius: '4px' }}>
            {/* Image Skeleton */}
            <div className="h-48 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
            
            {/* Content Skeleton */}
            <div className="p-2 space-y-2">
                {/* Title Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse w-3/4"></div>
                </div>
                
                {/* Author and Date Skeleton */}
                <div className="pt-2 flex justify-between">
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse w-20"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse w-24"></div>
                </div>
            </div>
        </div>
    );
};

// Grid Skeleton Loader (matches your layout)
export const GridSkeletonLoader = () => {
    return (
        <div className="p-8 overflow-x-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <div key={idx} className="flex justify-center">
                        <BlogCardSkeleton />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Floating Cards Loader
export const FloatingCardsLoader = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center space-y-8">
                {/* Floating Cards Animation */}
                <div className="relative w-64 h-40">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-48 h-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 animate-bounce`}
                            style={{
                                left: `${i * 8}px`,
                                top: `${i * 8}px`,
                                zIndex: 3 - i,
                                animationDelay: `${i * 0.2}s`,
                                animationDuration: '2s'
                            }}
                        >
                            <div className="p-4">
                                <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Loading Travel Guide(s)</h3>
                    <p className="text-gray-600 dark:text-gray-400">Discovering amazing destinations for you...</p>
                </div>
                
                {/* Progress Dots */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-[#ED1C24] rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-[#ED1C24] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-[#ED1C24] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
            </div>
        </div>
    );
};

// Compass Loader
export const CompassLoader = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center space-y-6">
                {/* Compass Animation */}
                <div className="relative w-20 h-20">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                    
                    {/* Rotating Compass Needle */}
                    <div className="absolute inset-2 border-4 border-transparent border-t-[#ED1C24] border-[#ED1C24] rounded-full animate-spin" style={{animationDuration: '2s'}}></div>
                    
                    {/* Center Dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
                    
                    {/* Cardinal Directions */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-600 dark:text-gray-400">N</div>
                    <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 text-xs font-bold text-gray-600 dark:text-gray-400">E</div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-600 dark:text-gray-400">S</div>
                    <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 text-xs font-bold text-gray-600 dark:text-gray-400">W</div>
                </div>
                
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Finding it...</h3>
                    <div className="flex items-center space-x-1">
                        <span className="text-gray-600 dark:text-gray-400">Give Camptrek a minute </span>
                        <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-[#ED1C24] rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 bg-[#ED1C24] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-1 h-1 bg-[#ED1C24] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Plane Flying Loader
export const PlaneLoader = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600">
            <div className="flex flex-col items-center space-y-8 text-white">
                {/* Flying Plane */}
                <div className="relative w-64 h-32 overflow-hidden">
                    <div className="absolute w-full h-0.5 bg-white/30 top-1/2 transform -translate-y-1/2"></div>
                    <div className="animate-pulse absolute top-1/2 transform -translate-y-1/2" style={{
                        animation: 'fly 3s infinite linear'
                    }}>
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </div>
                </div>
                
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Taking Off...</h3>
                    <p className="text-blue-100">Preparing </p>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes fly {
                    0% { left: -32px; }
                    100% { left: 100%; }
                }
            `}</style>
        </div>
    );
};