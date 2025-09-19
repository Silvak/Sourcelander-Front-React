import {
  Star,
  MapPin,
  Clock,
  CheckCircle,
  X,
  Calendar,
  DollarSign,
  Award,
  Users,
  Globe,
  Briefcase,
  Target,
  BookUser,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UnifiedFreelancer } from "@/interfaces";
import {
  formatMembershipYears,
  calculateMembershipYears,
} from "@/utils/membershipUtils";

interface FreelancerModalProps {
  freelancer: UnifiedFreelancer;
  isOpen: boolean;
  onClose: () => void;
  onHire: (freelancer: UnifiedFreelancer) => void;
}

export default function FreelancerModal({
  freelancer,
  isOpen,
  onClose,
  onHire,
}: FreelancerModalProps) {
  // Console log para ver los datos del freelancer


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Freelancer Profile</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
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
                <h3 className="text-lg font-bold">{freelancer.name}</h3>
                {freelancer.verified && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </div>
              <p className="text-base text-muted-foreground mb-3">
                {freelancer.title}
              </p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
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
              </div>
            </div>

            <div className="flex flex-col justify-end items-center gap-2">
              <div className="text-lg font-bold text-primary">
                ${freelancer.hourlyRate}/hr
              </div>
              <div
                title={freelancer.availability}
                className="flex items-center gap-1 text-xs text-muted-foreground"
              >
                <Clock className="h-3 w-3" />
                <span className="text-xs">Available</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="text-lg font-bold">
                  {freelancer.completedProjects || freelancer.reviews}+
                </div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-lg font-bold">98%</div>
                <div className="text-xs text-muted-foreground">
                  Success Rate
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="text-lg font-bold">
                  {freelancer.experienceYears || 5}+
                </div>
                <div className="text-xs text-muted-foreground">
                  Years Experience
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="text-lg font-bold">
                  {freelancer.skills?.length || 0}
                </div>
                <div className="text-xs text-muted-foreground">Skills</div>
              </CardContent>
            </Card>
          </div>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookUser className="h-5 w-5 text-primary" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Experienced {freelancer.title?.toLowerCase() || "professional"}{" "}
                with {freelancer.reviews || 0}+ successful projects. Specialized
                in{" "}
                {freelancer.skills?.slice(0, 3).join(", ") ||
                  "various technologies"}{" "}
                and delivering high-quality results. Passionate about creating
                innovative solutions and maintaining the highest standards of
                code quality.
              </p>
            </CardContent>
          </Card>

          {/* Professional Experience Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Professional Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {freelancer.professionalExperience &&
                freelancer.professionalExperience.length > 0 ? (
                  freelancer.professionalExperience.map((exp, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 py-2 bg-muted/30 rounded-lg border-l-4 border-primary/20"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">
                            {exp.position}
                          </span>
                          {exp.isCurrent && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {exp.company}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {exp.period}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-base text-muted-foreground">
                    No professional experience available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Education Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {freelancer.education &&
                freelancer.education.length > 0 ? (
                  freelancer.education.map((edu, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 py-2 bg-muted/30 rounded-lg border-l-4 border-primary/20"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">
                            {edu.institution}
                          </span>
                          {!edu.isCompleted && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                              En curso
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {edu.area}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {edu.year}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-base text-muted-foreground">
                    No education information available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Work Approach Section */}
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
                    <h4 className="font-semibold mb-2 text-sm">Methodology</h4>
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
                  <p className="text-sm text-muted-foreground">
                    No skills listed
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium">E-commerce Platform</h4>
                    <p className="text-sm text-muted-foreground">
                      React, Node.js, MongoDB
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">$8,500</div>
                    <div className="text-sm text-muted-foreground">
                      Completed
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium">
                      Mobile App Development
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      React Native, Firebase
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">$12,000</div>
                    <div className="text-sm text-muted-foreground">
                      Completed
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Average project value: $
              {((freelancer.hourlyRate || 0) * 40).toLocaleString()}
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onHire(freelancer)}>
              Hire {freelancer.name.split(" ")[0]}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
