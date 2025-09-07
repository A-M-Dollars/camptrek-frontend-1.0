import Navbar from "@/components/global/bars/other-pages-navbar/navbar";
import Footer from "@/components/global/footer/footer";
import { Metadata } from "next";

type SafarisLayoutProps = {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Camptrek Safaris - All Safaris',
    description: 'Explore our range of safaris at Camptrek'
}

const safarisLayout = ({children}: SafarisLayoutProps) => {
    return(
        <div>
            <Navbar />
            <div>
                {children}
            </div>
            <Footer/>
        </div>
    )
}
export default safarisLayout;
