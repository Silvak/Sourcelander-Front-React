export * from "./router.interface";
export * from "./response.interface";

export interface UnifiedFreelancer {
  id: string;
  name: string;
  title: string;
  description: string;
  payRate: string;
  location: string;
  imageUrl: string;
  profileUrl: string;
  rating: number;
  projectsCompleted: number;
  skills: string[];
  speciality?: string;
  language?: string;
  // Additional properties for compatibility
  avatar: string;
  reviews: number;
  hourlyRate: number;
  availability: string;
  verified: boolean;
}

export interface HubstaffFreelancer {
  id: string;
  name: string;
  payRate: string;
  profileUrl: string;
  imageUrl: string;
  bio: string;
  location: string;
}

export interface WorkanaFreelancer {
  id: string;
  name: string;
  hourlyRate: string;
  profileUrl: string;
  profileImageUrl: string;
  description: string;
  country: string;
}

export interface HubstaffResponse {
  data: HubstaffFreelancer[];
}

export interface WorkanaResponse {
  data: WorkanaFreelancer[];
}

export interface SearchFilters {
  query: string;
  category?: string;
  location?: string;
  minRate?: number;
  maxRate?: number;
}
