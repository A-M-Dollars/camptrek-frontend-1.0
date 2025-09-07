import LandingNavbar from '@/components/global/bars/landing-navbar/navbar';
import Footer from '@/components/global/footer/footer';
import { Metadata } from 'next';
import React from 'react'


type LayoutProps = {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Camptrek Safaris - Landing',
}

const layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <LandingNavbar/>
            {children}
            <Footer/>
        </div>
    )
}

export default layout