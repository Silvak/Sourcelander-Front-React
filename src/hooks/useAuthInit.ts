import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth/authStore";

export const useAuthInit = () => {
  const { initializeAuth, isLoading, isAuthenticated } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated after first render
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only initialize auth after hydration
    if (isHydrated) {
      initializeAuth();
    }
  }, [isHydrated, initializeAuth]);

  return { isLoading: isLoading || !isHydrated, isAuthenticated };
};
