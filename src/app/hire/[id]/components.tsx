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
  Calendar,
} from "lucide-react";
import { Freelancer, ProjectForm } from "./types";
import { projectTypes } from "./config";
import { formatMembershipYears } from "@/utils/membershipUtils";

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p className="text-muted-foreground">Loading freelancer profile...</p>
    </div>
  </div>
);

export const NotFound = () => (
  <div className="flex items-center justify-center py-20">
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
}) => {
  // Normalize availability to avoid showing N/A or empty
  const availabilityRaw = (freelancer.availability ?? "").toString().trim();
  const hasAvailability =
    availabilityRaw.length > 0 && availabilityRaw.toUpperCase() !== "N/A";

  return (
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
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {formatMembershipYears(freelancer.memberSince)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {freelancer.location}
                </span>
              </div>
              <div
                className="flex items-center gap-2"
                title={hasAvailability ? availabilityRaw : undefined}
              >
                <Clock className="h-4 w-4 text-muted-foreground" />
                {hasAvailability && (
                  <span className="text-muted-foreground">{availabilityRaw}</span>
                )}
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
};

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
                  <SelectItem value="1-3 months">1-3 months</SelectItem>
                  <SelectItem value="3-6 months">3-6 months</SelectItem>
                  <SelectItem value="6+ months">6+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <Select
                value={form.priority}
                onValueChange={(value) => setForm({ ...form, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Technologies
            </label>
            <div className="flex flex-wrap gap-2">
              {currentProjectType.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant={
                    form.technologies.includes(tech) ? "default" : "secondary"
                  }
                  className="cursor-pointer select-none"
                  onClick={() => handleTechnologyToggle(tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Features</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentProjectType.features.map((feature) => (
                <label key={feature} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Additional Deliverables
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentProjectType.deliverables.map((deliverable) => (
                <label key={deliverable} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.deliverables.includes(deliverable)}
                    onChange={() => handleDeliverableToggle(deliverable)}
                  />
                  <span>{deliverable}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5" />
            <span className="text-sm">Timezone aligned communication</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5" />
            <span className="text-sm">Secure NDA available</span>
          </div>
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5" />
            <span className="text-sm">Top-rated professional</span>
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
  const hourlyRate = Number(freelancer.hourlyRate) || 0;
  const hoursPerWeekOptions: Record<ProjectForm["duration"], number> = {
    "1-2 weeks": 20,
    "2-4 weeks": 20,
    "1-3 months": 15,
    "3-6 months": 15,
    "6+ months": 10,
  };

  const weeksForDuration: Record<ProjectForm["duration"], number> = {
    "1-2 weeks": 2,
    "2-4 weeks": 4,
    "1-3 months": 8,
    "3-6 months": 16,
    "6+ months": 24,
  };

  const hoursPerWeek = hoursPerWeekOptions[form.duration] || 10;
  const weeks = weeksForDuration[form.duration] || 8;

  const baseCost = hourlyRate * hoursPerWeek * weeks;
  const featureMultiplier = 1 + form.features.length * 0.1;
  const complexityMultiplier =
    form.priority === "high" ? 1.3 : form.priority === "medium" ? 1.15 : 1;

  const estimatedTotal = Math.round(baseCost * featureMultiplier * complexityMultiplier);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Project Cost Estimate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Estimated Cost</span>
            <span className="text-2xl font-bold text-primary">
              ${estimatedTotal.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span>Hourly Rate</span>
                <span className="font-medium">${hourlyRate}/hr</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span>Hours/Week</span>
                <span className="font-medium">{hoursPerWeek}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span>Duration</span>
                <span className="font-medium">{form.duration}</span>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span>Base Cost</span>
                <span className="font-medium">${baseCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span>Features ({form.features.length})</span>
                <span className="font-medium">x{featureMultiplier.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span>Priority</span>
                <span className="font-medium">{form.priority}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
            <p className="text-sm text-muted-foreground">
              This is a rough estimate. Final cost may vary based on detailed
              requirements and scope discussions.
            </p>
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

export const FreelancerInfo = ({ freelancer }: { freelancer: Freelancer }) => {
  // Normalize availability to avoid showing N/A or empty
  const availabilityRaw = (freelancer.availability ?? "").toString().trim();
  const hasAvailability =
    availabilityRaw.length > 0 && availabilityRaw.toUpperCase() !== "N/A";

  return (
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
          <span className="text-sm font-medium" title={hasAvailability ? availabilityRaw : undefined}>
            {hasAvailability ? availabilityRaw : "—"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Experience:</span>
          <span className="text-sm font-medium">
            {formatMembershipYears(freelancer.memberSince, "años miembro")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

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
      </div>
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
      </div>
    </DialogContent>
  </Dialog>
);
