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
  const stableRandomFreelancers = useMemo(() => {
    const shuffled = [...freelancers].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [freelancers]);

  const { filtered, hasRealMatches } = useMemo(() => {
    if (!searchTerm.trim())
      return { filtered: freelancers, hasRealMatches: true };
    const q = searchTerm.toLowerCase().trim();
    const found = freelancers.filter((f) =>
      (f.skills || []).some((s) => {
        const sl = s.toLowerCase();
        return sl === q || sl.startsWith(q);
      }),
    );
    if (found.length === 0)
      return { filtered: stableRandomFreelancers, hasRealMatches: false };
    return { filtered: found, hasRealMatches: true };
  }, [freelancers, searchTerm, stableRandomFreelancers]);

  const getCardsPerView = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);
  useEffect(() => {
    const onResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const autoScroll = useCallback(() => {
    setCurrentIndex((prev) => {
      if (filtered.length <= cardsPerView) return 0;
      const maxIdx = filtered.length - cardsPerView;
      return prev >= maxIdx ? 0 : prev + 1;
    });
  }, [filtered.length, cardsPerView]);

  useEffect(() => {
    // Limpiar intervalo existente
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Configurar nuevo intervalo solo si hay más items que cards por vista
    if (filtered.length > cardsPerView) {
      intervalRef.current = setInterval(autoScroll, 10000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [filtered.length, cardsPerView, autoScroll]);

  useEffect(() => setCurrentIndex(0), [filtered.length]);

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

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    restartAutoScroll(); // Reinicia el auto-scroll
  };
  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    restartAutoScroll(); // Reinicia el auto-scroll
  };
  const goTo = (i: number) => {
    setCurrentIndex(Math.min(i, maxIndex));
    restartAutoScroll(); // Reinicia el auto-scroll
  };

  const visibleItems = useMemo(() => {
    const len = filtered.length;
    if (len === 0) return Array.from({ length: cardsPerView }).map(() => null);
    const result: (UnifiedFreelancer | null)[] = [];
    for (let i = 0; i < cardsPerView; i++) {
      const idx = (currentIndex + i) % len;
      result.push(filtered[idx] ?? null);
    }
    return result;
  }, [filtered, currentIndex, cardsPerView]);

  const viewportHeightClass = "h-[520px] md:h-[480px] lg:h-[550px]";
  const headerHeightClass = "h-28";
  const footerHeightClass = "h-20";

  return (
    <section className="mb-16 max-w-[90vw] mx-auto">
      <header
        className={`w-full ${headerHeightClass} flex flex-col justify-center items-center text-center px-4 md:px-8 mb-8 sm:mb-4`}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Recommended Freelancers
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl">
          {hasRealMatches
            ? "Discover top-rated freelancers handpicked for your projects"
            : "You might also be interested in"}
        </p>
      </header>

      <div className={`relative w-full ${viewportHeightClass} px-4 md:px-8`}>
        {filtered.length > cardsPerView && (
          <>
            <div className="absolute -left-3 md:left-3 top-1/2 -translate-y-1/2 z-20">
              <Button
                size="icon"
                variant="outline"
                onClick={prev}
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute -right-3 md:right-3 top-1/2 -translate-y-1/2 z-20">
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

        <div className="w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            {visibleItems.map((item, idx) => {
              const key = item
                ? item.id ?? `item-${idx}-${currentIndex}`
                : `placeholder-${idx}-${currentIndex}`;
              return (
                <div key={key} className="h-full">
                  {item ? (
                    <FreelancerCard
                      freelancer={item}
                      onViewProfile={onViewProfile}
                      priceFormat="hourly"
                      hideAvailability={true}
                    />
                  ) : (
                    <div className="h-full bg-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <footer
        className={`w-full ${footerHeightClass} flex flex-col justify-center px-4 md:px-8`}
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
