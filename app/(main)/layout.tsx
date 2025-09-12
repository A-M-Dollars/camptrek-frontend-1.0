import Navbar from "@/components/global/bars/landing-navbar/navbar";
import Footer from "@/components/global/footer/footer";
import { Metadata } from "next";

type SafarisLayoutProps = {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Camptrek Safaris - All Safaris',
    // description: `Discover the beauty of Africa with our unforgettable safari experiences. From thrilling game drives across the savannah to serene nature walks and luxury lodge stays, we connect you to the heart of the wild. Our tailored safari packages offer close encounters with the Big Five, breathtaking landscapes, and authentic cultural experiences. Whether you’re seeking adventure, relaxation, or a family-friendly journey, we make your dream safari a reality.`,
}

const safarisLayout = ({ children }: SafarisLayoutProps) => {
    return (
        <div>
            <Navbar />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}
export default safarisLayout;
