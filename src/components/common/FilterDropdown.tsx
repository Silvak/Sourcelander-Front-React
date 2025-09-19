"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Check } from "lucide-react";
import { UnifiedFreelancer } from "@/interfaces";

export interface IFilterOptions {
  priceRange: string | null;
  experience: string | null;
}

interface FilterDropdownProps {
  onFiltersChange: (filters: IFilterOptions) => void;
  currentFilters: IFilterOptions;
  className?: string;
}

const priceRanges = [
  { id: "all", label: "All Prices", min: 0, max: Infinity },
  { id: "budget", label: "$5 - $15/hr", min: 5, max: 15 },
  { id: "mid", label: "$16 - $30/hr", min: 16, max: 30 },
  { id: "premium", label: "$31 - $50/hr", min: 31, max: 50 },
  { id: "expert", label: "$51 - $100/hr", min: 51, max: 100 },
  { id: "enterprise", label: "$100+/hr", min: 100, max: Infinity },
];

const experienceLevels = [
  { id: "all", label: "All Levels" },
  { id: "entry", label: "Entry Level (0-2 years)" },
  { id: "intermediate", label: "Intermediate (2-5 years)" },
  { id: "expert", label: "Expert (5+ years)" },
];

export default function FilterDropdown({
  onFiltersChange,
  currentFilters,
  className = "",
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (
    filterType: keyof IFilterOptions,
    value: string
  ) => {
    const newFilters = {
      ...currentFilters,
      [filterType]: value === "all" ? null : value,
    };
    onFiltersChange(newFilters);
  };

  const hasActiveFilters = Object.values(currentFilters).some(
    (filter) => filter !== null
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`${className} ${
            hasActiveFilters ? "border-primary text-primary" : ""
          }`}
        >
          <Filter className="h-4 w-4 mr-2" />
          <p className="hidden sm:inline">Filters</p>
          {hasActiveFilters && (
            <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">
              {Object.values(currentFilters).filter((f) => f !== null).length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Price Range */}
        <DropdownMenuLabel>Price Range</DropdownMenuLabel>
        {priceRanges.map((range) => (
          <DropdownMenuItem
            key={range.id}
            onClick={() => handleFilterChange("priceRange", range.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{range.label}</span>
            {(currentFilters.priceRange === range.id ||
              (currentFilters.priceRange === null && range.id === "all")) && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Experience Level */}
        <DropdownMenuLabel>Experience</DropdownMenuLabel>
        {experienceLevels.map((level) => (
          <DropdownMenuItem
            key={level.id}
            onClick={() => handleFilterChange("experience", level.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{level.label}</span>
            {(currentFilters.experience === level.id ||
              (currentFilters.experience === null && level.id === "all")) && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}

        {hasActiveFilters && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                onFiltersChange({ priceRange: null, experience: null })
              }
              className="text-muted-foreground cursor-pointer"
            >
              Clear all filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Función helper para filtrar freelancers basado en los filtros
export const applyVisualFilters = (
  freelancers: UnifiedFreelancer[],
  filters: IFilterOptions
) => {
  let filtered = [...freelancers];

  // Filtrar por rango de precios
  if (filters.priceRange && filters.priceRange !== "all") {
    const range = priceRanges.find((r) => r.id === filters.priceRange);
    if (range) {
      filtered = filtered.filter((freelancer) => {
        const rate = freelancer.hourlyRate || 0;
        return (
          rate >= range.min &&
          (range.max === Infinity ? true : rate <= range.max)
        );
      });
    }
  }

  // Filtrar por experiencia usando el campo experience real
  if (filters.experience && filters.experience !== "all") {
    filtered = filtered.filter((freelancer) => {
      const experience = freelancer.experience || "";
      const experienceYears = freelancer.experienceYears || 0;

      switch (filters.experience) {
        case "entry":
          return (
            experienceYears <= 2 ||
            experience.includes("0-2") ||
            experience.includes("Entry")
          );
        case "intermediate":
          return (
            (experienceYears > 2 && experienceYears <= 5) ||
            experience.includes("2-5") ||
            experience.includes("3+") ||
            experience.includes("4+") ||
            experience.includes("5+")
          );
        case "expert":
          return (
            experienceYears > 5 ||
            experience.includes("6+") ||
            experience.includes("7+") ||
            experience.includes("8+") ||
            experience.includes("10+") ||
            experience.includes("Expert")
          );
        default:
          return true;
      }
    });
  }

  return filtered;
};
