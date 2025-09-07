'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import CamptrekLogo from '../../../../public/logo/logocamp.png'
import { personIcon } from '@/public/svgs/svgs-file'
import Loginbutton from '../loginbutton'
import LoginButton2 from './loginbutton'


function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Navigation links with their corresponding paths
  const navLinks = [
    { href: '/safaris', label: 'SAFARIS' },
    { href: '/blogs', label: 'TRAVEL GUIDES' },
    { href: '/about-us', label: 'ABOUT US' },
    { href: '/contacts-us', label: 'CONTACTS' }
  ]

  const isActive = (href: string) => pathname === href

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className=''>
        {/* Mobile Header - Only visible on small and medium devices */}
        <div className='lg:hidden grid grid-cols-2 items-center px-4 sm:px-6 py-4'>
          {/* Mobile Logo */}
          <div className='flex-shrink-0 justify-self-start'>
            <Link href={'/'}>
              <Image
                src={CamptrekLogo}
                alt='Camptrek Logo'
                height={40}
                width={160}
                className='grayscale h-6 w-auto sm:h-8 md:h-10'
              />
            </Link>
          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className='flex flex-col justify-center items-center w-8 h-8 space-y-1.5 text-gray-800 justify-self-end'
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''
                }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
            />
          </button>
        </div>

        {/* Desktop Header - Only visible on large devices and above */}
        <div className='hidden lg:flex lg:gap-50  justify-center px-2 xl:pl-8 xl:pr-18 py-2'>
          {/* Desktop Logo */}
          <div className='flex-shrink-0'>
            <Link href={'/'}>
              <Image
                src={CamptrekLogo}
                alt='Camptrek Logo'
                height={50}
                width={100}
                className='grayscale h-10 w-auto lg:h-12 xl:h-[50px] xl:w-[100px]'
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='flex font-light text-[12px] gap-8 items-center'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mr-20 relative transition-all duration-300 hover:text-gray-600 ${isActive(link.href)
                    ? 'text-black'
                    : 'text-gray-800'
                  }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-black transition-all duration-300"></span>
                )}
              </Link>
            ))}

            {/* Desktop Login Button */}
            <div>
              <LoginButton2 />
            </div>
          </div>


        </div>

        {/* Mobile/Tablet Menu - Only visible on small and medium devices */}
        <div className={`lg:hidden bg-white border-t border-gray-200 ${mobileMenuOpen ? 'block' : 'hidden'
          }`}>
          <div className='px-4 sm:px-6 py-4 space-y-4 '>
            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 relative transition-all duration-300 hover:text-gray-600 text-sm font-light ${isActive(link.href)
                    ? 'text-black font-medium'
                    : 'text-gray-800'
                  }`}
                onClick={closeMobileMenu}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-[8px] left-0 h-[2px] bg-black transition-all duration-300"></span>
                )}
              </Link>
            ))}

            {/* Mobile Login Section */}
            <div className='pt-4 border-t border-gray-200'>
              <div className='flex ml-[-8%] mb-[5%]'>
                <Loginbutton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar