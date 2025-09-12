'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

function Custom404() {
    const router = useRouter()

    return (
        <div className="overflow-hidden flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
            <h1 className="text-[180px] md:text-[350px] font-bold text-[#FD6D0D] mb-2">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
                Oops! The page you’re looking for doesn’t exist or has been moved.
            </p>
            {/* <a
                href="/"
                className="px-8 py-3 bg-primary text-white font-light text-[14px] uppercase"
            >
                Go Back Home
            </a> */}

            <Link href="/safaris">
                <button
                    // onClick={() => router.back()}
                    className="px-8 py-3 bg-[#FD6D0D] text-white font-light text-[14px] uppercase"
                >
                    Checkout our safaris
                </button>
            </Link>

        </div>
    )
}

export default Custom404