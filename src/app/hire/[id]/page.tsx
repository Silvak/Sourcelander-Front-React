"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import Container from "@/components/common/Container";
import { ProjectForm } from "./types";
import { projectTypes } from "./config";
import { useFreelancer, useProjectCalculator } from "./hooks";
import {
  LoadingSpinner,
  NotFound,
  FreelancerHeader,
  ProjectDetailsForm,
  PriceCalculator,
  FreelancerSkills,
  FreelancerInfo,
  TermsModal,
  MaintenanceModal,
} from "./components";

export default function HirePage() {
  const params = useParams();
  const freelancerId = parseInt(params.id as string);

  const [form, setForm] = useState<ProjectForm>({
    projectName: "",
    description: "",
    duration: "",
    complexity: "medium",
    budget: "",
    teamSize: "1",
    features: [],
    technologies: [],
    timeline: "",
    deliverables: [],
    projectType: "development",
  });

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  const { freelancer, isLoading } = useFreelancer(freelancerId);
  const { estimatedCost, calculatorAnimation } = useProjectCalculator(
    form,
    freelancer
  );

  const currentProjectType =
    projectTypes[form.projectType as keyof typeof projectTypes];

  const handleHireClick = () => {
    setShowTermsModal(true);
  };

  const handleAcceptTerms = () => {
    setShowTermsModal(false);
    setShowMaintenanceModal(true);
  };

  const handleCloseTerms = () => {
    setShowTermsModal(false);
  };

  const handleCloseMaintenance = () => {
    setShowMaintenanceModal(false);
  };

  if (isLoading) return <LoadingSpinner />;
  if (!freelancer) return <NotFound />;

  return (
    <div className="flex flex-col">
      <FreelancerHeader freelancer={freelancer} />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProjectDetailsForm
            form={form}
            setForm={setForm}
            currentProjectType={currentProjectType}
          />

          <div className="space-y-6">
            <PriceCalculator
              estimatedCost={estimatedCost}
              calculatorAnimation={calculatorAnimation}
              freelancer={freelancer}
              form={form}
            />

            <FreelancerSkills freelancer={freelancer} />

            <FreelancerInfo freelancer={freelancer} />

            <Button
              className="w-full h-12 text-lg font-semibold"
              size="lg"
              onClick={handleHireClick}
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Hire {freelancer.name.split(" ")[0]} - $
              {estimatedCost.toLocaleString()}
            </Button>
          </div>
        </div>
      </Container>

      {/* Modals */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={handleCloseTerms}
        onAccept={handleAcceptTerms}
        freelancer={freelancer}
        estimatedCost={estimatedCost}
      />

      <MaintenanceModal
        isOpen={showMaintenanceModal}
        onClose={handleCloseMaintenance}
      />
    </div>
  );
}
