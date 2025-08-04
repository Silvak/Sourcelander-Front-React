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
import { SearchFilters, UnifiedFreelancer } from "@/interfaces";

export default function FreelancerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFreelancer, setSelectedFreelancer] =
    useState<UnifiedFreelancer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleViewProfile = (id: string) => {
    const freelancer = freelancers.find((f) => f.id && f.id === id);
    if (freelancer) {
      setSelectedFreelancer(freelancer);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFreelancer(null);
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

          {/* Data source indicator */}
          {freelancers.length > 0 && (
            <div className="flex items-center justify-center gap-2">
              {freelancers.some((f) => f.id && f.id.startsWith("MOCK-")) ? (
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-700 border-orange-200"
                >
                  🔄 Using Mock Data (API unavailable)
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  ✅ Live API Data
                </Badge>
              )}
            </div>
          )}

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
      <ContainerSmall>
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Popular Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse by category to find the right talent for your project
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                <span>{freelancers.length} results</span>
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
          {!isLoading && !isError && freelancers.length === 0 && (
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
          {!isLoading && !isError && freelancers.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {freelancers.map((freelancer, index) => (
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
        />
      )}
    </div>
  );
}
