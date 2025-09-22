"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FreelancerCard from "./FreelancerCard";
import { UnifiedFreelancer } from "@/interfaces";

interface RecommendedFreelancersCarouselProps {
  freelancers: UnifiedFreelancer[];
  onViewProfile: (id: string) => void;
  searchTerm?: string;
}

export default function RecommendedFreelancersCarousel({
  freelancers,
  onViewProfile,
  searchTerm = "",
}: RecommendedFreelancersCarouselProps) {
  // Freelancers aleatorios estables para cuando no hay coincidencias
  const stableRandomFreelancers = useMemo(() => {
    const shuffled = [...freelancers].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [freelancers]);

  // Filtrar freelancers basado en el término de búsqueda
  const { filtered, hasRealMatches } = useMemo(() => {
    if (!searchTerm.trim())
      return { filtered: freelancers, hasRealMatches: true };

    const q = searchTerm.toLowerCase().trim();
    const found = freelancers.filter((f) =>
      (f.skills || []).some((s) => {
        const sl = s.toLowerCase();
        return sl === q || sl.startsWith(q);
      })
    );

    if (found.length === 0)
      return { filtered: stableRandomFreelancers, hasRealMatches: false };

    return { filtered: found, hasRealMatches: true };
  }, [freelancers, searchTerm, stableRandomFreelancers]);

  // Hook para manejar el tamaño de pantalla y cards por vista
  const useResponsiveCards = () => {
    const [cardsPerView, setCardsPerView] = useState(1);

    useEffect(() => {
      const updateCardsPerView = () => {
        if (typeof window === "undefined") return;

        const width = window.innerWidth;
        if (width >= 1280) {
          setCardsPerView(3); // xl: 3 cards
        } else if (width >= 1024) {
          setCardsPerView(2); // lg: 2 cards
        } else if (width >= 768) {
          setCardsPerView(2); // md: 2 cards
        } else {
          setCardsPerView(1); // sm: 1 card
        }
      };

      updateCardsPerView();
      window.addEventListener("resize", updateCardsPerView);
      return () => window.removeEventListener("resize", updateCardsPerView);
    }, []);

    return cardsPerView;
  };

  const cardsPerView = useResponsiveCards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll logic
  const autoScroll = useCallback(() => {
    setCurrentIndex((prev) => {
      if (filtered.length <= cardsPerView) return 0;
      const maxIdx = filtered.length - cardsPerView;
      return prev >= maxIdx ? 0 : prev + 1;
    });
  }, [filtered.length, cardsPerView]);

  // Configurar auto-scroll
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (filtered.length > cardsPerView) {
      intervalRef.current = setInterval(autoScroll, 10000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [filtered.length, cardsPerView, autoScroll]);

  // Reset index cuando cambian los freelancers filtrados
  useEffect(() => {
    setCurrentIndex(0);
  }, [filtered.length]);

  const maxIndex = Math.max(0, filtered.length - cardsPerView);

  // Función para reiniciar el auto-scroll
  const restartAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (filtered.length > cardsPerView) {
      intervalRef.current = setInterval(autoScroll, 10000);
    }
  }, [filtered.length, cardsPerView, autoScroll]);

  // Funciones de navegación
  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    restartAutoScroll();
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    restartAutoScroll();
  };

  const goTo = (i: number) => {
    setCurrentIndex(Math.min(i, maxIndex));
    restartAutoScroll();
  };

  // Obtener items visibles basado en el índice actual
  const visibleItems = useMemo(() => {
    if (filtered.length === 0) return [];
    return filtered.slice(currentIndex, currentIndex + cardsPerView);
  }, [filtered, currentIndex, cardsPerView]);

  // Clases CSS responsivas para el grid
  const getGridClasses = () => {
    return "grid gap-6 w-full";
  };

  const getGridColsClass = () => {
    if (cardsPerView === 3) return "grid-cols-3";
    if (cardsPerView === 2) return "grid-cols-2";
    return "grid-cols-1";
  };

  return (
    <section className="mb-16 mx-auto">
      {/* Header */}
      <header className="w-full h-28 flex flex-col justify-center items-center text-center ">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Recommended Freelancers
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl">
          {hasRealMatches
            ? "Discover top-rated freelancers handpicked for your projects"
            : "You might also be interested in"}
        </p>
      </header>

      {/* Carousel Container */}
      <div className="relative w-full h-[520px] md:h-[480px] lg:h-[550px]">
        {/* Navigation Buttons */}
        {filtered.length > cardsPerView && (
          <>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-background">
              <Button
                size="icon"
                variant="outline"
                onClick={prev}
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-background">
              <Button
                size="icon"
                variant="outline"
                onClick={next}
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {/* Cards Grid */}
        <div className="w-full h-full flex items-center justify-center">
          <div
            className={`${getGridClasses()} ${getGridColsClass()} w-full max-w-full`}
          >
            {visibleItems.map((freelancer, idx) => (
              <div
                key={freelancer.id || `freelancer-${idx}`}
                className="w-full h-full"
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
      </div>

      {/* Footer con paginación */}
      <footer
        className="w-full h-20 flex flex-col justify-center px-4 md:px-8"
        style={{ marginTop: `calc(2rem + 1vh)` }}
      >
        <div className="flex justify-center items-center gap-4 py-2 flex-wrap">
          {filtered.length > cardsPerView ? (
            Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`transition-all duration-200 rounded-full ${
                  i === currentIndex
                    ? "w-8 h-2 bg-primary shadow-md"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))
          ) : (
            <div className="w-8 h-2 bg-gray-100 rounded" />
          )}
        </div>

        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5">
            <span className="text-sm font-semibold text-primary">
              {Math.min(currentIndex + 1, maxIndex + 1)}
            </span>
            <span className="text-xs text-gray-400">de</span>
            <span className="text-sm font-medium text-gray-600">
              {Math.max(1, maxIndex + 1)}
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
