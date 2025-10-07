'use client'

import React from 'react'
import Image from 'next/image';
import { baseInstance } from '@/constants/apis';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { BlogCardSkeleton, GridSkeletonLoader, FloatingCardsLoader, CompassLoader, PlaneLoader, } from '@/components/about-us/travel-guides/loaders/loaders'



type BlogsPagesResults = {
  title: string,
  content: string,
  image_url: string,
  author_name: string,
  created_at: string
}

const IndividualBlogs = () => {
  const params = useParams()
  const id = params.id

  const handleFetch = async (id: string) => {
    const response = await baseInstance.get(`/blogs/${id}`)
    return response.data
  }

  const { data: individualBlog, isLoading, error } = useQuery({
    queryKey: ['individualBlog', params],
    queryFn: () => handleFetch(id as string),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 35,
  })


  if (isLoading) {
    return <FloatingCardsLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Something went wrong</h3>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#ED1C24] text-white uppercase text-[12px] w-[200px]"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!individualBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.469.892-6.04 2.355-.717-.751-1.15-1.744-1.15-2.855 0-3.314 2.686-6 6-6s6 2.686 6 6c0 1.111-.433 2.104-1.15 2.855z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Article Not Found</h3>
          <p className="text-gray-600 mb-4">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='overflow-x-hidden'>
      <article className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4 leading-tight">{individualBlog.title}</h1>

        <div className='flex gap-4 items-center mb-6'>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              {individualBlog.author?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className='text-[14px] text-gray-800 '>{individualBlog.author}
              <span className='ml-2'>
                |
              </span>
              <span className='ml-2 text-gray-600 font-light' >
                Camptrek Safaris
              </span>
            </h2>
            <p className='opacity-70 text-[12px] text-gray-600 font-light'>
              Posted {new Date(individualBlog.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="w-full h-96 mb-6 overflow-hidden shadow-lg">
          <img
            className='object-cover object-center w-full h-full hover:scale-105 transition-transform duration-300'
            src={individualBlog.image_url}
            alt='Article cover image'
          />
        </div>

        <div className="prose max-w-none">
          <div className='py-4'>
            <div className='text-gray-700 font-light leading-relaxed whitespace-pre-line text-[16px] line-height-7'>
              {individualBlog.content}
            </div>
          </div>
        </div>


        {
          individualBlog?.sections && individualBlog.sections.length > 0 ?
            individualBlog.sections.map((section: any, idx: number) => (
              <div key={idx} className="my-6">
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                <div className='w-full h-[500px] mt-2 mb-2'>
                  <img
                    className='object-cover mb-6 object-center w-full h-full hover:scale-105 transition-transform duration-300'
                  src={section.image_url}
                  alt='Article cover image'
                />
                </div>
                <p className="text-gray-700 font-light leading-relaxed whitespace-pre-line text-[16px] line-height-7">{section.content}</p>

              </div>
            )) : null
        }
      </article>
    </div>
  )
}

export default IndividualBlogs