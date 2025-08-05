// Unified Freelancer type
export interface UnifiedFreelancer {
  id?: string;
  name: string;
  profileUrl: string;
  payRate: string;
  imageUrl: string;
  location: string;
  description: string;
  speciality?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rating?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projectsCompleted?: any;
  title?: string;
  skills?: string[];
  avatar?: string;
  reviews?: number;
  hourlyRate?: number;
  availability?: string;
  verified?: boolean;
  // Storage-related properties
  storedAt?: string;
  lastViewed?: string;
  viewCount?: number;
  hireCount?: number;
  lastAction?: "view" | "hire";
}

export interface RecommendedFreelancer extends UnifiedFreelancer {
  id: string;
  language: string;
  hasMore?: boolean;
}

// Interface para freelancers de Workana
export interface WorkanaFreelancer {
  id?: string;
  name: string;
  description: string;
  skills?: string[];
  hourlyRate: string; // Mantiene el formato "R$ 20,00"
  country: string;
  profileUrl: string;
  profileImageUrl: string;
  speciality?: string;
  rating?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projectsCompleted?: any;
  title?: string;
  reviews?: number;
}

// Interface para freelancers de Hubstaff
export interface HubstaffFreelancer {
  id?: string;
  name: string;
  profileUrl: string;
  employmentType: string;
  payRate: string; // Mantiene el formato "$5/hr"
  location: string;
  bio: string;
  skills: string[];
  imageUrl: string;
  speciality?: string;
  rating?: number;
  projectsCompleted?: number;
  title?: string;
  reviews?: number;
}

// Interface para la respuesta completa de cada API
export interface WorkanaResponse {
  data: WorkanaFreelancer[];
  hasMore?: boolean;
}

export interface HubstaffResponse {
  data: HubstaffFreelancer[];
  hasMore?: boolean;
}

// Tipo unión para manejar ambos tipos de freelancers
export type Freelancer = WorkanaFreelancer | HubstaffFreelancer;

export interface SearchFilters {
  query: string;
  category?: string;
  location?: string;
  minRate?: number;
  maxRate?: number;
}
