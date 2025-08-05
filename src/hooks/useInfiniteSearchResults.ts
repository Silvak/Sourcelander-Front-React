import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { UnifiedFreelancer } from "@/interfaces";
import {
  mapHubstaffFreelancer,
  mapWorkanaFreelancer,
} from "@/lib/mappers/freelancers.mapper";

const cleanQuery = (query: string) => query.trim().replace("category:", "");

const fetchSearchResults = async (
  query: string,
  page: number,
): Promise<{ freelancers: UnifiedFreelancer[]; hasMore: boolean }> => {
  try {
    const hubstaffURL = `https://skillmatch-back.gravitad.xyz/api/hubstaff/freelancers?keywords=${encodeURIComponent(
      cleanQuery(query),
    )}&page=${page}`;

    const workanaURL = `https://skillmatch-back.gravitad.xyz/api/workana/freelancers?query=${encodeURIComponent(
      cleanQuery(query),
    )}&page=${page}`;

    const [hubstaffRes, workanaRes] = await Promise.allSettled([
      axios.get(hubstaffURL),
      axios.get(workanaURL),
    ]);

    const hubstaffFreelancers: UnifiedFreelancer[] =
      hubstaffRes.status === "fulfilled"
        ? (hubstaffRes.value.data.data.profiles || []).map(
            mapHubstaffFreelancer,
          )
        : [];

    const hasMoreHubstaff =
      hubstaffRes.status === "fulfilled" &&
      hubstaffRes.value.data.data.hasMore === true;

    const workanaFreelancers: UnifiedFreelancer[] =
      workanaRes.status === "fulfilled"
        ? (workanaRes.value.data.data || []).map(mapWorkanaFreelancer)
        : [];

    const hasMore = hasMoreHubstaff || workanaFreelancers.length > 0;

    if (hubstaffRes.status === "rejected") {
      console.warn("Hubstaff error:", hubstaffRes.reason);
    }
    if (workanaRes.status === "rejected") {
      console.warn("Workana error:", workanaRes.reason);
    }

    return {
      freelancers: [...hubstaffFreelancers, ...workanaFreelancers],
      hasMore,
    };
  } catch (error) {
    console.error("Unexpected error in fetchSearchResults:", error);
    return { freelancers: [], hasMore: false };
  }
};

export const useInfiniteSearchResults = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: async ({ pageParam = 1 }) => fetchSearchResults(query, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    enabled: !!query.trim(),
  });
};
