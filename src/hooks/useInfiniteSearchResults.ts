import { useInfiniteQuery } from "@tanstack/react-query";
import {
  HubstaffFreelancer,
  HubstaffResponse,
  UnifiedFreelancer,
  WorkanaFreelancer,
  WorkanaResponse,
} from "@/interfaces";
import { apiInstance } from "@/services/axiosConfig";

// Mapping helpers
const mapWorkanaFreelancer = (
  freelancer: WorkanaFreelancer,
): UnifiedFreelancer => ({
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
});

const mapHubstaffFreelancer = (
  freelancer: HubstaffFreelancer,
): UnifiedFreelancer => ({
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
});

// Individual fetchers
async function fetchHubstaff(query: string, page: number) {
  const url = `/hubstaff/freelancers?keywords=${encodeURIComponent(
    query,
  )}&page=${page}`;
  try {
    const response = await apiInstance.get(url);
    const data = response.data as HubstaffResponse;
    const freelancers = (data.data || []).map(mapHubstaffFreelancer);
    return { freelancers, hasMore: !!data.hasMore };
  } catch (error) {
    console.warn("Hubstaff fetch failed:", error);
    return { freelancers: [], hasMore: false };
  }
}

async function fetchWorkana(query: string, page: number) {
  const url = `/workana/freelancers?worker_type=0&query=${encodeURIComponent(
    query,
  )}&page=${page}`;
  try {
    const response = await apiInstance.get(url);
    const data = response.data as WorkanaResponse;
    const freelancers = (data.data || []).map(mapWorkanaFreelancer);
    return { freelancers, hasMore: freelancers.length > 0 };
  } catch (error) {
    console.warn("Workana fetch failed:", error);
    return { freelancers: [], hasMore: false };
  }
}

// Unified fetch logic
const fetchSearchResults = async (
  query: string,
  page: number,
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
    },
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
