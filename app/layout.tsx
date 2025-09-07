import type { Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

export const metadata: Metadata = {
  title: "Camptrek Safaris",
  description: "Explore the wild with Camptrek Safaris",
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
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
