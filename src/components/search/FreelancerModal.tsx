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
  if (!isOpen) return null;

  // Normalización de availability para evitar mostrar N/A o vacío
  const availabilityRaw = (freelancer.availability ?? "").toString().trim();
  const hasAvailability =
    availabilityRaw.length > 0 && availabilityRaw.toUpperCase() !== "N/A";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={freelancer.avatar || freelancer.imageUrl} alt={freelancer.name} />
              <AvatarFallback>
                {freelancer.name?.split(" ").map((n) => n[0]).join("")}
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

            <div className="flex justify-end items-center gap-2">
              <div
                title={hasAvailability ? availabilityRaw : undefined}
                className="flex items-center gap-1 text-sm text-muted-foreground"
              >
                <Clock className="h-3 w-3" />
                {hasAvailability && <span>{availabilityRaw}</span>}
              </div>
              <div className="text-lg font-bold text-primary">
                ${freelancer.hourlyRate}/hr
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
                <div className="text-lg font-bold">{freelancer.reviews}+</div>
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
                  {calculateMembershipYears(freelancer.memberSince)}+
                </div>
                <div className="text-xs text-muted-foreground">
                  Years Member
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
                with {freelancer.reviews || 0}+ successful projects. Specialized in {freelancer.skills?.slice(0, 3).join(", ") || "various technologies"}{" "}
                and delivering high-quality results. Passionate about creating innovative solutions and maintaining the highest standards of code quality.
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
                {(() => {
                  const currentYear = new Date().getFullYear();
                  const experienceYears = freelancer.experienceYears || 5;
                  const title = freelancer.title || "Developer";

                  const experiences: Array<{ position: string; period: string; isCurrent: boolean }> = [];

                  if (experienceYears >= 3) {
                    experiences.push({
                      position: `Senior ${title}`,
                      period: `${currentYear - Math.min(3, experienceYears)} - Present`,
                      isCurrent: true,
                    });
                  }

                  if (experienceYears >= 2) {
                    const startYear = currentYear - experienceYears;
                    const endYear = experienceYears >= 3 ? currentYear - 3 : currentYear - 1;
                    experiences.push({
                      position: title,
                      period: `${startYear} - ${endYear}`,
                      isCurrent: false,
                    });
                  }

                  if (experiences.length === 0) {
                    return (
                      <div className="text-base text-muted-foreground">
                        {experienceYears < 2 ? "Starting career" : "Experience details not available"}
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
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onHire(freelancer)}>Hire</Button>
        </div>
      </div>
    </div>
  );
}
