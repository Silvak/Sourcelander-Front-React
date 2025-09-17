import { UnifiedFreelancer } from "@/interfaces";

// Mock data para freelancers recomendados - 5 freelancers únicos
export const mockRecommendedFreelancers: UnifiedFreelancer[] = [
  {
    id: "rec-alex-martinez-001",
    name: "Alex Martinez",
    profileUrl: "/freelancer/alex-martinez",
    payRate: "$85/hr",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    title: "Full Stack Developer",
    description: "Experienced developer specializing in React, Node.js, and cloud architecture. 8+ years building scalable web applications.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 85,
    location: "San Francisco, CA",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
    responseTime: "1 hour",
    completedProjects: 89,
    successRate: 98,
    languages: ["English", "Spanish"],
    verified: true,
    topRated: true,
    category: "Web Development",
    subcategory: "Full Stack Development",
    experience: "8+ years",
    availability: "Available",
    memberSince: "2016-03-15",
    experienceYears: 12
  },
  {
    id: "rec-sarah-chen-002",
    name: "Sarah Chen",
    profileUrl: "/freelancer/sarah-chen",
    payRate: "$75/hr",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    title: "UI/UX Designer",
    description: "Creative designer with expertise in user experience and interface design. Specialized in mobile and web applications.",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 75,
    location: "New York, NY",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
    responseTime: "2 hours",
    completedProjects: 67,
    successRate: 96,
    languages: ["English", "Mandarin"],
    verified: true,
    topRated: true,
    category: "Design",
    subcategory: "UI/UX Design",
    experience: "6+ years",
    availability: "Available",
    memberSince: "2018-07-22",
    experienceYears: 10
  },
  {
    id: "rec-michael-rodriguez-003",
    name: "Michael Rodriguez",
    profileUrl: "/freelancer/michael-rodriguez",
    payRate: "$90/hr",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    title: "DevOps Engineer",
    description: "Infrastructure specialist with deep knowledge in cloud platforms, CI/CD, and automation. Expert in AWS and Kubernetes.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
    rating: 4.9,
    reviewCount: 156,
    hourlyRate: 90,
    location: "Austin, TX",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
    responseTime: "30 minutes",
    completedProjects: 112,
    successRate: 99,
    languages: ["English", "Spanish"],
    verified: true,
    topRated: true,
    category: "DevOps",
    subcategory: "Cloud Infrastructure",
    experience: "10+ years",
    availability: "Available",
    memberSince: "2014-01-10",
    experienceYears: 15
  },
  {
    id: "rec-maria-rodriguez-004",
    name: "Maria Rodriguez",
    profileUrl: "/freelancer/maria-rodriguez",
    payRate: "$65/hr",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    title: "Digital Marketing Specialist",
    description: "Results-driven marketing expert with proven track record in SEO, PPC, and social media marketing. Helping businesses grow online presence.",
    skills: ["SEO", "Google Ads", "Facebook Ads", "Content Marketing", "Analytics"],
    rating: 4.9,
    reviewCount: 156,
    hourlyRate: 65,
    location: "Miami, FL",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
    responseTime: "1 hour",
    completedProjects: 134,
    successRate: 99,
    languages: ["English", "Spanish", "Portuguese"],
    verified: true,
    topRated: true,
    category: "Marketing",
    subcategory: "Digital Marketing",
    experience: "7+ years",
    availability: "Available",
    memberSince: "2017-09-08",
    experienceYears: 10
  },
  {
    id: "rec-james-wilson-005",
    name: "James Wilson",
    profileUrl: "/freelancer/james-wilson",
    payRate: "$95/hr",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
    title: "Data Scientist",
    description: "PhD in Computer Science with expertise in machine learning, data analysis, and AI solutions. 5+ years in enterprise data projects.",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Data Visualization"],
    rating: 4.8,
    reviewCount: 43,
    hourlyRate: 95,
    location: "Seattle, WA",
    profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
    responseTime: "3 hours",
    completedProjects: 28,
    successRate: 97,
    languages: ["English"],
    verified: true,
    topRated: true,
    category: "Data Science",
    subcategory: "Machine Learning",
    experience: "5+ years",
    availability: "Available",
    memberSince: "2019-11-03",
    experienceYears: 8
  }
];

// Función para generar aproximadamente 25 freelancers repitiendo los 5 originales
export const generateExtendedRecommendedFreelancers = (): UnifiedFreelancer[] => {
  const targetCount = 25;
  const extendedList: UnifiedFreelancer[] = [];
  
  for (let i = 0; i < targetCount; i++) {
    const originalFreelancer = mockRecommendedFreelancers[i % mockRecommendedFreelancers.length];
    const duplicateNumber = Math.floor(i / mockRecommendedFreelancers.length) + 1;
    
    // Crear una copia con ID único para evitar problemas de keys en React
    const duplicatedFreelancer: UnifiedFreelancer = {
      ...originalFreelancer,
      id: `${originalFreelancer.id}-dup-${duplicateNumber}`
    };
    
    extendedList.push(duplicatedFreelancer);
  }
  
  return extendedList;
};