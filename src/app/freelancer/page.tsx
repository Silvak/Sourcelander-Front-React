"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import ContainerSmall from "@/components/common/ContainerSmall";
import SearchInput from "@/components/search/SearchInput";
import CategoryCard from "@/components/search/CategoryCard";
import FreelancerCard from "@/components/search/FreelancerCard";
import FreelancerModal from "@/components/search/FreelancerModal";
import { Button } from "@/components/ui/button";
import { popularCategories } from "@/lib/searchData";
import { Search, Users, Filter, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useInfiniteSearchResults } from "@/hooks/useInfiniteSearchResults";
import { useFreelancerStorage } from "@/hooks/useFreelancerStorage";
import { UnifiedFreelancer } from "@/interfaces";

// Mock data to show when there are no search results
const mockFreelancers: UnifiedFreelancer[] = [
  {
    id: "mock-1",
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
  },
  {
    id: "mock-2",
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
  },
  {
    id: "mock-3",
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
  },
  {
    id: "mock-4",
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
  },
  {
    id: "mock-5",
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
  },
  {
    id: "mock-6",
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
  },
];

export default function FreelancerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFreelancer, setSelectedFreelancer] =
    useState<UnifiedFreelancer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { saveFreelancer } = useFreelancerStorage();

  // El query para el hook de búsqueda infinita
  const query = selectedCategory
    ? `${searchQuery} category:${selectedCategory}`
    : searchQuery;

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
  const displayFreelancers =
    !isLoading && !isError && freelancers.length === 0
      ? mockFreelancers
      : freelancers;
  const showMockData = !isLoading && !isError && freelancers.length === 0;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleViewProfile = (id: string) => {
    const freelancer = displayFreelancers.find((f) => f.id && f.id === id);
    if (freelancer) {
      // Save to storage when viewing profile with complete data
      const freelancerWithCompleteData = {
        ...freelancer,
        avatar: freelancer.avatar || freelancer.imageUrl || "",
        imageUrl: freelancer.imageUrl || freelancer.avatar || "",
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
    setSearchQuery("");
    setSelectedCategory(null);
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

          <SearchInput onSearch={handleSearch} />

          {/* Active filters */}
          {(searchQuery || selectedCategory) && (
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="ml-1">
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

      {/* Categories Section */}
      <ContainerSmall className="p-0 md:p-0 pt-8 md:pt-12">
        <div className="space-y-8">
          <div className="text-center space-y-3 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Popular Categories2
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

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
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
          {!isLoading &&
            !isError &&
            freelancers.length === 0 &&
            !showMockData && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No freelancers found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse our categories
                </p>
                <Button onClick={clearFilters}>Clear filters</Button>
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
