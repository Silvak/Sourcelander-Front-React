import { useInfiniteQuery } from "@tanstack/react-query";
import {
  HubstaffFreelancer,
  HubstaffResponse,
  UnifiedFreelancer,
  WorkanaFreelancer,
  WorkanaResponse,
} from "@/interfaces";
import { apiInstance } from "@/services/axiosConfig";

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
  freelancer: WorkanaFreelancer
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
  experienceYears: parseExperienceYearsFromSkills(freelancer.skills),
});

const mapHubstaffFreelancer = (
  freelancer: HubstaffFreelancer
): UnifiedFreelancer => ({
  id: `hubstaff-${freelancer.id || Math.random().toString(36).substr(2, 9)}`,
  name: freelancer.name ?? "",
  payRate: freelancer.payRate ?? "",
  profileUrl: freelancer.profileUrl ?? "",
  imageUrl: freelancer.imageUrl ?? "",
  description: freelancer.bio ?? "",
  location: freelancer.location ?? "N/A",
  speciality: freelancer.speciality ?? freelancer.employmentType ?? "N/A",
  rating: freelancer.rating ?? "N/A",
  projectsCompleted: freelancer.projectsCompleted ?? "N/A",
  skills: freelancer.skills ?? [],
  reviews: freelancer.projectsCompleted || 0,
  hourlyRate: parseFloat(freelancer.payRate?.replace(/[^\d.]/g, "")) || 0,
  availability: "Available",
  verified: false,
  experienceYears: 6, // Default experience years
});

// Individual fetchers
async function fetchHubstaff(query: string, page: number) {
  const safeQuery = query.trim();
  const url = `/hubstaff/freelancers?keywords=${encodeURIComponent(safeQuery)}&page=${page}`;
  try {
    const response = await apiInstance.get(url);
    const data = response.data as HubstaffResponse;
    // Validar que data.data sea un array antes de usar map
    const dataArray = Array.isArray(data.data) ? data.data : [];
    const freelancers = dataArray.map(mapHubstaffFreelancer);
    return { freelancers, hasMore: !!data.hasMore };
  } catch (error) {
    console.warn("Hubstaff fetch failed:", error);
    
    // Log more detailed error information
    if (error instanceof Error) {
      console.error("Hubstaff Error Details:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    
    // Check if it's a network error
    if (error && typeof error === 'object' && 'code' in error) {
      console.error("Network Error Code:", (error as any).code);
    }
    
    console.log("💡 To fix this, ensure your backend is running and NEXT_PUBLIC_API_URL is configured correctly");
    console.log("💡 Current API URL:", process.env.NEXT_PUBLIC_API_URL || "NOT CONFIGURED");
    
    return { freelancers: [], hasMore: false };
  }
}

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
      const freelancers = dataArray.map(mapWorkanaFreelancer);
      return { ok: true as const, result: { freelancers, hasMore: freelancers.length > 0 } };
    } catch (error: any) {
      // Axios error details
      if (error && error.response) {
        console.error("Workana HTTP Error:", {
          status: error.response.status,
          data: error.response.data,
          url,
        });
      }
      throw error;
    }
  };

  try {
    // 1) Intento con worker_type=0
    const first = await tryRequest(true);
    return first.result;
  } catch (error: any) {
    // Si el backend responde 400, reintentamos sin worker_type
    if (error && error.response && error.response.status === 400) {
      console.warn("Workana 400 with worker_type=0, retrying without worker_type...");
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
    }

    if (error && typeof error === "object" && "code" in error) {
      console.error("Network Error Code:", (error as any).code);
    }

    console.log("💡 To fix this, ensure your backend is running and NEXT_PUBLIC_API_URL is configured correctly");
    console.log("💡 Current API URL:", process.env.NEXT_PUBLIC_API_URL || "NOT CONFIGURED");

    return { freelancers: [], hasMore: false };
  }
}

// Unified fetch logic
const fetchSearchResults = async (
  query: string,
  page: number
): Promise<{ freelancers: UnifiedFreelancer[]; hasMore: boolean }> => {
  // Fetch both in parallel, but handle error from each independently
  const [hubstaffResult, workanaResult] = await Promise.all([
    fetchHubstaff(query, page),
    fetchWorkana(query, page),
  ]);

  // Prefer results from both, but if one failed, still return the other's data
  const freelancers = [
    ...hubstaffResult.freelancers,
    ...workanaResult.freelancers,
  ];
  const hasMore = hubstaffResult.hasMore || workanaResult.hasMore;

  console.log(
    `[PAGE ${page}] Hubstaff: ${hubstaffResult.freelancers.length}, Workana: ${workanaResult.freelancers.length}`,
    {
      hubstaffError: hubstaffResult.freelancers.length === 0,
      workanaError: workanaResult.freelancers.length === 0,
    }
  );

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
