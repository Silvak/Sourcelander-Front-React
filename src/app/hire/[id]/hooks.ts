import { useState, useEffect } from "react";
import { mockFreelancers } from "@/lib/searchData";
import { Freelancer, ProjectForm } from "./types";

export const useFreelancer = (freelancerId: number) => {
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundFreelancer = mockFreelancers.find(
        (f) => f.id === freelancerId
      );
      setFreelancer(foundFreelancer || null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [freelancerId]);

  return { freelancer, isLoading };
};

export const useProjectCalculator = (
  form: ProjectForm,
  freelancer: Freelancer | null
) => {
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [calculatorAnimation, setCalculatorAnimation] = useState(false);

  const calculateCost = () => {
    if (!freelancer) return;

    const durationHours = {
      "1-2 weeks": 40,
      "2-4 weeks": 80,
      "1-2 months": 160,
      "2-3 months": 240,
      "3+ months": 320,
    };

    const complexityMultipliers = {
      simple: 0.8,
      medium: 1.0,
      complex: 1.5,
      "very-complex": 2.0,
    };

    const teamMultipliers = {
      "1": 1.0,
      "2-3": 1.3,
      "4-5": 1.6,
      "6+": 2.0,
    };

    const baseHours =
      durationHours[form.duration as keyof typeof durationHours] || 80;
    const complexityMultiplier =
      complexityMultipliers[
        form.complexity as keyof typeof complexityMultipliers
      ] || 1.0;
    const teamMultiplier =
      teamMultipliers[form.teamSize as keyof typeof teamMultipliers] || 1.0;

    let totalCost =
      baseHours * freelancer.hourlyRate * complexityMultiplier * teamMultiplier;
    totalCost = Math.max(totalCost, 2800);

    setEstimatedCost(Math.round(totalCost));
    setCalculatorAnimation(true);
    setTimeout(() => setCalculatorAnimation(false), 500);
  };

  useEffect(() => {
    calculateCost();
  }, [form, freelancer, calculateCost]);

  return { estimatedCost, calculatorAnimation };
};
