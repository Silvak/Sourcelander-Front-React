// Unified Freelancer type
export interface UnifiedFreelancer {
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
}

export interface RecommendedFreelancer extends UnifiedFreelancer {
  id: string;
  language: string;
}

// Interface para freelancers de Workana
export interface WorkanaFreelancer {
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

// Interface para freelancers de Hubstaff
export interface HubstaffFreelancer {
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
}

// Interface para la respuesta completa de cada API
export interface WorkanaResponse {
  data: WorkanaFreelancer[];
}

export interface HubstaffResponse {
  data: HubstaffFreelancer[];
}

// Tipo unión para manejar ambos tipos de freelancers
export type Freelancer = WorkanaFreelancer | HubstaffFreelancer;
