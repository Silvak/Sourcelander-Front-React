import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutContent from "./LayoutContent";
import { Providers } from "./providers";
import { Toaster } from "sonner";

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
  return (
    <html lang="en">
      <body
        className={`relative bg-[#fbfbfc] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LayoutContent>{children}</LayoutContent>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
