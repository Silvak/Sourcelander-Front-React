"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  ArrowLeft,
  Target,
} from "lucide-react";
import { UnifiedFreelancer } from "@/interfaces";
import { useFreelancerStorage } from "@/hooks/useFreelancerStorage";
import MaintenanceModal from "@/components/modals/MaintenanceModal";
import AddToCartButton from "@/components/search/AddToCartButton";
import {
  formatMembershipYears,
  calculateMembershipYears,
} from "@/utils/membershipUtils";

export default function HirePage() {
  const params = useParams();
  const freelancerId = params.id as string;
  const [freelancer, setFreelancer] = useState<UnifiedFreelancer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const { getStoredFreelancers } = useFreelancerStorage();

  useEffect(() => {
    // Try to get freelancer from localStorage first
    const storedFreelancers = getStoredFreelancers();
    const foundFreelancer = storedFreelancers.find(
      (f) => f.id === freelancerId,
    );

    if (foundFreelancer) {
      setFreelancer(foundFreelancer);
    } else {
      // If not found in storage, create a mock freelancer with the ID
      setFreelancer({
        id: freelancerId,
        name: "Freelancer",
        title: "Professional",
        location: "N/A",
        rating: "N/A",
        reviews: 0,
        hourlyRate: 0,
        availability: "N/A",
        skills: [],
        avatar: "",
        imageUrl: "",
        profileUrl: "",
        payRate: "",
        description: "",
        speciality: "",
        projectsCompleted: "",
        verified: false,
        experienceYears: 5,
        memberSince: "2020-01-01",
      });
    }

    setIsLoading(false);
  }, [freelancerId, getStoredFreelancers]);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSendHireRequest = () => {
    setIsMaintenanceModalOpen(true);
  };

  if (isLoading) {
    return (
      <Container className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading freelancer details...</p>
        </div>
      </Container>
    );
  }

  if (!freelancer) {
    return (
      <Container className="flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Freelancer not found</h2>
          <p className="text-muted-foreground mb-6">
            The freelancer you&apos;re looking for could not be found.
          </p>
          <Button onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-gray-50">
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={handleGoBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>

          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={freelancer.avatar || freelancer.imageUrl || ""}
                alt={freelancer.name}
              />
              <AvatarFallback className="text-lg">
                {freelancer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{freelancer.name}</h1>
                {freelancer.verified && (
                  <CheckCircle className="h-6 w-6 text-primary" />
                )}
              </div>
              <p className="text-xl text-muted-foreground mb-3">
                {freelancer.title || freelancer.speciality}
              </p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    {formatMembershipYears(freelancer.memberSince)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {freelancer.location}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">
                    Available
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                ${freelancer.hourlyRate}/hr
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {freelancer.description ||
                    `Experienced ${
                      freelancer.title?.toLowerCase() || "professional"
                    } with ${
                      freelancer.reviews || 0
                    }+ successful projects. Specialized in ${
                      freelancer.skills?.slice(0, 3).join(", ") ||
                      "various technologies"
                    } and delivering high-quality results.`}
                </p>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  )) || (
                    <p className="text-muted-foreground">No skills listed</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Professional Experience Section */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(() => {
                    const currentYear = new Date().getFullYear();
                    // Calcular años de membresía en la app
                    const membershipYears = calculateMembershipYears(
                      freelancer.memberSince,
                    );
                    const title = freelancer.title || "Developer";

                    // Generar experiencias basadas en la antigüedad en la app
                    const experiences = [];

                    // Experiencia actual (Senior) - si tiene más de 3 años en la app
                    if (membershipYears >= 3) {
                      experiences.push({
                        position: `Senior ${title}`,
                        period: `${
                          currentYear - Math.min(3, membershipYears)
                        } - Present`,
                        isCurrent: true,
                      });
                    }

                    // Experiencia intermedia - si tiene más de 2 años en la app
                    if (membershipYears >= 2) {
                      const startYear = currentYear - membershipYears;
                      const endYear =
                        membershipYears >= 3
                          ? currentYear - 3
                          : currentYear - 1;
                      experiences.push({
                        position: title,
                        period: `${startYear} - ${endYear}`,
                        isCurrent: false,
                      });
                    }

                    // Si no hay suficiente antigüedad, mostrar mensaje
                    if (experiences.length === 0) {
                      return (
                        <div className="text-base text-muted-foreground">
                          {membershipYears < 2
                            ? "Starting career"
                            : "Experience details not available"}
                        </div>
                      );
                    }

                    return experiences.map((exp, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border-l-4 border-primary/20"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">
                              {exp.position}
                            </span>
                            {exp.isCurrent && (
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-base font-medium text-muted-foreground">
                          {exp.period}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Work Approach */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Work Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">
                        Methodology
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Agile development with regular check-ins and iterative
                        delivery
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">
                        Communication
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Daily updates and transparent progress reporting
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">
                        Quality Focus
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Code reviews, testing, and documentation included
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Timeline</h4>
                      <p className="text-sm text-muted-foreground">
                        Realistic estimates with buffer time for revisions
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Details Form */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe your project requirements..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Budget Range
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>Select budget range</option>
                      <option>$1,000 - $5,000</option>
                      <option>$5,000 - $10,000</option>
                      <option>$10,000 - $25,000</option>
                      <option>$25,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Timeline
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>Select timeline</option>
                      <option>1-2 weeks</option>
                      <option>1-2 months</option>
                      <option>3-6 months</option>
                      <option>6+ months</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hire Card */}
            <Card>
              <CardHeader>
                <CardTitle>Hire {freelancer.name.split(" ")[0]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">
                    ${freelancer.hourlyRate}/hr
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Average project value: $
                    {((freelancer.hourlyRate || 0) * 40).toLocaleString()}
                  </p>
                </div>

                <Button
                  className="w-full "
                  variant="outline"
                  size="lg"
                  onClick={handleSendHireRequest}
                >
                  Send Hire Request
                </Button>

                <AddToCartButton
                  freelancer={freelancer}
                  variant="default"
                  size="lg"
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{freelancer.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs">Available</span>
                </div>
                {freelancer.profileUrl && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      <a
                        href={freelancer.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View Full Profile
                      </a>
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>

      {/* Maintenance Modal */}
      <MaintenanceModal
        isOpen={isMaintenanceModalOpen}
        onClose={setIsMaintenanceModalOpen}
      />
    </div>
  );
}
