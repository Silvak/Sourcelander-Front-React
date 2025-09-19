import { IEducation } from '../types';

// Instituciones educativas comunes
const INSTITUTIONS = [
  'Universidad de Buenos Aires',
  'Universidad Nacional de La Plata',
  'Universidad Tecnológica Nacional',
  'Universidad de San Andrés',
  'Instituto Tecnológico de Buenos Aires',
  'Universidad Católica Argentina',
  'Universidad del Salvador',
  'Universidad de Palermo',
  'Universidad Nacional de Córdoba',
  'Universidad Nacional del Litoral',
  'Universidad de Chile',
  'Universidad Nacional de Colombia',
  'Universidad de los Andes',
  'Universidad Javeriana',
  'Universidad Nacional Autónoma de México',
  'Instituto Tecnológico de Monterrey',
  'Universidad de São Paulo',
  'Universidade Federal do Rio de Janeiro',
  'MIT',
  'Stanford University',
  'Harvard University',
  'University of California',
  'Georgia Institute of Technology',
  'Carnegie Mellon University'
];

// Áreas de estudio por categoría
const AREAS_BY_CATEGORY = {
  'technology': [
    'Ingeniería en Sistemas',
    'Ciencias de la Computación',
    'Ingeniería Informática',
    'Desarrollo de Software',
    'Ingeniería en Telecomunicaciones',
    'Tecnología de la Información',
    'Ingeniería Electrónica',
    'Ciencia de Datos',
    'Inteligencia Artificial',
    'Ciberseguridad'
  ],
  'design': [
    'Diseño Gráfico',
    'Diseño Industrial',
    'Diseño de Comunicación Visual',
    'Diseño UX/UI',
    'Diseño Multimedia',
    'Bellas Artes',
    'Diseño Web',
    'Arquitectura',
    'Diseño de Productos',
    'Comunicación Visual'
  ],
  'business': [
    'Administración de Empresas',
    'Marketing',
    'Economía',
    'Finanzas',
    'Comercio Internacional',
    'Gestión de Proyectos',
    'Recursos Humanos',
    'Contabilidad',
    'Negocios Internacionales',
    'Emprendimiento'
  ],
  'marketing': [
    'Marketing Digital',
    'Publicidad',
    'Comunicación Social',
    'Relaciones Públicas',
    'Marketing y Ventas',
    'Comunicación Corporativa',
    'Periodismo',
    'Marketing Estratégico',
    'Branding',
    'Social Media'
  ],
  'writing': [
    'Periodismo',
    'Literatura',
    'Comunicación Social',
    'Letras',
    'Traducción',
    'Lingüística',
    'Redacción Publicitaria',
    'Comunicación Audiovisual',
    'Filología',
    'Escritura Creativa'
  ],
  'general': [
    'Ingeniería',
    'Licenciatura en Administración',
    'Psicología',
    'Derecho',
    'Medicina',
    'Arquitectura',
    'Educación',
    'Sociología',
    'Filosofía',
    'Historia'
  ]
};

/**
 * Determina la categoría educativa basada en las habilidades del freelancer
 * @param skills Array de habilidades
 * @returns Categoría educativa
 */
function determineEducationCategory(skills: string[]): keyof typeof AREAS_BY_CATEGORY {
  if (!skills || skills.length === 0) return 'general';
  
  const skillsLower = skills.map(s => s.toLowerCase());
  
  // Tecnología
  if (skillsLower.some(s => 
    ['react', 'javascript', 'python', 'java', 'node', 'typescript', 'angular', 'vue', 'php', 'c++', 'c#', 'sql', 'mongodb', 'aws', 'docker'].includes(s)
  )) {
    return 'technology';
  }
  
  // Diseño
  if (skillsLower.some(s => 
    ['figma', 'photoshop', 'illustrator', 'sketch', 'adobe', 'ui', 'ux', 'design', 'creative'].includes(s)
  )) {
    return 'design';
  }
  
  // Marketing
  if (skillsLower.some(s => 
    ['seo', 'marketing', 'social media', 'google ads', 'facebook ads', 'analytics', 'content marketing'].includes(s)
  )) {
    return 'marketing';
  }
  
  // Escritura
  if (skillsLower.some(s => 
    ['writing', 'copywriting', 'content', 'translation', 'editing', 'proofreading'].includes(s)
  )) {
    return 'writing';
  }
  
  // Negocios
  if (skillsLower.some(s => 
    ['business', 'management', 'consulting', 'finance', 'accounting', 'project management'].includes(s)
  )) {
    return 'business';
  }
  
  return 'general';
}

/**
 * Genera un array de educación aleatoria
 * @param count Número de educaciones a generar
 * @param skills Habilidades del freelancer para determinar el área
 * @returns Array de educación
 */
export function generateEducation(
  count: number = 2,
  skills: string[] = []
): IEducation[] {
  const educations: IEducation[] = [];
  const category = determineEducationCategory(skills);
  const areas = AREAS_BY_CATEGORY[category];
  
  const currentYear = new Date().getFullYear();
  const usedInstitutions = new Set<string>();
  const usedAreas = new Set<string>();
  
  for (let i = 0; i < count; i++) {
    // Seleccionar institución que no se haya usado
    let institution: string;
    do {
      institution = INSTITUTIONS[Math.floor(Math.random() * INSTITUTIONS.length)];
    } while (usedInstitutions.has(institution) && usedInstitutions.size < INSTITUTIONS.length);
    usedInstitutions.add(institution);
    
    // Seleccionar área que no se haya usado
    let area: string;
    do {
      area = areas[Math.floor(Math.random() * areas.length)];
    } while (usedAreas.has(area) && usedAreas.size < areas.length);
    usedAreas.add(area);
    
    // Determinar año de graduación
    const yearsAgo = Math.floor(Math.random() * 15) + 1; // Entre 1 y 15 años atrás
    const graduationYear = currentYear - yearsAgo;
    
    // Determinar si está completado (90% de probabilidad de estar completado)
    const isCompleted = Math.random() > 0.1;
    
    // Formato del año
    let yearDisplay: string;
    if (isCompleted) {
      yearDisplay = graduationYear.toString();
    } else {
      const startYear = graduationYear - Math.floor(Math.random() * 3) - 1; // Empezó 1-4 años antes
      yearDisplay = `${startYear} - En curso`;
    }
    
    educations.push({
      institution,
      area,
      year: yearDisplay,
      isCompleted
    });
  }
  
  // Ordenar por año (más reciente primero)
  return educations.sort((a, b) => {
    const yearA = parseInt(a.year.split(' ')[0]);
    const yearB = parseInt(b.year.split(' ')[0]);
    return yearB - yearA;
  });
}

/**
 * Genera educación para un freelancer específico
 * @param freelancerData Datos del freelancer
 * @returns Array de educación
 */
export function generateFreelancerEducation(freelancerData: {
  skills?: string[];
  experienceYears?: number;
  title?: string;
}): IEducation[] {
  const {
    skills = [],
    experienceYears = 5
  } = freelancerData;
  
  // Determinar número de educaciones basado en experiencia
  let educationCount = 1;
  if (experienceYears >= 8) {
    educationCount = Math.random() > 0.3 ? 2 : 1; // 70% probabilidad de tener 2 educaciones
  }
  if (experienceYears >= 12) {
    educationCount = Math.random() > 0.5 ? 3 : 2; // 50% probabilidad de tener 3 educaciones
  }
  
  return generateEducation(educationCount, skills);
}

/**
 * Valida si una educación es válida
 * @param education Educación a validar
 * @returns true si es válida
 */
export function validateEducation(education: IEducation): boolean {
  return !!(education.institution && education.area && education.year);
}

/**
 * Obtiene un resumen de la educación
 * @param educations Array de educaciones
 * @returns Resumen de la educación
 */
export function getEducationSummary(educations: IEducation[]) {
  const totalEducations = educations.length;
  const completedEducations = educations.filter(edu => edu.isCompleted).length;
  const inProgressEducations = educations.filter(edu => !edu.isCompleted).length;
  const institutions = educations.map(edu => edu.institution);
  const areas = educations.map(edu => edu.area);
  
  return {
    totalEducations,
    completedEducations,
    inProgressEducations,
    institutions: [...new Set(institutions)],
    areas: [...new Set(areas)],
    hasInProgressEducation: inProgressEducations > 0
  };
}