import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, Twitter, LinkedIn } from '../../../public/svgs/svgs-file'

function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className='bg-black xl:brightness-70 text-gray-300 text-[14px] w-full'>
            <div className='px-4 py-12 sm:px-6 lg:px-8 xl:px-20'>
                {/* Main Footer Content */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12'>
                    {/* Company Info */}
                    <div className='md:col-span-2 xl:col-span-1'>
                        <div className='mb-6'>
                            <h1 className='text-[#FD6D0D] text-2xl lg:text-3xl xl:text-[32px] font-black leading-tight'>
                                CAMPTREK SAFARIS
                            </h1>
                            <h2 className='text-lg lg:text-xl mt-2'>AFRICA IS A FEELING</h2>
                        </div>
                        <div className='flex flex-row gap-4 items-center'>
                            <Link href={'#'} className='hover:text-[#ED1C24] transition-colors duration-200'>
                                {Facebook}
                            </Link>
                            <Link href={'#'} className='hover:text-[#ED1C24] transition-colors duration-200'>
                                {Instagram}
                            </Link>
                            <Link href={'#'} className='hover:text-[#ED1C24] transition-colors duration-200'>
                                {Twitter}
                            </Link>
                            <Link href={'#'} className='hover:text-[#ED1C24] transition-colors duration-200'>
                                {LinkedIn}
                            </Link>
                        </div>
                    </div>

                    {/* Destinations */}
                    <div className='flex flex-col'>
                        <h3 className='text-[#FD6D0D] mb-4 font-semibold text-base'>Destinations</h3>
                        <div className='space-y-2'>
                            <Link href={'#'} className='block hover:text-white transition-colors duration-200'>
                                Combined Kenyan and Tanzanian Safaris
                            </Link>
                            <Link href={'#'} className='block hover:text-white transition-colors duration-200'>
                                Kenyan Safaris
                            </Link>
                            <Link href={'#'} className='block hover:text-white transition-colors duration-200'>
                                Tanzanian Safaris
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='flex flex-col'>
                        <h3 className='text-[#FD6D0D] mb-4 font-semibold text-base'>Quick Links</h3>
                        <div className='space-y-2'>
                            <Link href={'#'} className='block hover:text-white transition-colors duration-200'>
                                Home
                            </Link>
                            <Link href={'#'} className='block hover:text-white transition-colors duration-200'>
                                Reviews
                            </Link>
                            <Link href={'#'} className='block hover:text-white transition-colors duration-200'>
                                About Us
                            </Link>
                            <Link href={'#'} className='block hover:text-white transition-colors duration-200'>
                                Blog
                            </Link>
                            <Link href={'#'} className='block hover:text-white transition-colors duration-200'>
                                Account
                            </Link>
                        </div>
                    </div>

                    {/* Contact Us */}
                    <div className='flex flex-col'>
                        <h3 className='text-[#FD6D0D] mb-4 font-semibold text-base'>Contact Us</h3>
                        <div className='space-y-2'>
                            <Link href={'tel:+254720938799'} className='block hover:text-white transition-colors duration-200'>
                                (+254)-720-938-799
                            </Link>
                            <Link href={'mailto:info@camptreksafaris.com'} className='block hover:text-white transition-colors duration-200'>
                                info@camptreksafaris.com
                            </Link>
                            <Link href={'mailto:camptreksafaris@gmail.com'} className='block hover:text-white transition-colors duration-200'>
                                camptreksafaris@gmail.com
                            </Link>
                            <address className='not-italic hover:text-white transition-colors duration-200'>
                                Ring Road-Westlands,<br />
                                Nairobi, Kenya
                            </address>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className='border-gray-800 mb-8' />

                {/* Bottom Footer */}
                <div className='flex flex-col xl:flex-row xl:justify-between xl:items-center space-y-6 xl:space-y-0'>
                    {/* Legal Links */}
                    <div className='flex flex-wrap justify-center xl:justify-start items-center gap-x-4 gap-y-2 text-sm'>
                        <Link href={'#'} className='hover:text-white transition-colors duration-200'>
                            Terms & Conditions
                        </Link>
                        <span className='text-gray-600'>|</span>
                        <Link href={'#'} className='hover:text-white transition-colors duration-200'>
                            Privacy Policy
                        </Link>
                        <span className='text-gray-600'>|</span>
                        <Link href={'#'} className='hover:text-white transition-colors duration-200'>
                            Privacy Commitment
                        </Link>
                        <span className='text-gray-600'>|</span>
                        <Link href={'#'} className='hover:text-white transition-colors duration-200'>
                            Modern Slavery Act Statement
                        </Link>
                        <span className='text-gray-600'>|</span>
                        <Link href={'#'} className='hover:text-white transition-colors duration-200'>
                            Do Not Sell My Personal Info
                        </Link>
                    </div>

                    {/* Copyright */}
                    <div className='text-center xl:text-right text-sm'>
                        <p>Copyright © {year} Camptrek Safaris LTD. All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer