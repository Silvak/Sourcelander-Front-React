// Array de 100 empresas mockeadas para experiencia profesional
export const mockCompanies = [
  "TechCorp Solutions",
  "Digital Innovations Inc",
  "Global Systems Ltd",
  "NextGen Technologies",
  "CloudFirst Solutions",
  "DataDriven Analytics",
  "SmartCode Studios",
  "WebCraft Agency",
  "PixelPerfect Design",
  "CodeMasters Inc",
  "InnovateTech Group",
  "FutureSoft Solutions",
  "AgileWorks Studio",
  "DevOps Dynamics",
  "CyberSecure Systems",
  "MobileFirst Apps",
  "CloudNative Solutions",
  "AITech Innovations",
  "BlockChain Ventures",
  "QuantumCode Labs",
  "StartupHub Incubator",
  "FinTech Solutions",
  "HealthTech Systems",
  "EduTech Platforms",
  "GreenTech Innovations",
  "RetailTech Solutions",
  "LogisticsTech Corp",
  "TravelTech Systems",
  "FoodTech Ventures",
  "SportsTech Solutions",
  "MediaTech Studios",
  "GameDev Studios",
  "VRTech Innovations",
  "ARSolutions Inc",
  "IoTech Systems",
  "RoboTech Solutions",
  "AutoTech Innovations",
  "AeroTech Systems",
  "SpaceTech Ventures",
  "BioTech Solutions",
  "NanoTech Labs",
  "EnergyTech Corp",
  "CleanTech Solutions",
  "WaterTech Systems",
  "AgriTech Innovations",
  "FashionTech Studios",
  "BeautyTech Solutions",
  "PetTech Ventures",
  "ElderTech Systems",
  "KidsTech Solutions",
  "HomeTech Innovations",
  "OfficeSpace Solutions",
  "CoWorking Systems",
  "RemoteWork Tech",
  "FreelanceTech Hub",
  "ConsultingTech Pro",
  "MarketingTech Solutions",
  "SalesTech Systems",
  "CRMTech Innovations",
  "ERPSolutions Corp",
  "HRTech Systems",
  "PayrollTech Solutions",
  "AccountingTech Pro",
  "LegalTech Innovations",
  "InsureTech Solutions",
  "RealEstate Tech",
  "PropTech Ventures",
  "ConstructionTech Corp",
  "ArchTech Solutions",
  "DesignTech Studios",
  "CreativeTech Hub",
  "ContentTech Solutions",
  "SocialTech Platforms",
  "CommunityTech Systems",
  "EventTech Solutions",
  "ConferenceTech Pro",
  "WebinarTech Systems",
  "StreamTech Solutions",
  "PodcastTech Studios",
  "VideoTech Innovations",
  "PhotoTech Solutions",
  "GraphicsTech Pro",
  "AnimationTech Studios",
  "3DTech Innovations",
  "PrintTech Solutions",
  "PackagingTech Corp",
  "BrandTech Studios",
  "AdvertisingTech Pro",
  "PRTech Solutions",
  "EventsTech Systems",
  "TourismTech Ventures",
  "HospitalityTech Corp",
  "RestaurantTech Solutions",
  "CateringTech Systems",
  "DeliveryTech Innovations",
  "TransportTech Solutions",
  "MobilityTech Corp",
  "UrbanTech Systems",
  "SmartCity Solutions",
  "GovTech Innovations",
  "CivicTech Platforms",
  "NonProfitTech Solutions",
  "CharityTech Systems",
  "VolunteerTech Hub",
  "CommunityTech Pro",
  "LocalTech Solutions"
];

// Función para obtener empresas aleatorias con experiencia profesional
export const getRandomCompanies = (count: number = 3) => {
  const shuffled = [...mockCompanies].sort(() => 0.5 - Math.random());
  const selectedCompanies = shuffled.slice(0, count);
  
  return selectedCompanies.map((company, index) => {
    const currentYear = new Date().getFullYear();
    const yearsAgo = Math.floor(Math.random() * 8) + 1; // 1-8 años atrás
    const duration = Math.floor(Math.random() * 3) + 1; // 1-3 años de duración
    const startYear = currentYear - yearsAgo;
    const endYear = index === 0 ? currentYear : startYear + duration;
    
    // Generar posiciones realistas
    const positions = [
      'Frontend Developer',
      'Backend Developer', 
      'Full Stack Developer',
      'Senior Developer',
      'Lead Developer',
      'Software Engineer',
      'Senior Software Engineer',
      'Tech Lead',
      'UI/UX Designer',
      'Product Designer',
      'DevOps Engineer',
      'Data Analyst',
      'Project Manager'
    ];
    
    return {
      position: positions[Math.floor(Math.random() * positions.length)],
      company,
      period: index === 0 ? `${endYear} - Present` : `${startYear} - ${endYear}`,
      isCurrent: index === 0
    };
  });
};

// Función para obtener una empresa aleatoria
export const getRandomCompany = (): string => {
  return mockCompanies[Math.floor(Math.random() * mockCompanies.length)];
};