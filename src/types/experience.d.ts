export interface IProfessionalExperience {
  position: string;
  company: string;
  period: string;
  isCurrent: boolean;
}

export interface IEducation {
  institution: string;
  area: string; // Área/Carrera
  year: string; // Año de graduación o período
  isCompleted: boolean; // Si ya se completó o está en curso
}

export interface IExperienceLevelData {
  level: string;
  minYears: number;
  maxYears: number;
  description: string;
}