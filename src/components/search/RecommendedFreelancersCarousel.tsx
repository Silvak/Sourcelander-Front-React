"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FreelancerCard from "./FreelancerCard";
import { UnifiedFreelancer } from "@/interfaces";

interface RecommendedFreelancersCarouselProps {
  freelancers: UnifiedFreelancer[];
  onViewProfile: (id: string) => void;
}

export default function RecommendedFreelancersCarousel({
  freelancers,
  onViewProfile,
}: RecommendedFreelancersCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Número de cards visibles por dispositivo - igual que el grid de resultados
  const getCardsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3; // lg: 3 cards
      if (window.innerWidth >= 768) return 2; // md: 2 cards
      return 1; // sm: 1 card
    }
    return 3; // default
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);

  // Actualizar cardsPerView en resize
  useEffect(() => {
    const handleResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll function
  const autoScroll = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIdx = Math.max(0, freelancers.length - cardsPerView);
      return prev >= maxIdx ? 0 : prev + 1;
    });
  }, [freelancers.length, cardsPerView]);

  // Function to restart auto-scroll timer
  const restartAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (freelancers.length > cardsPerView) {
      intervalRef.current = setInterval(autoScroll, 10000);
    }
  }, [autoScroll, freelancers.length, cardsPerView]);

  // Auto-scroll every 10 seconds
  useEffect(() => {
    if (freelancers.length <= cardsPerView) return; // No auto-scroll si no hay suficientes elementos
    
    intervalRef.current = setInterval(autoScroll, 10000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoScroll, freelancers.length, cardsPerView]);

  const maxIndex = Math.max(0, freelancers.length - cardsPerView);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    restartAutoScroll(); // Reiniciar auto-scroll
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    restartAutoScroll(); // Reiniciar auto-scroll
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(Math.min(index, maxIndex));
    restartAutoScroll(); // Reiniciar auto-scroll
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleViewProfile = (id: string) => {
    // Aquí puedes implementar la lógica para abrir el modal del freelancer
    console.log("View profile:", id);
  };

  if (freelancers.length === 0) return null;

  return (
    <section className="mb-16 animate-slideIn">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Recommended Freelancers
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover top-rated freelancers handpicked for your projects
        </p>
      </div>

      <div className="relative">
        {/* Botones de navegación */}
        {freelancers.length > cardsPerView && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50"
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Grid de freelancers - contenido limitado al ancho del contenedor */}
        <div className="px-8">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full transition-all duration-500 ease-in-out ${
              isTransitioning
                ? "opacity-75 scale-[0.98]"
                : "opacity-100 scale-100"
            }`}
            style={{
              transform: "translateX(0)",
            }}
          >
            {freelancers
              .slice(currentIndex, currentIndex + cardsPerView)
              .map((freelancer, index) => (
                <div
                  key={freelancer.id}
                  className="animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <FreelancerCard
                    freelancer={freelancer}
                    onViewProfile={onViewProfile}
                    priceFormat="hourly"
                    hideAvailability={true}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Contenedor fijo para indicadores de navegación */}
        <div className="mt-8 sm:mt-12 h-16 flex flex-col justify-center">
          {freelancers.length > cardsPerView ? (
            <>
              {/* Indicadores de puntos */}
              <div className="flex justify-center items-center gap-4 py-4">
                {Array.from({ length: maxIndex + 1 }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`
                      transition-all duration-300 rounded-full
                      ${
                        index === currentIndex
                          ? "w-8 h-2 bg-primary shadow-md"
                          : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                      }
                    `}
                    aria-label={`Ir a la página ${index + 1}`}
                  />
                ))}
              </div>

              {/* Contador de páginas */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-transparent">
                  <span className="text-sm font-semibold text-primary">
                    {currentIndex + 1}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">de</span>
                  <span className="text-sm font-medium text-gray-600">
                    {maxIndex + 1}
                  </span>
                </div>
              </div>
            </>
          ) : (
            /* Espacio vacío para mantener la altura cuando no hay paginación */
            <div className="h-full"></div>
          )}
        </div>
      </div>
    </section>
  );
}
