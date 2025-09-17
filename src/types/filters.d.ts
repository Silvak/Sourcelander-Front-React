interface IFilterOptions {
  priceRange: string | null;
  experience: string | null;
  availability: string | null;
}

interface IPriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

interface IExperienceLevel {
  id: string;
  label: string;
}

interface IAvailabilityOption {
  id: string;
  label: string;
}