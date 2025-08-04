"use client";

import { useState, useEffect } from "react";
import Container from "@/components/common/Container";
import FreelancerCard from "@/components/search/FreelancerCard";
import FreelancerModal from "@/components/search/FreelancerModal";
import { Button } from "@/components/ui/button";
import { Trash2, Users, Calendar } from "lucide-react";
import { useFreelancerStorage } from "@/hooks/useFreelancerStorage";
import { UnifiedFreelancer } from "@/interfaces";

// Mock data to show when there are no stored freelancers
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
    storedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    viewCount: 3,
    hireCount: 1,
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
    storedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    viewCount: 2,
    hireCount: 0,
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
    storedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    viewCount: 5,
    hireCount: 2,
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
    storedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    viewCount: 1,
    hireCount: 0,
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
    storedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    viewCount: 4,
    hireCount: 1,
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
    storedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    viewCount: 2,
    hireCount: 0,
  },
];

export default function StoredFreelancersPage() {
  const [storedFreelancers, setStoredFreelancers] = useState<
    UnifiedFreelancer[]
  >([]);
  const [selectedFreelancer, setSelectedFreelancer] =
    useState<UnifiedFreelancer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMockData, setShowMockData] = useState(false);

  const {
    getStoredFreelancers,
    removeStoredFreelancer,
    clearStoredFreelancers,
    saveFreelancer,
  } = useFreelancerStorage();

  useEffect(() => {
    const freelancers = getStoredFreelancers();
    if (freelancers.length === 0) {
      // Si no hay freelancers guardados, mostrar datos mockeados
      setStoredFreelancers(mockFreelancers);
      setShowMockData(true);
    } else {
      setStoredFreelancers(freelancers);
      setShowMockData(false);
    }
  }, [getStoredFreelancers]);

  const handleViewProfile = (id: string) => {
    const freelancer = storedFreelancers.find((f) => f.id && f.id === id);
    if (freelancer) {
      // Update view count
      saveFreelancer(freelancer);
      setSelectedFreelancer(freelancer);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFreelancer(null);
  };

  const handleHireFreelancer = (freelancer: UnifiedFreelancer) => {
    // Update storage and redirect with 'hire' action
    saveFreelancer(freelancer, "hire");
    setIsModalOpen(false);
    setSelectedFreelancer(null);

    if (freelancer.id) {
      window.location.href = `/hire/${freelancer.id}`;
    }
  };

  const handleRemoveFreelancer = (id: string) => {
    if (showMockData) {
      // Si son datos mockeados, solo remover de la lista local
      setStoredFreelancers((prev) => prev.filter((f) => f.id !== id));
    } else {
      // Si son datos reales, remover del storage
      removeStoredFreelancer(id);
      setStoredFreelancers((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const handleClearAll = () => {
    if (showMockData) {
      // Si son datos mockeados, solo limpiar la lista local
      setStoredFreelancers([]);
    } else {
      // Si son datos reales, limpiar el storage
      clearStoredFreelancers();
      setStoredFreelancers([]);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <Container className="min-h-[300px] flex items-center justify-center">
        <div className="w-full text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Stored <span className="text-primary">Freelancers</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your saved freelancer profiles and recent views
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">
                {storedFreelancers.length} stored
              </span>
            </div>
            {storedFreelancers.length > 0 && !showMockData && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </Container>

      {/* Results Section */}
      <Container>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">Stored Profiles</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{storedFreelancers.length} results</span>
              </div>
            </div>
          </div>

          {/* No Results */}
          {storedFreelancers.length === 0 && !showMockData && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No stored freelancers
              </h3>
              <p className="text-muted-foreground mb-4">
                Start browsing freelancers to save their profiles here
              </p>
              <Button onClick={() => (window.location.href = "/freelancer")}>
                Browse Freelancers
              </Button>
            </div>
          )}

          {/* Results */}
          {storedFreelancers.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storedFreelancers.map((freelancer, index) => (
                  <div
                    key={freelancer.id || `stored-${index}`}
                    className="relative"
                  >
                    <FreelancerCard
                      freelancer={freelancer}
                      onViewProfile={handleViewProfile}
                    />

                    {/* Remove button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFreelancer(freelancer.id!)}
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 hover:bg-background"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>

                    {/* Storage info */}
                    <div className="absolute bottom-16 right-2 flex items-center gap-1 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {freelancer.storedAt
                          ? formatDate(freelancer.storedAt)
                          : "Unknown"}
                      </span>
                      {freelancer.viewCount && freelancer.viewCount > 1 && (
                        <span className="ml-1">
                          ({freelancer.viewCount} views)
                        </span>
                      )}
                      {freelancer.hireCount && freelancer.hireCount > 0 && (
                        <span className="ml-1 text-primary">
                          ({freelancer.hireCount} hires)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
