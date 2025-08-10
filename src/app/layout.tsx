import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import LayoutContent from "./LayoutContent";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sourcelander",
  description: "Find the best talent for your projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <LayoutContent>{children}</LayoutContent>
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            duration={4000}
            toastOptions={{
              style: {
                background: "#ffffff",
                color: "#374151",
                border: "1px solid #e5e7eb",
                borderRadius: "0px",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                fontSize: "14px",
                fontWeight: "500",
              },
              success: {
                style: {
                  background: "#f0fdf4",
                  color: "#166534",
                  border: "1px solid #bbf7d0",
                },
              },
              error: {
                style: {
                  background: "#fef2f2",
                  color: "#dc2626",
                  border: "1px solid #fecaca",
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
