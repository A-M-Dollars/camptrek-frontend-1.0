'use client'

import Herosection from '@/components/about-us/hero-section/hero-section'
import React from 'react'
import Mottosection from '@/components/about-us/motto-section/motto-section'
import Ourstory from '@/components/about-us/our-story/our-story'
import Ourpackages from '@/components/about-us/our-packages/our-packages'
import Travelguides from '@/components/about-us/travel-guides/travel-guides'
import { baseInstance } from '@/constants/apis'
import { useQuery } from '@tanstack/react-query'

function AboutCamptrek() {

  const handleFetch = async () => {
    const response = await baseInstance.get('/blogs/')
    return response.data
  }

  const { data: allBlogs } = useQuery({
    queryKey: ['allBlogs'],
    queryFn: handleFetch,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 35,
  })



  return (
    <div className='overflow-x-hidden'>
      <Herosection />
      <Mottosection />
      <Ourstory />
      <Ourpackages />
      {allBlogs && allBlogs.length > 0 ?
        allBlogs.map((blog: any) => (
          <Travelguides key={blog.id} blog_id={blog.id} blog_date={blog.created_at} blog_title={blog.title} />
        ))
        : null
      }

    </div>
  )
}

export default AboutCamptrek