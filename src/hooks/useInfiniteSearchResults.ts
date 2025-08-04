import { useInfiniteQuery } from "@tanstack/react-query";
import {
  HubstaffFreelancer,
  HubstaffResponse,
  UnifiedFreelancer,
  WorkanaFreelancer,
  WorkanaResponse,
} from "@/interfaces";

const mapWorkanaFreelancer = (
  freelancer: WorkanaFreelancer
): UnifiedFreelancer => ({
  id: freelancer.id,
  name: freelancer.name,
  title: freelancer.name, // Usar name como title por defecto
  payRate: freelancer.hourlyRate,
  profileUrl: freelancer.profileUrl,
  imageUrl: freelancer.profileImageUrl,
  description: freelancer.description,
  location: freelancer.country,
  projectsCompleted: 0, // Valor por defecto
  rating: 0, // Valor por defecto
  speciality: "N/A", // Valor por defecto
  skills: [], // Valor por defecto
  avatar: freelancer.profileImageUrl, // Usar profileImageUrl como avatar
  reviews: 0, // Valor por defecto
  hourlyRate: parseFloat(freelancer.hourlyRate) || 0,
  availability: "Available", // Valor por defecto
  verified: false, // Valor por defecto
});

const mapHubstaffFreelancer = (
  freelancer: HubstaffFreelancer
): UnifiedFreelancer => ({
  id: freelancer.id,
  name: freelancer.name,
  title: freelancer.name, // Usar name como title por defecto
  payRate: freelancer.payRate,
  profileUrl: freelancer.profileUrl,
  imageUrl: freelancer.imageUrl,
  description: freelancer.bio,
  location: freelancer.location,
  speciality: "N/A", // Valor por defecto
  rating: 0, // Valor por defecto
  projectsCompleted: 0, // Valor por defecto
  skills: [], // Valor por defecto
  avatar: freelancer.imageUrl, // Usar imageUrl como avatar
  reviews: 0, // Valor por defecto
  hourlyRate: parseFloat(freelancer.payRate) || 0,
  availability: "Available", // Valor por defecto
  verified: false, // Valor por defecto
});

const fetchSearchResults = async (
  query: string,
  page: number
): Promise<UnifiedFreelancer[]> => {
  // const hubstaffURL = `https://skillmatch-back.gravitad.xyz/api/hubstaff/freelancers?search[keywords]=${encodeURIComponent(query)}&page=${page}`;
  // const workanaURL = `https://skillmatch-back.gravitad.xyz/api/workana/freelancers?worker_type=0&query=${encodeURIComponent(query)}&page=${page}`;

  const hubstaffURL = `https://skillmatch-back.gravitad.xyz/api/hubstaff/freelancers?search[keywords]=${encodeURIComponent(
    query
  )}&page=${page}`;

  const workanaURL = `https://skillmatch-back.gravitad.xyz/api/workana/freelancers?worker_type=0&query=${encodeURIComponent(
    query
  )}&page=${page}`;

  const [response, response2] = await Promise.all([
    fetch(hubstaffURL),
    fetch(workanaURL),
  ]);

  if (!response.ok && !response2.ok) throw new Error("Error fetching results");

  const hubstaffData = (await response.json()) as HubstaffResponse;
  const workanaData = (await response2.json()) as WorkanaResponse;

  const hubstaffFreelancers = (hubstaffData.data || []).map(
    mapHubstaffFreelancer
  );
  const workanaFreelancers = (workanaData.data || []).map(mapWorkanaFreelancer);

  // Combinamos los resultados
  const totalRes = [...hubstaffFreelancers, ...workanaFreelancers];

  return totalRes;
};

export const useInfiniteSearchResults = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: async ({ pageParam = 1 }) => fetchSearchResults(query, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 25 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!query,
  });
};
