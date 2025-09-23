import { useInfiniteQuery } from "@tanstack/react-query";
import {
  UnifiedFreelancer,
  WorkanaFreelancer,
  WorkanaResponse,
} from "@/interfaces";
import { apiInstance } from "@/services/axiosConfig";
import { isAxiosError } from "axios";
import { generateFreelancerExperience } from "@/utils/experienceGenerator";
import { generateFreelancerEducation } from "@/utils/educationGenerator";

// Extract experience years from Workana skill strings like "SEO (5 to 10 years)" or "Graphic Design (+10 years)"
function parseExperienceYearsFromSkills(skills?: string[]): number | undefined {
  if (!skills || skills.length === 0) return undefined;
  const candidates: number[] = [];

  for (const s of skills) {
    // e.g., "(5 to 10 years)" or "5 to 10 years"
    const rangeMatch = s.match(/(?:\(|\b)(\d+)\s*to\s*(\d+)\s*years(?:\)|\b)/i);
    if (rangeMatch) {
      const lower = parseInt(rangeMatch[1], 10);
      if (!Number.isNaN(lower)) candidates.push(lower);
    }

    // e.g., "(+10 years)" or "+10 years" or "10 years"
    const plusMatch = s.match(/(?:\(|\b)\+?(\d+)\s*years(?:\)|\b)/i);
    if (plusMatch) {
      const val = parseInt(plusMatch[1], 10);
      if (!Number.isNaN(val)) candidates.push(val);
    }
  }

  if (candidates.length === 0) return undefined;
  // Use the max lower-bound as a conservative indicator of experience
  return Math.max(...candidates);
}

// Mapping helpers
const mapWorkanaFreelancer = (
  freelancer: WorkanaFreelancer,
): UnifiedFreelancer => ({
  id: `workana-${freelancer.id || Math.random().toString(36).substr(2, 9)}`,
  name: freelancer.name ?? "",
  payRate: freelancer.hourlyRate ?? "",
  profileUrl: freelancer.profileUrl ?? "",
  imageUrl: freelancer.profileImageUrl ?? "",
  description: freelancer.description ?? "",
  location: freelancer.country ?? "N/A",
  projectsCompleted: freelancer.projectsCompleted ?? "N/A",
  rating: freelancer.rating ?? "N/A",
  speciality: freelancer.title ?? "N/A",
  skills: freelancer.skills ?? [],
  reviews:
    typeof freelancer.projectsCompleted === "number"
      ? freelancer.projectsCompleted
      : 0,
  hourlyRate: parseFloat(freelancer.hourlyRate?.replace(/[^\d.]/g, "")) || 0,
  availability: "Available",
  verified: false,
  memberSince: "2021-01-01", // Default member since date
  experienceYears:
    parseExperienceYearsFromSkills(freelancer.skills) ||
    Math.floor(Math.random() * 8) + 3, // 3-10 years if not found
  professionalExperience: generateFreelancerExperience({
    skills: freelancer.skills,
    experienceYears:
      parseExperienceYearsFromSkills(freelancer.skills) ||
      Math.floor(Math.random() * 8) + 3,
    title: freelancer.title,
  }),
  education: generateFreelancerEducation({
    skills: freelancer.skills || [],
    experienceYears:
      parseExperienceYearsFromSkills(freelancer.skills) ||
      Math.floor(Math.random() * 8) + 3,
    title: freelancer.title || freelancer.name,
  }),
});

// Individual fetchers

async function fetchWorkana(query: string, page: number) {
  const safeQuery = query.trim();
  // Normalize category-prefixed tokens for Workana: "category:video" -> "video"
  const normalizedQuery = safeQuery
    .replace(/\bcategory:\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const buildUrl = (includeWorkerType: boolean) => {
    const params = new URLSearchParams();
    if (includeWorkerType) params.set("worker_type", "0");
    params.set("query", normalizedQuery);
    params.set("page", String(page));
    return `/workana/freelancers?${params.toString()}`;
  };

  const tryRequest = async (includeWorkerType: boolean) => {
    const url = buildUrl(includeWorkerType);
    try {
      const response = await apiInstance.get(url);
      const data = response.data as WorkanaResponse;
      const dataArray = Array.isArray(data.data) ? data.data : [];

      // Filter out freelancers with empty or invalid data
      const validFreelancers = dataArray.filter((freelancer) => {
        return (
          freelancer &&
          freelancer.name &&
          freelancer.name.trim() !== "" &&
          freelancer.description &&
          freelancer.description.trim() !== "" &&
          !freelancer.description.includes("Workana Freelancers") && // Filter out page content
          freelancer.hourlyRate &&
          freelancer.hourlyRate.trim() !== ""
        );
      });

      const freelancers = validFreelancers.map(mapWorkanaFreelancer);
      return {
        ok: true as const,
        result: { freelancers, hasMore: freelancers.length > 0 },
      };
    } catch (error: unknown) {
      // Axios error details
      if (isAxiosError(error)) {
        console.error("Workana HTTP Error:", {
          status: error.response?.status,
          data: error.response?.data,
          url,
        });

        // Check for timeout specifically
        if (error.message?.includes("timeout")) {
          console.error(
            "🕐 Workana API timeout - consider checking backend performance",
          );
        }
      }
      throw error;
    }
  };

  try {
    // 1) Intento con worker_type=0
    const first = await tryRequest(true);
    return first.result;
  } catch (error: unknown) {
    // Si el backend responde 400, reintentamos sin worker_type
    if (isAxiosError(error) && error.response?.status === 400) {
      console.warn(
        "Workana 400 with worker_type=0, retrying without worker_type...",
      );
      try {
        const second = await tryRequest(false);
        return second.result;
      } catch (retryError) {
        console.warn("Workana retry (without worker_type) failed:", retryError);
      }
    }

    console.warn("Workana fetch failed:", error);

    if (error instanceof Error) {
      console.error("Workana Error Details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });

      // Check for timeout specifically
      if (error.message.includes("timeout")) {
        console.error(
          "🕐 Workana API timeout - consider checking backend performance",
        );
      }
    }

    if (isAxiosError(error)) {
      console.error("Network Error Code:", error.code);
    }

    console.log(
      "💡 To fix this, ensure your backend is running and NEXT_PUBLIC_API_URL is configured correctly",
    );
    console.log(
      "💡 Current API URL:",
      process.env.NEXT_PUBLIC_API_URL || "NOT CONFIGURED",
    );

    return { freelancers: [], hasMore: false };
  }
}

// Unified fetch logic
const fetchSearchResults = async (
  query: string,
  page: number,
): Promise<{ freelancers: UnifiedFreelancer[]; hasMore: boolean }> => {
  // Fetch only from Workana
  const workanaResult = await fetchWorkana(query, page);

  const freelancers = [...workanaResult.freelancers];
  const hasMore = workanaResult.hasMore;

  console.log(`[PAGE ${page}] Workana: ${workanaResult.freelancers.length}`, {
    workanaError: workanaResult.freelancers.length === 0,
  });

  return { freelancers, hasMore };
};

export const useInfiniteSearchResults = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: async ({ pageParam = 1 }) => fetchSearchResults(query, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!query,
  });
};
