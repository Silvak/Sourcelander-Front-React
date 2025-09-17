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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UnifiedFreelancer } from "@/interfaces";

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
  console.log("FreelancerModal - Datos del freelancer:", freelancer);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Freelancer Profile</h2>
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
                <h3 className="text-2xl font-bold">{freelancer.name}</h3>
                {freelancer.verified && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </div>
              <p className="text-lg text-muted-foreground mb-3">
                {freelancer.title}
              </p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    {freelancer.experienceYears || 5}+ yrs. exp.
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

            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                ${freelancer.hourlyRate}/hr
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{freelancer.availability}</span>
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
                <div className="text-2xl font-bold">{freelancer.reviews}+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-muted-foreground">
                  Success Rate
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">
                  {freelancer.experienceYears || 5}+
                </div>
                <div className="text-sm text-muted-foreground">Years Exp.</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">
                  {freelancer.skills?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Skills</div>
              </CardContent>
            </Card>
          </div>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
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
                )) || <p className="text-muted-foreground">No skills listed</p>}
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
                    <h4 className="font-medium">E-commerce Platform</h4>
                    <p className="text-sm text-muted-foreground">
                      React, Node.js, MongoDB
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">$8,500</div>
                    <div className="text-xs text-muted-foreground">
                      Completed
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Mobile App Development</h4>
                    <p className="text-sm text-muted-foreground">
                      React Native, Firebase
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">$12,000</div>
                    <div className="text-xs text-muted-foreground">
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
