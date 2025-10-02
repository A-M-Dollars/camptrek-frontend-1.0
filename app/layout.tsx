import type { Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

export const metadata: Metadata = {
  title: "Camptrek Safaris",
  description: `Discover the beauty of Africa with our unforgettable safari experiences. From thrilling game drives across the savannah to serene nature walks and luxury lodge stays, we connect you to the heart of the wild. Our tailored safari packages offer close encounters with the Big Five, breathtaking landscapes, and authentic cultural experiences. Whether you’re seeking adventure, relaxation, or a family-friendly journey, we make your dream safari a reality.`,
  openGraph: {
    title: "Camptrek Safaris",
    description: `Discover the beauty of Africa with our unforgettable safari experiences. From thrilling game drives across the savannah to serene nature walks and luxury lodge stays, we connect you to the heart of the wild. Our tailored safari packages offer close encounters with the Big Five, breathtaking landscapes, and authentic cultural experiences. Whether you’re seeking adventure, relaxation, or a family-friendly journey, we make your dream safari a reality.`,
    url: "https://www.camptreksafaris.com/",
    siteName: "Camptrek Safaris",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Camptrek Safaris",
    description: `Discover the beauty of Africa with our unforgettable safari experiences. From thrilling game drives across the savannah to serene nature walks and luxury lodge stays, we connect you to the heart of the wild. Our tailored safari packages offer close encounters with the Big Five, breathtaking landscapes, and authentic cultural experiences. Whether you’re seeking adventure, relaxation, or a family-friendly journey, we make your dream safari a reality.`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={googleClientId}>
        <body
          className={inter.className}
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster position="top-center" />
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
