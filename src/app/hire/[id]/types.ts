export interface Freelancer {
  id: number;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  skills: string[];
  location: string;
  availability: string;
  verified: boolean;
}

export interface ProjectForm {
  projectName: string;
  description: string;
  duration: string;
  complexity: string;
  budget: string;
  teamSize: string;
  features: string[];
  technologies: string[];
  timeline: string;
  deliverables: string[];
  projectType: string;
}
