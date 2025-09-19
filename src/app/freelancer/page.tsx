"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import ContainerSmall from "@/components/common/ContainerSmall";
import SearchInput from "@/components/search/SearchInput";
import CategoryCard from "@/components/search/CategoryCard";
import RecommendedFreelancersCarousel from "@/components/search/RecommendedFreelancers";
import FreelancerCard from "@/components/search/FreelancerCard";
import FreelancerModal from "@/components/search/FreelancerModal";
import { Button } from "@/components/ui/button";
import { popularCategories } from "@/lib/searchData";
import { generateExtendedRecommended } from "@/lib/mockRecommended";
import { Search, Users, Filter, Loader2 } from "lucide-react";
import { generateFreelancerExperience } from "@/utils/experienceGenerator";
import { generateFreelancerEducation } from "@/utils/educationGenerator";
import { Badge } from "@/components/ui/badge";
import { useInfiniteSearchResults } from "@/hooks/useInfiniteSearchResults";
import { useFreelancerStorage } from "@/hooks/useFreelancerStorage";
import { useSearchStore } from "@/store/search/searchStore";
import { UnifiedFreelancer } from "@/interfaces";
import FilterDropdown, {
  applyVisualFilters,
  IFilterOptions,
} from "@/components/common/FilterDropdown";

// Mock data to show when there are no search results
const mockFreelancers: UnifiedFreelancer[] = [
  {
    id: "fl-sarah-johnson-001",
    name: "Sarah Johnson",
    title: "Full Stack Developer",
    description:
      "Experienced developer with 5+ years in React, Node.js and Python. Specialized in scalable web applications and RESTful APIs.",
    skills: ["React", "Node.js", "Python", "TypeScript", "MongoDB"],
    hourlyRate: 45,
    rating: 4.8,
    reviews: 127,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    location: "New York, USA",
    profileUrl: "https://example.com/profile/sarah-johnson",
    payRate: "$45/hr",
    experienceYears: 8,
    professionalExperience: generateFreelancerExperience({
      skills: ["React", "Node.js", "Python", "TypeScript", "MongoDB"],
      experienceYears: 8,
      title: "Full Stack Developer",
    }),
    education: generateFreelancerEducation({
      skills: ["React", "Node.js", "Python", "TypeScript", "MongoDB"],
      experienceYears: 8,
      title: "Full Stack Developer",
    }),
  },
  {
    id: "fl-michael-chen-002",
    name: "Michael Chen",
    title: "UI/UX Designer",
    description:
      "Creative designer specialized in user interfaces and user experience. Experience with Figma, Adobe Creative Suite and responsive design.",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    hourlyRate: 35,
    rating: 4.9,
    reviews: 89,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    location: "San Francisco, USA",
    profileUrl: "https://example.com/profile/michael-chen",
    payRate: "$35/hr",
    experienceYears: 6,
    professionalExperience: generateFreelancerExperience({
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
      experienceYears: 6,
      title: "UI/UX Designer",
    }),
    education: generateFreelancerEducation({
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
      experienceYears: 6,
      title: "UI/UX Designer",
    }),
  },
  {
    id: "fl-emily-rodriguez-003",
    name: "Emily Rodriguez",
    title: "Mobile App Developer",
    description:
      "Mobile developer with experience in React Native, Flutter and native iOS/Android development. Specialized in high-performance apps.",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    hourlyRate: 50,
    rating: 4.7,
    reviews: 156,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    location: "Austin, USA",
    profileUrl: "https://example.com/profile/emily-rodriguez",
    payRate: "$50/hr",
    experienceYears: 10,
    professionalExperience: generateFreelancerExperience({
      skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      experienceYears: 10,
      title: "Mobile App Developer",
    }),
    education: generateFreelancerEducation({
      skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      experienceYears: 10,
      title: "Mobile App Developer",
    }),
  },
  {
    id: "fl-david-thompson-004",
    name: "David Thompson",
    title: "DevOps Engineer",
    description:
      "DevOps engineer with experience in AWS, Docker, Kubernetes and CI/CD. Specialized in infrastructure automation and monitoring.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
    hourlyRate: 60,
    rating: 4.6,
    reviews: 73,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    location: "Seattle, USA",
    profileUrl: "https://example.com/profile/david-thompson",
    payRate: "$60/hr",
    experienceYears: 5,
    professionalExperience: generateFreelancerExperience({
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
      experienceYears: 5,
      title: "DevOps Engineer",
    }),
    education: generateFreelancerEducation({
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
      experienceYears: 5,
      title: "DevOps Engineer",
    }),
  },
  {
    id: "fl-lisa-wang-005",
    name: "Lisa Wang",
    title: "Data Scientist",
    description:
      "Data scientist with experience in machine learning, statistical analysis and data visualization. Specialized in Python, R and SQL.",
    skills: ["Python", "R", "SQL", "TensorFlow", "Tableau"],
    hourlyRate: 55,
    rating: 4.9,
    reviews: 94,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    location: "Boston, USA",
    profileUrl: "https://example.com/profile/lisa-wang",
    payRate: "$55/hr",
    experienceYears: 7,
    professionalExperience: generateFreelancerExperience({
      skills: ["Python", "R", "SQL", "TensorFlow", "Tableau"],
      experienceYears: 7,
      title: "Data Scientist",
    }),
    education: generateFreelancerEducation({
      skills: ["Python", "R", "SQL", "TensorFlow", "Tableau"],
      experienceYears: 7,
      title: "Data Scientist",
    }),
  },
  {
    id: "fl-james-wilson-006",
    name: "James Wilson",
    title: "Backend Developer",
    description:
      "Backend developer with experience in Java, Spring Boot, microservices and databases. Specialized in scalable architectures.",
    skills: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Kafka"],
    hourlyRate: 48,
    rating: 4.8,
    reviews: 112,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    location: "Chicago, USA",
    profileUrl: "https://example.com/profile/james-wilson",
    payRate: "$48/hr",
    experienceYears: 9,
    professionalExperience: generateFreelancerExperience({
      skills: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Kafka"],
      experienceYears: 9,
      title: "Backend Developer",
    }),
    education: generateFreelancerEducation({
      skills: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Kafka"],
      experienceYears: 9,
      title: "Backend Developer",
    }),
  },
];

export default function FreelancerPage() {
  const {
    searchTerm: searchQuery,
    selectedCategory,
    setSearchTerm: setSearchQuery,
    setSelectedCategory,
    clearAll,
  } = useSearchStore();

  const [filters, setFilters] = useState<IFilterOptions>({
    priceRange: null,
    experience: null,
  });

  const [selectedFreelancer, setSelectedFreelancer] =
    useState<UnifiedFreelancer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { saveFreelancer } = useFreelancerStorage();

  // El query para el hook de búsqueda infinita
  const query = (
    selectedCategory
      ? [searchQuery, `category:${selectedCategory}`].filter(Boolean).join(" ")
      : searchQuery
  ).trim();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteSearchResults(query);

  // Junta todos los freelancers de las páginas
  const freelancers = data?.pages.flatMap((page) => page.freelancers) ?? [];

  // Si no hay resultados y no está cargando, mostrar datos mockeados
  const baseFreelancers =
    !isLoading && !isError && freelancers.length === 0
      ? mockFreelancers
      : freelancers;

  // Aplicar filtros visuales
  const displayFreelancers = applyVisualFilters(baseFreelancers, filters);
  const showMockData = !isLoading && !isError && freelancers.length === 0;

  // Check if we have any active search criteria
  const hasActiveSearch =
    searchQuery.trim() !== "" || selectedCategory !== null;

  // Show recommended freelancers carousel when searching
  const showRecommendedFreelancers = hasActiveSearch;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleViewProfile = (id: string) => {
    // Buscar primero en los resultados de búsqueda
    let freelancer = displayFreelancers.find((f) => f.id && f.id === id);

    // Si no se encuentra, buscar en los freelancers recomendados
    if (!freelancer) {
      const recommendedFreelancers = generateExtendedRecommended();
      freelancer = recommendedFreelancers.find((f) => f.id && f.id === id);
    }

    if (freelancer) {
      // Save to storage when viewing profile with complete data
      const freelancerWithCompleteData = {
        ...freelancer,
        avatar:
          freelancer.avatar ||
          freelancer.imageUrl ||
          freelancer.profileImage ||
          "",
        imageUrl:
          freelancer.imageUrl ||
          freelancer.avatar ||
          freelancer.profileImage ||
          "",
        // Ensure education is preserved or generated if missing
        education: freelancer.education || generateFreelancerEducation({
          skills: freelancer.skills || [],
          experienceYears: freelancer.experienceYears || 5,
          title: freelancer.title || freelancer.speciality || freelancer.name
        }),
      };
      saveFreelancer(freelancerWithCompleteData);
      setSelectedFreelancer(freelancerWithCompleteData);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFreelancer(null);
  };

  const handleHireFreelancer = (freelancer: UnifiedFreelancer) => {
    // Save to storage when hiring with 'hire' action and complete data
    const freelancerWithCompleteData = {
      ...freelancer,
      avatar: freelancer.avatar || freelancer.imageUrl || "",
      imageUrl: freelancer.imageUrl || freelancer.avatar || "",
      // Ensure education is preserved or generated if missing
      education: freelancer.education || generateFreelancerEducation({
        skills: freelancer.skills || [],
        experienceYears: freelancer.experienceYears || 5,
        title: freelancer.title || freelancer.speciality || freelancer.name
      }),
    };
    saveFreelancer(freelancerWithCompleteData, "hire");

    // Close modal and redirect
    setIsModalOpen(false);
    setSelectedFreelancer(null);

    if (freelancer.id) {
      window.location.href = `/hire/${freelancer.id}`;
    }
  };

  const clearFilters = () => {
    clearAll();
    setFilters({ priceRange: null, experience: null });
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Container className="min-h-[500px] flex items-center justify-center">
        <div className="w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Find the Perfect <span className="text-primary">Freelancer</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with talented professionals from around the world. We
              handle the work management so you can focus on your business.
            </p>
          </div>

          <SearchInput onSearch={handleSearch} initialValue={searchQuery} />

          {/* Active filters */}
          {(searchQuery || selectedCategory) && (
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <button onClick={() => handleSearch("")} className="ml-1">
                    ×
                  </button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="secondary" className="gap-1">
                  Category:{" "}
                  {
                    popularCategories.find((c) => c.id === selectedCategory)
                      ?.name
                  }
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-1"
                  >
                    ×
                  </button>
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>
      </Container>

      {/* Categories Section - Hidden during search */}
      {!showRecommendedFreelancers && (
        <ContainerSmall className="p-0 md:p-0 pt-8 md:pt-12">
          <div className="space-y-8">
            <div className="text-center space-y-3 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Popular Categories
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse by category to find the right talent for your project
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 -m-[1px]">
              {popularCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={handleCategoryClick}
                />
              ))}
            </div>
          </div>
        </ContainerSmall>
      )}

      {/* Recommended Freelancers Carousel - Shown during search */}
      {showRecommendedFreelancers && (
        <ContainerSmall className="pt-8 md:pt-12">
          <RecommendedFreelancersCarousel
            freelancers={generateExtendedRecommended()}
            onViewProfile={handleViewProfile}
            searchTerm={searchQuery}
          />
        </ContainerSmall>
      )}

      {/* Results Section */}
      <Container>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">Freelancers</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{displayFreelancers.length} results</span>
              </div>
            </div>

            <FilterDropdown
              onFiltersChange={setFilters}
              currentFilters={filters}
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-semibold mb-2">
                Searching for freelancers...
              </h3>
              <p className="text-muted-foreground">
                Please wait while we find the best matches for you
              </p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Error loading results
              </h3>
              <p className="text-muted-foreground mb-4">
                Something went wrong while searching. Please try again.
              </p>
              <Button onClick={handleRetry}>Try Again</Button>
            </div>
          )}

          {/* No Results */}
          {!isLoading && !isError && displayFreelancers.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-6">
                <div className="relative">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <div className="absolute top-0 right-1/2 translate-x-8 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs">?</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                No hay freelancers con estos filtros
              </h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">
                Ajusta los filtros para ver más freelancers que se adapten a tu
                proyecto.
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="text-sm"
              >
                Limpiar filtros
              </Button>
            </div>
          )}

          {/* Results */}
          {!isLoading && !isError && displayFreelancers.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
                {displayFreelancers.map((freelancer, index) => (
                  <FreelancerCard
                    key={freelancer.id || `freelancer-${index}`}
                    freelancer={freelancer}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>

              {hasNextPage && (
                <div className="text-center pt-8">
                  <Button
                    onClick={() => fetchNextPage()}
                    variant="outline"
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage
                      ? "Loading more..."
                      : "Load More Freelancers"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Container>

      {/* Modal */}
      {selectedFreelancer && (
        <FreelancerModal
          freelancer={selectedFreelancer}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onHire={handleHireFreelancer}
        />
      )}
    </div>
  );
}
