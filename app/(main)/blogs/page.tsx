// 'use client'

// import React from 'react'
// import { Tilt } from '@/components/motion-primitives/tilt';
// import Link from 'next/link';
// import { baseInstance } from '@/constants/apis';
// import { useParams } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
// import { BlogCardSkeleton, GridSkeletonLoader, FloatingCardsLoader, CompassLoader, PlaneLoader, } from '@/components/about-us/travel-guides/loaders/loaders'


// const TravelGuides = () => {
//     const params = useParams()

//     const handleFetch = async () => {

//         const delay_Ms = 3500

//         if (delay_Ms > 0) {
//             await new Promise(resolve => setTimeout(resolve, delay_Ms))
//         }

//         const response = await baseInstance.get('/blogs/', { params })
//         // console.log(response.data)
//         return response.data
//     }

//     const { data: allBlogs, isLoading, error, isSuccess } = useQuery({
//         queryKey: ['allBlogs', params],
//         queryFn: handleFetch,
//         staleTime: 1000 * 60 * 30,
//         gcTime: 1000 * 60 * 35,
//     })

//     console.log(allBlogs)

//     if (isLoading) {
//         return <CompassLoader />;
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen flex items-center justify-center p-8">
//                 <div className="text-center max-w-md mx-auto">
//                     <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
//                         <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                         </svg>
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Oops! Something went wrong</h3>
//                     <p className="text-gray-600 dark:text-gray-400 mb-6">
//                         We couldn't load the travel guides. {error.message}
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                         <button
//                             onClick={() => window.location.reload()}
//                             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                         >
//                             Try Again
//                         </button>
//                         <button
//                             onClick={() => window.history.back()}
//                             className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
//                         >
//                             Go Back
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     if (isSuccess && (!allBlogs || allBlogs.length === 0)) {
//         return (
//             <div className="min-h-screen flex items-center justify-center p-8">
//                 <div className="text-center max-w-md mx-auto">
//                     <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
//                         <svg className="w-10 h-10 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                         </svg>
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">No Travel Guides Found</h3>
//                     <p className="text-gray-600 dark:text-gray-400 mb-6">
//                         It looks like there aren't any travel guides available right now. Check back soon for new adventures!
//                     </p>
//                     <button
//                         onClick={() => window.location.reload()}
//                         className="px-6 py-3 bg-[#FD6D0D] text-white text-[12px] uppercase cursor-pointer w-[200px]"
//                     >
//                         Refresh Page
//                     </button>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className='p-8 overflow-x-hidden'>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {allBlogs.map((blog: any, idx: any) => (
//                     <div key={blog.id || idx} className="flex justify-center">
//                         <Tilt rotationFactor={2} isRevese>
//                             <div
//                                 style={{
//                                     borderRadius: '4px',
//                                 }}
//                                 className='flex max-w-[350px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 hover:shadow-lg transition-shadow duration-300'
//                             >
//                                 <img
//                                     src={blog.image_url}
//                                     alt={blog.title || 'Travel guide image'}
//                                     className='h-48 w-full object-cover hover:scale-105 transition-transform duration-300'
//                                     onError={(e) => {
//                                         const target = e.target as HTMLImageElement;
//                                         target.src = '/placeholder-travel.jpg'; // Add fallback
//                                     }}
//                                 />
//                                 <div className='p-4'>
//                                     <Link href={`/blogs/${blog.id}`} className="block group">
//                                         <h1 className='font-mono leading-snug text-zinc-950 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 mb-3'>
//                                             {blog.title}
//                                         </h1>
//                                     </Link>
//                                     <div className='flex justify-between items-center'>
//                                         <p className='text-zinc-700 dark:text-zinc-400 text-[12px] font-medium'>
//                                             {blog.author_name}
//                                         </p>
//                                         <p className='text-zinc-700 dark:text-zinc-400 text-[12px]'>
//                                             {new Date(blog.created_at).toLocaleDateString()}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Tilt>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default TravelGuides

'use client'

import React, { useState } from 'react'
import { Tilt } from '@/components/motion-primitives/tilt';
import Link from 'next/link';
import { baseInstance } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { CompassLoader } from '@/components/about-us/travel-guides/loaders/loaders'

const TravelGuides = () => {
    // keep track of page from backend
    const [page, setPage] = useState(1)
    const pageSize = 10 // or inherit from backend default

    const handleFetch = async () => {
        const response = await baseInstance.get('/blogs/', {
            params: { page, page_size: pageSize },
        })
        return response.data
    }

    const { data: allBlogs, isLoading, error, isSuccess } = useQuery({
        queryKey: ['allBlogs', page],
        queryFn: handleFetch,
        staleTime: 1000 * 60 * 5,
    })

    if (isLoading) return <CompassLoader />

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <p className="text-red-600">Error: {(error as any).message}</p>
            </div>
        )
    }

    if (isSuccess && (!allBlogs?.blogs  || allBlogs.blogs.length === 0)) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">No Travel Guides Found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        It looks like there aren't any travel guides available right now. Check back soon for new adventures!
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-[#FD6D0D] text-white text-[12px] uppercase cursor-pointer w-[200px]"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        )
    }


    return (
        <div className="p-8 overflow-x-hidden">
            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allBlogs.blogs.map((blog: any, idx: number) => (
                    <div key={blog.id || idx} className="flex justify-center">
                        <Tilt rotationFactor={2} isRevese>
                            <div className="flex max-w-[350px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 hover:shadow-lg transition-shadow duration-300 rounded">
                                <img
                                    src={blog.image_url}
                                    alt={blog.title || 'Travel guide image'}
                                    className="h-48 w-full object-cover hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.src = '/placeholder-travel.jpg'
                                    }}
                                />
                                <div className="p-4">
                                    <Link href={`/blogs/${blog.id}`} className="block group">
                                        <h1 className="font-mono leading-snug text-zinc-950 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 mb-3">
                                            {blog.title}
                                        </h1>
                                    </Link>
                                    <div className="flex justify-between items-center">
                                        <p className="text-zinc-700 dark:text-zinc-400 text-[12px] font-medium">
                                            {blog.author_name}
                                        </p>
                                        <p className="text-zinc-700 dark:text-zinc-400 text-[12px]">
                                            {new Date(blog.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Tilt>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-8">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                >
                    Previous
                </button>

                <span className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    Page {allBlogs.current_page} of {allBlogs.pages}
                </span>

                <button
                    disabled={page === allBlogs.pages}
                    onClick={() => setPage((prev) => Math.min(prev + 1, allBlogs.pages))}
                    className={`px-4 py-2 rounded-lg ${page === allBlogs.pages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default TravelGuides
