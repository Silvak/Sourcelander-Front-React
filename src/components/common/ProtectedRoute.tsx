"use client";

import { useAuthStore } from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthInit } from "@/hooks/useAuthInit";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  fallback,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { isLoading } = useAuthInit();
  const [isClient, setIsClient] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirect if not authenticated (only after hydration)
  useEffect(() => {
    if (isClient && !isLoading && !isAuthenticated) {
      console.log(
        "🚫 ProtectedRoute: User not authenticated, redirecting to login"
      );
      router.push("/auth/login");
    }
  }, [isClient, isLoading, isAuthenticated, router]);

  // Show loading state while hydrating or loading
  if (!isClient || isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-[#FBFBFC]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      )
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
