"use client";

import { useState, useEffect } from "react";
import Container from "@/components/common/Container";
import ContainerSmall from "@/components/common/ContainerSmall";
import SearchInput from "@/components/search/SearchInput";
import CategoryCard from "@/components/search/CategoryCard";
import FreelancerCard from "@/components/search/FreelancerCard";
import FreelancerModal from "@/components/search/FreelancerModal";
import { Button } from "@/components/ui/button";
import { popularCategories, mockFreelancers } from "@/lib/searchData";
import { Search, Users, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function FreelancerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFreelancers, setFilteredFreelancers] =
    useState(mockFreelancers);
  const [displayedCount, setDisplayedCount] = useState(16);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFreelancer, setSelectedFreelancer] = useState<
    (typeof mockFreelancers)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter freelancers based on search query and category
  useEffect(() => {
    let filtered = mockFreelancers;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (freelancer) =>
          freelancer.name.toLowerCase().includes(query) ||
          freelancer.title.toLowerCase().includes(query) ||
          freelancer.skills.some((skill) =>
            skill.toLowerCase().includes(query)
          ) ||
          freelancer.location.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      // Simple category filtering - in a real app this would be more sophisticated
      const categoryKeywords = {
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
        ],
        "mobile-development": [
          "mobile",
          "ios",
          "android",
          "react native",
          "flutter",
          "swift",
          "kotlin",
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
        ],
        marketing: [
          "marketing",
          "seo",
          "social media",
          "content",
          "google ads",
          "analytics",
        ],
        writing: [
          "writer",
          "content",
          "copywriting",
          "blog",
          "seo",
          "translation",
        ],
        video: ["video", "animation", "motion", "after effects", "premiere"],
        "data-science": [
          "data",
          "machine learning",
          "ai",
          "python",
          "sql",
          "analytics",
        ],
        consulting: ["consultant", "strategy", "business", "management", "it"],
      };

      const keywords =
        categoryKeywords[selectedCategory as keyof typeof categoryKeywords] ||
        [];
      filtered = filtered.filter((freelancer) =>
        keywords.some(
          (keyword) =>
            freelancer.title.toLowerCase().includes(keyword) ||
            freelancer.skills.some((skill) =>
              skill.toLowerCase().includes(keyword)
            )
        )
      );
    }

    setFilteredFreelancers(filtered);
    setDisplayedCount(16); // Reset to initial count when filtering
  }, [searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleViewProfile = (id: number) => {
    const freelancer = mockFreelancers.find((f) => f.id === id);
    if (freelancer) {
      setSelectedFreelancer(freelancer);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFreelancer(null);
  };

  const loadMore = () => {
    setDisplayedCount((prev) => prev + 8);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
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
                <span>{filteredFreelancers.length} results</span>
              </div>
            </div>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {filteredFreelancers.length === 0 ? (
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
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFreelancers
                  .slice(0, displayedCount)
                  .map((freelancer) => (
                    <FreelancerCard
                      key={freelancer.id}
                      freelancer={freelancer}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
              </div>

              {displayedCount < filteredFreelancers.length && (
                <div className="text-center pt-8">
                  <Button onClick={loadMore} variant="outline">
                    Load More Freelancers
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
