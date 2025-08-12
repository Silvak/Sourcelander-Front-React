"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useAuthInit } from "@/hooks/useAuthInit";

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/auth");
  useAuthInit(); // Initialize auth but don't use the return value

  return (
    <>
      {!isAuthRoute && <Navbar />}
      <main className={isAuthRoute ? "" : ""}>{children}</main>
      {!isAuthRoute && <Footer />}
    </>
  );
}
