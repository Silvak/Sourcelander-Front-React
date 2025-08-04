import {
  HubstaffFreelancer,
  HubstaffResponse,
  UnifiedFreelancer,
  WorkanaFreelancer,
  WorkanaResponse,
  SearchFilters,
} from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/services/axiosConfig";

// Datos mockeados como fallback - marcados con "MOCK" en el ID
const mockFreelancers: UnifiedFreelancer[] = [
  {
    id: "mock-1",
    name: "Sarah Johnson",
    title: "Frontend Developer",
    description:
      "Experienced React developer with 5+ years building modern web applications. Specialized in TypeScript, Next.js, and responsive design.",
    payRate: "$45/hour",
    location: "United States",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    profileUrl: "#",
    rating: 4.8,
    projectsCompleted: 23,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    reviews: 23,
    hourlyRate: 45,
    availability: "Available",
    verified: true,
  },
  {
    id: "mock-2",
    name: "Carlos Rodriguez",
    title: "UI/UX Designer",
    description:
      "Creative designer focused on user-centered design solutions. Expert in Figma, Adobe Creative Suite, and design systems.",
    payRate: "$55/hour",
    location: "Spain",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    profileUrl: "#",
    rating: 4.9,
    projectsCompleted: 18,
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "Design Systems"],
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    reviews: 18,
    hourlyRate: 55,
    availability: "Available",
    verified: true,
  },
  {
    id: "mock-3",
    name: "Maria Silva",
    title: "Backend Developer",
    description:
      "Senior backend developer with expertise in Node.js, Python, and cloud infrastructure. Experienced in microservices architecture.",
    payRate: "$60/hour",
    location: "Brazil",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    profileUrl: "#",
    rating: 4.7,
    projectsCompleted: 31,
    skills: ["Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    reviews: 31,
    hourlyRate: 60,
    availability: "Available",
    verified: true,
  },
  {
    id: "mock-4",
    name: "David Chen",
    title: "Mobile Developer",
    description:
      "iOS and Android developer with 6+ years experience. Expert in Swift, Kotlin, and cross-platform development with React Native.",
    payRate: "$50/hour",
    location: "Canada",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    profileUrl: "#",
    rating: 4.6,
    projectsCompleted: 15,
    skills: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase"],
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    reviews: 15,
    hourlyRate: 50,
    availability: "Available",
    verified: true,
  },
  {
    id: "mock-5",
    name: "Ana Garcia",
    title: "Full Stack Developer",
    description:
      "Versatile developer with expertise in both frontend and backend technologies. Specialized in MERN stack and cloud deployment.",
    payRate: "$65/hour",
    location: "Mexico",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    profileUrl: "#",
    rating: 4.9,
    projectsCompleted: 27,
    skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    reviews: 27,
    hourlyRate: 65,
    availability: "Available",
    verified: true,
  },
  {
    id: "mock-6",
    name: "James Wilson",
    title: "DevOps Engineer",
    description:
      "Infrastructure specialist with deep knowledge of CI/CD, Kubernetes, and cloud platforms. Expert in automation and scaling.",
    payRate: "$70/hour",
    location: "United Kingdom",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    profileUrl: "#",
    rating: 4.8,
    projectsCompleted: 12,
    skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"],
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    reviews: 12,
    hourlyRate: 70,
    availability: "Available",
    verified: true,
  },
];

// Función para marcar datos como mockeados
const markAsMockData = (
  freelancers: UnifiedFreelancer[]
): UnifiedFreelancer[] => {
  return freelancers.map((freelancer) => ({
    ...freelancer,
    id: `MOCK-${freelancer.id}`,
    description: `${freelancer.description} [MOCK DATA]`,
  }));
};

// Función para filtrar datos mockeados según los criterios de búsqueda
const filterMockData = (filters: SearchFilters): UnifiedFreelancer[] => {
  let filteredData = mockFreelancers;

  // Filtrar por query
  if (filters.query) {
    const query = filters.query.toLowerCase();
    filteredData = filteredData.filter(
      (freelancer) =>
        freelancer.name.toLowerCase().includes(query) ||
        freelancer.title.toLowerCase().includes(query) ||
        freelancer.description.toLowerCase().includes(query) ||
        freelancer.skills.some((skill) => skill.toLowerCase().includes(query))
    );
  }

  // Filtrar por categoría
  if (filters.category) {
    const categoryKeywords = getCategoryKeywords(filters.category);
    filteredData = filteredData.filter((freelancer) =>
      categoryKeywords.some(
        (keyword) =>
          freelancer.title.toLowerCase().includes(keyword) ||
          freelancer.description.toLowerCase().includes(keyword) ||
          freelancer.skills.some((skill) =>
            skill.toLowerCase().includes(keyword)
          )
      )
    );
  }

  // Filtrar por ubicación
  if (filters.location) {
    const location = filters.location.toLowerCase();
    filteredData = filteredData.filter((freelancer) =>
      freelancer.location.toLowerCase().includes(location)
    );
  }

  // Filtrar por rango de precios
  if (filters.minRate) {
    filteredData = filteredData.filter(
      (freelancer) => freelancer.hourlyRate >= filters.minRate!
    );
  }

  if (filters.maxRate) {
    filteredData = filteredData.filter(
      (freelancer) => freelancer.hourlyRate <= filters.maxRate!
    );
  }

  return filteredData;
};

// Función para mapear WorkanaFreelancer a UnifiedFreelancer
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
  rating: 4.0, // Default rating
  projectsCompleted: 5, // Default value
  skills: [], // Will be populated based on description analysis
  speciality: "N/A", // Valor por defecto
  language: "English", // Valor por defecto
  // Additional properties for compatibility
  avatar: freelancer.profileImageUrl,
  reviews: 5, // Default value
  hourlyRate: parseFloat(freelancer.hourlyRate.replace(/[^0-9.]/g, "")) || 25,
  availability: "Available",
  verified: true,
});

// Función para mapear HubstaffFreelancer a UnifiedFreelancer
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
  rating: 4.0, // Default rating
  projectsCompleted: 5, // Default value
  skills: [], // Will be populated based on bio analysis
  speciality: "N/A", // Valor por defecto
  language: "English", // Valor por defecto
  // Additional properties for compatibility
  avatar: freelancer.imageUrl,
  reviews: 5, // Default value
  hourlyRate: parseFloat(freelancer.payRate.replace(/[^0-9.]/g, "")) || 25,
  availability: "Available",
  verified: true,
});

const fetchSearchResults = async (
  filters: SearchFilters
): Promise<UnifiedFreelancer[]> => {
  try {
    let hubstaffFreelancers: UnifiedFreelancer[] = [];
    let workanaFreelancers: UnifiedFreelancer[] = [];

    // Try to fetch from Hubstaff API with timeout handling
    try {
      const hubstaffResponse = await apiInstance.get("/hubstaff/freelancers", {
        params: {
          "search[keywords]": filters.query,
          ...(filters.location && { location: filters.location }),
          ...(filters.minRate && { min_rate: filters.minRate }),
          ...(filters.maxRate && { max_rate: filters.maxRate }),
        },
        timeout: 10000, // Increase timeout to 10 seconds
      });

      const hubstaffData = hubstaffResponse.data as HubstaffResponse;
      if (hubstaffData?.data) {
        hubstaffFreelancers = hubstaffData.data
          .filter((freelancer) => freelancer && freelancer.name) // Filter out null/undefined
          .map(mapHubstaffFreelancer);
      }
    } catch (hubstaffError) {
      console.warn(
        "❌ Hubstaff API failed, will use mock data:",
        hubstaffError
      );
    }

    // Try to fetch from Workana API with timeout handling
    try {
      const workanaResponse = await apiInstance.get("/workana/freelancers", {
        params: {
          query: filters.query,
          worker_type: 0,
          ...(filters.location && { location: filters.location }),
          ...(filters.minRate && { min_rate: filters.minRate }),
          ...(filters.maxRate && { max_rate: filters.maxRate }),
        },
        timeout: 10000, // Increase timeout to 10 seconds
      });

      const workanaData = workanaResponse.data as WorkanaResponse;
      if (workanaData?.data) {
        workanaFreelancers = workanaData.data
          .filter((freelancer) => freelancer && freelancer.name) // Filter out null/undefined
          .map(mapWorkanaFreelancer);
      }
    } catch (workanaError) {
      console.warn("❌ Workana API failed, will use mock data:", workanaError);
    }

    // Log results from APIs
    if (hubstaffFreelancers.length > 0) {
      console.log(
        `✅ Hubstaff API: ${hubstaffFreelancers.length} freelancers found`
      );
    }
    if (workanaFreelancers.length > 0) {
      console.log(
        `✅ Workana API: ${workanaFreelancers.length} freelancers found`
      );
    }

    // If both APIs failed, return filtered mock data
    if (hubstaffFreelancers.length === 0 && workanaFreelancers.length === 0) {
      console.log("❌ Both APIs failed, using MOCK DATA");
      return markAsMockData(filterMockData(filters));
    }

    // Combine results
    const totalResults = [...hubstaffFreelancers, ...workanaFreelancers];

    // Apply additional filters if needed
    let filteredResults = totalResults;

    if (filters.category) {
      const categoryKeywords = getCategoryKeywords(filters.category);
      filteredResults = filteredResults.filter((freelancer) =>
        categoryKeywords.some(
          (keyword) =>
            freelancer.title.toLowerCase().includes(keyword) ||
            freelancer.description.toLowerCase().includes(keyword) ||
            freelancer.skills.some((skill) =>
              skill.toLowerCase().includes(keyword)
            )
        )
      );
    }

    return filteredResults;
  } catch (error) {
    console.error("❌ Error fetching search results:", error);
    // Fallback to filtered mock data if everything fails
    console.log("🔄 Using MOCK DATA as fallback");
    return markAsMockData(filterMockData(filters));
  }
};

// Función para obtener palabras clave por categoría
const getCategoryKeywords = (category: string): string[] => {
  const categoryKeywords: Record<string, string[]> = {
    "web-development": [
      "frontend",
      "backend",
      "full stack",
      "react",
      "node",
      "javascript",
      "typescript",
      "php",
      "python",
      "web",
      "developer",
    ],
    "mobile-development": [
      "mobile",
      "ios",
      "android",
      "react native",
      "flutter",
      "swift",
      "kotlin",
      "app",
    ],
    design: [
      "design",
      "ui",
      "ux",
      "figma",
      "adobe",
      "graphic",
      "brand",
      "logo",
      "designer",
    ],
    marketing: [
      "marketing",
      "seo",
      "social media",
      "content",
      "google ads",
      "analytics",
      "digital",
    ],
    writing: [
      "writer",
      "content",
      "copywriting",
      "blog",
      "seo",
      "translation",
      "editor",
    ],
    video: [
      "video",
      "animation",
      "motion",
      "after effects",
      "premiere",
      "editor",
    ],
    "data-science": [
      "data",
      "machine learning",
      "ai",
      "python",
      "sql",
      "analytics",
      "scientist",
    ],
    consulting: [
      "consultant",
      "strategy",
      "business",
      "management",
      "it",
      "advisor",
    ],
  };

  return categoryKeywords[category] || [];
};

export const useSearchResults = (filters: SearchFilters) => {
  return useQuery({
    queryKey: ["search", filters],
    queryFn: () => fetchSearchResults(filters),
    enabled: !!filters.query || !!filters.category,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
