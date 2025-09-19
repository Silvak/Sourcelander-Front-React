interface IEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
  gpa?: string;
  honors?: string[];
  relevantCoursework?: string[];
  location: string;
  isCurrentlyStudying: boolean;
}

interface IEducationGeneratorParams {
  skills: string[];
  experienceYears: number;
  title: string;
}