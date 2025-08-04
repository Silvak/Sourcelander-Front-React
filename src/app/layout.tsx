"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <body
        className={`bg-[#fbfbfc] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {!isAuthRoute && <Navbar />}
          <main
            className={
              isAuthRoute ? "min-h-screen" : "min-h-[calc(100vh-75px)]"
            }
          >
            {children}
          </main>
          {!isAuthRoute && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
