import { IProfessionalExperience, IExperienceLevelData } from '../types';
import { getRandomCompanies } from '../lib/mockCompanies';

// Niveles de experiencia disponibles
const EXPERIENCE_LEVELS: IExperienceLevelData[] = [
  {
    level: 'Junior',
    minYears: 0,
    maxYears: 2,
    description: 'Desarrollador con poca experiencia, ideal para proyectos simples'
  },
  {
    level: 'Mid-level',
    minYears: 3,
    maxYears: 5,
    description: 'Desarrollador con experiencia intermedia, puede manejar proyectos complejos'
  },
  {
    level: 'Senior',
    minYears: 6,
    maxYears: 10,
    description: 'Desarrollador experimentado, líder técnico en proyectos complejos'
  },
  {
    level: 'Expert',
    minYears: 11,
    maxYears: 20,
    description: 'Experto con amplia experiencia, arquitecto de soluciones'
  }
];

// Posiciones comunes por nivel de experiencia
const POSITIONS_BY_LEVEL = {
  'Junior': [
    'Junior Developer',
    'Frontend Developer',
    'Backend Developer',
    'Junior Software Engineer',
    'Web Developer',
    'Mobile Developer'
  ],
  'Mid-level': [
    'Software Engineer',
    'Full Stack Developer',
    'Senior Frontend Developer',
    'Senior Backend Developer',
    'DevOps Engineer',
    'Mobile App Developer'
  ],
  'Senior': [
    'Senior Software Engineer',
    'Lead Developer',
    'Technical Lead',
    'Senior Full Stack Developer',
    'Principal Engineer',
    'Software Architect'
  ],
  'Expert': [
    'Principal Software Engineer',
    'Software Architect',
    'Technical Director',
    'Engineering Manager',
    'CTO',
    'Senior Architect'
  ]
};

/**
 * Genera un array de experiencias profesionales aleatorias
 * @param count Número de experiencias a generar
 * @param experienceYears Años totales de experiencia
 * @returns Array de experiencias profesionales
 */
export function generateProfessionalExperience(
  count: number = 3,
  experienceYears: number = 5
): IProfessionalExperience[] {
  const experiences: IProfessionalExperience[] = [];
  const companies = getRandomCompanies(count);
  
  let remainingYears = experienceYears;
  const currentYear = new Date().getFullYear();
  
  for (let i = 0; i < count && remainingYears > 0; i++) {
    const yearsInCompany = Math.min(
      Math.max(1, Math.floor(remainingYears / (count - i))),
      remainingYears
    );
    
    const endYear = i === 0 ? currentYear : currentYear - (experienceYears - remainingYears);
    const startYear = endYear - yearsInCompany;
    
    const experienceLevel = getExperienceLevel(remainingYears);
    const position = getPrimaryPosition([], experienceLevel);
    
    experiences.push({
      position,
      company: companies[i].company,
      period: `${startYear} - ${i === 0 ? 'Present' : endYear}`,
      isCurrent: i === 0
    });
    
    remainingYears -= yearsInCompany;
  }
  
  return experiences;
}

/**
 * Obtiene el nivel de experiencia basado en los años
 * @param years Años de experiencia
 * @returns Datos del nivel de experiencia
 */
export function getExperienceLevel(years: number): IExperienceLevelData {
  return EXPERIENCE_LEVELS.find(level => 
    years >= level.minYears && years <= level.maxYears
  ) || EXPERIENCE_LEVELS[EXPERIENCE_LEVELS.length - 1];
}

/**
 * Obtiene una posición principal basada en skills y nivel de experiencia
 * @param skills Array de habilidades
 * @param experienceLevel Nivel de experiencia
 * @returns Posición profesional
 */
function getPrimaryPosition(skills: string[], experienceLevel: IExperienceLevelData): string {
  const positions = POSITIONS_BY_LEVEL[experienceLevel.level as keyof typeof POSITIONS_BY_LEVEL] || POSITIONS_BY_LEVEL['Mid-level'];
  
  // Si hay skills específicos, intentar matchear con posiciones relevantes
  if (skills.length > 0) {
    const skillLower = skills.map(s => s.toLowerCase());
    
    if (skillLower.some(s => ['react', 'vue', 'angular', 'frontend'].includes(s))) {
      return positions.find(p => p.toLowerCase().includes('frontend')) || positions[0];
    }
    
    if (skillLower.some(s => ['node', 'python', 'java', 'backend'].includes(s))) {
      return positions.find(p => p.toLowerCase().includes('backend')) || positions[0];
    }
    
    if (skillLower.some(s => ['react native', 'ios', 'android', 'mobile'].includes(s))) {
      return positions.find(p => p.toLowerCase().includes('mobile')) || positions[0];
    }
    
    if (skillLower.some(s => ['devops', 'aws', 'docker', 'kubernetes'].includes(s))) {
      return positions.find(p => p.toLowerCase().includes('devops')) || positions[0];
    }
  }
  
  // Retornar posición aleatoria del nivel
  return positions[Math.floor(Math.random() * positions.length)];
}

/**
 * Genera experiencia profesional para un freelancer específico
 * @param freelancerData Datos del freelancer
 * @returns Array de experiencias profesionales
 */
export function generateFreelancerExperience(freelancerData: {
  skills?: string[];
  experienceYears?: number;
  title?: string;
}): IProfessionalExperience[] {
  const {
    skills = [],
    experienceYears = Math.floor(Math.random() * 10) + 1,
    title
  } = freelancerData;
  
  const experienceCount = Math.min(Math.max(2, Math.floor(experienceYears / 2)), 5);
  
  return generateProfessionalExperience(experienceCount, experienceYears);
}

/**
 * Actualiza la experiencia profesional de un freelancer existente
 * @param currentExperience Experiencia actual
 * @param newExperienceYears Nuevos años de experiencia
 * @returns Experiencia actualizada
 */
export function updateProfessionalExperience(
  currentExperience: IProfessionalExperience[],
  newExperienceYears: number
): IProfessionalExperience[] {
  if (currentExperience.length === 0) {
    return generateProfessionalExperience(3, newExperienceYears);
  }
  
  // Mantener la experiencia existente pero ajustar si es necesario
  return currentExperience.map((exp, index) => ({
    ...exp,
    isCurrent: index === 0
  }));
}

/**
 * Valida si una experiencia profesional es válida
 * @param experience Experiencia a validar
 * @returns true si es válida
 */
export function validateProfessionalExperience(experience: IProfessionalExperience): boolean {
  return !!(experience.position && experience.company && experience.period);
}

/**
 * Obtiene un resumen de la experiencia profesional
 * @param experiences Array de experiencias
 * @returns Resumen de la experiencia
 */
export function getExperienceSummary(experiences: IProfessionalExperience[]) {
  const totalExperiences = experiences.length;
  const currentJob = experiences.find(exp => exp.isCurrent);
  const companies = experiences.map(exp => exp.company);
  
  return {
    totalExperiences,
    currentJob: currentJob?.position || 'No current position',
    currentCompany: currentJob?.company || 'No current company',
    companies: [...new Set(companies)],
    hasCurrentJob: !!currentJob
  };
}