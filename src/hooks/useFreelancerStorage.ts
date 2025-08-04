import { UnifiedFreelancer } from "@/interfaces";
import { useMemo } from "react";

const STORAGE_KEY = "sourcelander_freelancers";

// Helper function to check if we're in the browser
const isClient = typeof window !== "undefined";

export const useFreelancerStorage = () => {
  const storage = useMemo(() => {
    const saveFreelancer = (
      freelancer: UnifiedFreelancer,
      action: "view" | "hire" = "view"
    ) => {
      if (!isClient) return;

      try {
        const existing = localStorage.getItem(STORAGE_KEY);
        const freelancers = existing ? JSON.parse(existing) : [];

        // Check if freelancer already exists
        const exists = freelancers.find(
          (f: UnifiedFreelancer) => f.id === freelancer.id
        );
        if (!exists) {
          freelancers.push({
            ...freelancer,
            // Ensure we store both avatar and imageUrl for compatibility
            avatar: freelancer.avatar || freelancer.imageUrl,
            imageUrl: freelancer.imageUrl || freelancer.avatar,
            storedAt: new Date().toISOString(),
            viewCount: 1,
            hireCount: action === "hire" ? 1 : 0,
            lastAction: action,
          });
        } else {
          // Update view count and last viewed
          const index = freelancers.findIndex(
            (f: UnifiedFreelancer) => f.id === freelancer.id
          );
          freelancers[index] = {
            ...freelancers[index],
            // Update image fields if they exist
            avatar:
              freelancer.avatar ||
              freelancer.imageUrl ||
              freelancers[index].avatar,
            imageUrl:
              freelancer.imageUrl ||
              freelancer.avatar ||
              freelancers[index].imageUrl,
            lastViewed: new Date().toISOString(),
            viewCount:
              (freelancers[index].viewCount || 0) + (action === "view" ? 1 : 0),
            hireCount:
              (freelancers[index].hireCount || 0) + (action === "hire" ? 1 : 0),
            lastAction: action,
          };
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(freelancers));
      } catch (error) {
        console.warn("Failed to save freelancer to storage:", error);
      }
    };

    const getStoredFreelancers = (): UnifiedFreelancer[] => {
      if (!isClient) return [];

      try {
        const existing = localStorage.getItem(STORAGE_KEY);
        return existing ? JSON.parse(existing) : [];
      } catch (error) {
        console.warn("Failed to get stored freelancers:", error);
        return [];
      }
    };

    const clearStoredFreelancers = () => {
      if (!isClient) return;

      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.warn("Failed to clear stored freelancers:", error);
      }
    };

    const removeStoredFreelancer = (id: string) => {
      if (!isClient) return;

      try {
        const existing = localStorage.getItem(STORAGE_KEY);
        if (existing) {
          const freelancers = JSON.parse(existing);
          const filtered = freelancers.filter(
            (f: UnifiedFreelancer) => f.id !== id
          );
          localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        }
      } catch (error) {
        console.warn("Failed to remove freelancer from storage:", error);
      }
    };

    return {
      saveFreelancer,
      getStoredFreelancers,
      clearStoredFreelancers,
      removeStoredFreelancer,
    };
  }, []);

  return storage;
};
