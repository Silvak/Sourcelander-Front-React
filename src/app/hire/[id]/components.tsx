import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Container from "@/components/common/Container";
import {
  ArrowLeft,
  Calculator,
  Clock,
  CheckCircle,
  Users,
  Target,
  FileText,
  Globe,
  Star,
  MapPin,
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle2,
  Mail,
  Phone,
} from "lucide-react";
import { Freelancer, ProjectForm } from "./types";
import { projectTypes } from "./config";

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p className="text-muted-foreground">Loading freelancer profile...</p>
    </div>
  </div>
);

export const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold mb-4">Freelancer not found</h1>
      <Button onClick={() => window.history.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Go Back
      </Button>
    </div>
  </div>
);

export const FreelancerHeader = ({
  freelancer,
}: {
  freelancer: Freelancer;
}) => (
  <Container>
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        onClick={() => window.history.back()}
        className="w-fit"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Search
      </Button>

      <div className="flex items-center gap-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
          <AvatarFallback className="text-lg">
            {freelancer.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Hire {freelancer.name}</h1>
            {freelancer.verified && (
              <CheckCircle className="h-5 w-5 text-primary" />
            )}
          </div>
          <p className="text-lg text-muted-foreground mb-3">
            {freelancer.title}
          </p>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{freelancer.rating}/5</span>
              <span className="text-muted-foreground">
                ({freelancer.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {freelancer.location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {freelancer.availability}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            ${freelancer.hourlyRate}/hr
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export const ProjectDetailsForm = ({
  form,
  setForm,
  currentProjectType,
}: {
  form: ProjectForm;
  setForm: (form: ProjectForm) => void;
  currentProjectType: (typeof projectTypes)[keyof typeof projectTypes];
}) => {
  const handleFeatureToggle = (feature: string) => {
    setForm({
      ...form,
      features: form.features.includes(feature)
        ? form.features.filter((f) => f !== feature)
        : [...form.features, feature],
    });
  };

  const handleTechnologyToggle = (tech: string) => {
    setForm({
      ...form,
      technologies: form.technologies.includes(tech)
        ? form.technologies.filter((t) => t !== tech)
        : [...form.technologies, tech],
    });
  };

  const handleDeliverableToggle = (deliverable: string) => {
    setForm({
      ...form,
      deliverables: form.deliverables.includes(deliverable)
        ? form.deliverables.filter((d) => d !== deliverable)
        : [...form.deliverables, deliverable],
    });
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Project Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Name
              </label>
              <Input
                placeholder="e.g., E-commerce Platform"
                value={form.projectName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, projectName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Project Type
              </label>
              <Select
                value={form.projectType}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    projectType: value,
                    features: [],
                    technologies: [],
                    deliverables: [],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(projectTypes).map(([key, type]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Budget Range
              </label>
              <Select
                value={form.budget}
                onValueChange={(value) => setForm({ ...form, budget: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-5k">Under $5,000</SelectItem>
                  <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50k+">$50,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Team Size
              </label>
              <Select
                value={form.teamSize}
                onValueChange={(value) => setForm({ ...form, teamSize: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 person</SelectItem>
                  <SelectItem value="2-3">2-3 people</SelectItem>
                  <SelectItem value="4-5">4-5 people</SelectItem>
                  <SelectItem value="6+">6+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Project Description
            </label>
            <Textarea
              placeholder="Describe your project in detail..."
              rows={4}
              value={form.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <Select
                value={form.duration}
                onValueChange={(value) => setForm({ ...form, duration: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                  <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
                  <SelectItem value="1-2 months">1-2 months</SelectItem>
                  <SelectItem value="2-3 months">2-3 months</SelectItem>
                  <SelectItem value="3+ months">3+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Complexity
              </label>
              <Select
                value={form.complexity}
                onValueChange={(value) =>
                  setForm({ ...form, complexity: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="complex">Complex</SelectItem>
                  <SelectItem value="very-complex">Very Complex</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Project Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {currentProjectType.features.map((feature: string) => (
              <button
                key={feature}
                onClick={() => handleFeatureToggle(feature)}
                className={`p-3 rounded-lg border-2 transition-colors duration-200 hover:border-primary/50 ${
                  form.features.includes(feature)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200"
                }`}
              >
                <span className="text-sm font-medium">{feature}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technologies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Technologies & Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {currentProjectType.technologies.map((tech: string) => (
              <button
                key={tech}
                onClick={() => handleTechnologyToggle(tech)}
                className={`p-3 rounded-lg border-2 transition-colors duration-200 hover:border-primary/50 ${
                  form.technologies.includes(tech)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200"
                }`}
              >
                <span className="text-sm font-medium">{tech}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deliverables */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Deliverables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentProjectType.deliverables.map((deliverable: string) => (
              <button
                key={deliverable}
                onClick={() => handleDeliverableToggle(deliverable)}
                className={`p-3 rounded-lg border-2 transition-colors duration-200 hover:border-primary/50 ${
                  form.deliverables.includes(deliverable)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200"
                }`}
              >
                <span className="text-sm font-medium">{deliverable}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const PriceCalculator = ({
  estimatedCost,
  calculatorAnimation,
  freelancer,
  form,
}: {
  estimatedCost: number;
  calculatorAnimation: boolean;
  freelancer: Freelancer;
  form: ProjectForm;
}) => {
  const getDurationHours = (duration: string) => {
    const hours = {
      "1-2 weeks": "40",
      "2-4 weeks": "80",
      "1-2 months": "160",
      "2-3 months": "240",
      "3+ months": "320",
    };
    return hours[duration as keyof typeof hours] || "80";
  };

  const getComplexityMultiplier = (complexity: string) => {
    const multipliers = {
      simple: "0.8x",
      medium: "1.0x",
      complex: "1.5x",
      "very-complex": "2.0x",
    };
    return multipliers[complexity as keyof typeof multipliers] || "1.0x";
  };

  const getTeamMultiplier = (teamSize: string) => {
    const multipliers = {
      "1": "1.0x",
      "2-3": "1.3x",
      "4-5": "1.6x",
      "6+": "2.0x",
    };
    return multipliers[teamSize as keyof typeof multipliers] || "1.0x";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Price Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`bg-primary/10 p-4 rounded-lg transition-all duration-300 ${
            calculatorAnimation ? "scale-105 bg-primary/20" : ""
          }`}
        >
          <div className="text-center">
            <div
              className={`text-3xl font-bold text-primary transition-all duration-300 ${
                calculatorAnimation ? "scale-110" : ""
              }`}
            >
              ${estimatedCost.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Estimated project cost
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Hourly Rate:</span>
            <span className="font-medium">${freelancer.hourlyRate}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Estimated Hours:</span>
            <span className="font-medium">
              {getDurationHours(form.duration)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Complexity Multiplier:</span>
            <span className="font-medium">
              {getComplexityMultiplier(form.complexity)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Team Size Multiplier:</span>
            <span className="font-medium">
              {getTeamMultiplier(form.teamSize)}
            </span>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between text-sm font-medium">
              <span>Minimum Guaranteed:</span>
              <span className="text-primary">$2,800</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const FreelancerSkills = ({
  freelancer,
}: {
  freelancer: Freelancer;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Users className="h-5 w-5" />
        {freelancer.name}&apos;s Skills
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {freelancer.skills.map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const FreelancerInfo = ({ freelancer }: { freelancer: Freelancer }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Freelancer Info
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm">Location:</span>
        <span className="text-sm font-medium">{freelancer.location}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Availability:</span>
        <span className="text-sm font-medium">{freelancer.availability}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Rating:</span>
        <span className="text-sm font-medium">
          {freelancer.rating}/5 ({freelancer.reviews} reviews)
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Experience:</span>
        <span className="text-sm font-medium">5+ years</span>
      </div>
    </CardContent>
  </Card>
);

export const TermsModal = ({
  isOpen,
  onClose,
  onAccept,
  freelancer,
  estimatedCost,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  freelancer: Freelancer;
  estimatedCost: number;
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          Terms & Conditions
        </DialogTitle>
        <DialogDescription className="text-base">
          Please review and accept the terms before proceeding with the hire.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
          <h4 className="font-semibold mb-4 text-lg">Project Summary</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Freelancer:</span>
              <span className="font-semibold">{freelancer.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Estimated Cost:</span>
              <span className="font-bold text-primary text-lg">
                ${estimatedCost.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Hourly Rate:</span>
              <span className="font-semibold">${freelancer.hourlyRate}/hr</span>
            </div>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-4">
          <h4 className="font-semibold text-lg">Terms & Conditions:</h4>
          <div className="space-y-3 text-sm leading-relaxed">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-2">1. Payment Terms</p>
              <p className="text-muted-foreground">
                50% upfront, 50% upon project completion.
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-2">2. Project Timeline</p>
              <p className="text-muted-foreground">
                Timeline will be finalized after project scope discussion.
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-2">3. Revisions</p>
              <p className="text-muted-foreground">
                Includes 2 rounds of revisions within project scope.
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-2">4. Communication</p>
              <p className="text-muted-foreground">
                All communication will be conducted through our platform.
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-2">5. Intellectual Property</p>
              <p className="text-muted-foreground">
                Full rights transfer upon final payment.
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-2">6. Cancellation</p>
              <p className="text-muted-foreground">
                48-hour notice required for project cancellation.
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-2">7. Quality Assurance</p>
              <p className="text-muted-foreground">
                All deliverables include testing and quality checks.
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-2">8. Support</p>
              <p className="text-muted-foreground">
                30-day post-launch support included.
              </p>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className="gap-3 pt-4">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={onAccept}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          Accept Terms & Continue
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const MaintenanceModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl">
          <AlertCircle className="h-6 w-6 text-orange-500" />
          System Maintenance
        </DialogTitle>
        <DialogDescription className="text-base">
          We&apos;re currently performing system maintenance to improve your
          experience.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-orange-800 mb-3 text-lg">
                Temporary Service Unavailable
              </h4>
              <p className="text-orange-700 leading-relaxed">
                Our hiring system is currently under maintenance. Please contact
                our sales team directly for immediate assistance.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Contact Sales Team:</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  sales@sourcelander.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Note:</strong> Our team will respond within 2 hours
                during business hours (9 AM - 6 PM EST).
              </p>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className="pt-4">
        <Button
          onClick={() => onClose(false)}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Got it, thanks!
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
