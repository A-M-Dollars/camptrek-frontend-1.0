'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../../../../public/logo/logocamp.png'
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState, useRef } from "react"
import Loginbutton from '../loginbutton'

function Navbar() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScroll = useRef(0)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScroll.current ? "down" : "up"

    if (direction === "down" && latest > 50) {
      setVisible(false)
    } else if (direction === "up") {
      setVisible(true)
    }

    lastScroll.current = latest
  })

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className='bg-black fixed top-0 left-0 w-full z-50 text-white shadow-lg xl:place-items-center'
        initial={{ y: 0 }}
        animate={{
          y: visible ? 0 : -100,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          delay: visible ? 0.1 : 0,
        }}
      >
        {/* Mobile Header - Only visible on small and medium devices */}
        <div className='lg:hidden grid grid-cols-2 items-center px-4 sm:px-6 h-16 sm:h-18'>
          {/* Mobile Logo */}
          <div className='flex-shrink-0 justify-self-start'>
            <Link href={'/'}>
              <Image
                src={logo}
                alt="CAMPTREK LOGO"
                height={200}
                width={350}
                className="h-8 sm:h-10 md:h-12 w-auto"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className='flex flex-col justify-center items-center w-8 h-8 space-y-1.5 ml-[80%]'
            aria-label="Toggle mobile menu"
          >
            <motion.span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
            />
            <motion.span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''
                }`}
            />
            <motion.span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
            />
          </button>
        </div>

        {/* Desktop Header - Only visible on large devices and above */}
        <div className='hidden lg:flex lg:gap-50 items-center px-8 xl:px-20 h-20 xl:h-24'>
          {/* Desktop Logo */}
          <div className='flex-shrink-0 xl:mr-20'>
            <Link href={'/'}>
              <Image
                src={logo}
                alt='Camptrek Logo'
                height={50}
                width={200}
                className='h-10 w-auto lg:h-12 xl:h-[50px] xl:w-[100px]'
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='flex gap-12 items-center font-light'>
            <Link
              href={'/safaris'}
              className='hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base'
            >
              SAFARIS
            </Link>
            <Link
              href={'/blogs'}
              className='hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base'
            >
              TRAVEL GUIDE
            </Link>
            <Link
              href={'/about-us'}
              className='hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base'
            >
              ABOUT US
            </Link>
            <Link
              href={'/contacts-us'}
              className='hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base'
            >
              CONTACTS
            </Link>

            <div className='flex-shrink-0'>
              <Loginbutton />
            </div>

          </div>

          {/* Desktop Login Button */}

        </div>

        {/* Mobile Menu - Only visible on small and medium devices */}
        <motion.div
          className={`lg:hidden bg-primary border-t border-gray-700 ${mobileMenuOpen ? 'block' : 'hidden'
            }`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className='px-4 py-4 space-y-4'>
            <Link
              href={'/safaris'}
              className='block py-2 hover:text-gray-300 transition-colors duration-200 text-base font-light'
              onClick={closeMobileMenu}
            >
              SAFARIS
            </Link>
            <Link
              href={'/accommodation'}
              className='block py-2 hover:text-gray-300 transition-colors duration-200 text-base font-light'
              onClick={closeMobileMenu}
            >
              ACCOMMODATION
            </Link>
            <Link
              href={'/blogs'}
              className='block py-2 hover:text-gray-300 transition-colors duration-200 text-base font-light'
              onClick={closeMobileMenu}
            >
              TRAVEL GUIDE
            </Link>
            <Link
              href={'/about-us'}
              className='block py-2 hover:text-gray-300 transition-colors duration-200 text-base font-light'
              onClick={closeMobileMenu}
            >
              ABOUT US
            </Link>
            <Link
              href={'/contacts-us'}
              className='block py-2 hover:text-gray-300 transition-colors duration-200 text-base font-light'
              onClick={closeMobileMenu}
            >
              CONTACTS
            </Link>
            {/* Mobile Login Button */}
            <div className='pt-4 border-t border-gray-700 ml-[-35%]'>
              <Loginbutton />
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 sm:h-18 lg:h-20 xl:h-24"></div>
    </>
  )
}

export default Navbar