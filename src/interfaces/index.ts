import { IProfessionalExperience, IEducation } from '../types';

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
  experienceYears?: number;
  professionalExperience?: IProfessionalExperience[]; // Array de experiencias profesionales
  education?: IEducation[]; // Array de educación
  memberSince?: string; // Antigüedad en la app (fecha de registro)
  // Storage-related properties
  storedAt?: string;
  lastViewed?: string;
  viewCount?: number;
  hireCount?: number;
  reviewCount?: number;
  profileImage?: string;
  isOnline?: boolean;
  responseTime?: string;
  completedProjects?: number;
  successRate?: number;
  languages?: string[];
  topRated?: boolean;
  category?: string;
  subcategory?: string;
  experience?: string;
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
}



// Interface para la respuesta completa de cada API
export interface WorkanaResponse {
  data: WorkanaFreelancer[];
  hasMore?: boolean;
}



// Tipo para manejar freelancers de Workana
export type Freelancer = WorkanaFreelancer;

export interface SearchFilters {
  query: string;
  category?: string;
  location?: string;
  minRate?: number;
  maxRate?: number;
}
