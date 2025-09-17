"use client";

import { useState, useEffect } from "react";
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

  // Auto-scroll every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, cardsPerView, freelancers.length]);

  const maxIndex = Math.max(0, freelancers.length - cardsPerView);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(Math.min(index, maxIndex));
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

        {/* Paginación con números */}
        {freelancers.length > cardsPerView && (
          <div className="flex justify-center mt-12 gap-1">
            {/* Botón anterior */}
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="px-3 py-1 text-sm"
            >
              ‹
            </Button>

            {/* Números de página */}
            {(() => {
              const totalPages = maxIndex + 1;
              const currentPage = currentIndex + 1;
              const pages = [];

              if (totalPages <= 7) {
                // Mostrar todas las páginas si son pocas
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                // Lógica de elipsis para muchas páginas
                if (currentPage <= 4) {
                  pages.push(1, 2, 3, 4, 5, "...", totalPages);
                } else if (currentPage >= totalPages - 3) {
                  pages.push(
                    1,
                    "...",
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                  );
                } else {
                  pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages,
                  );
                }
              }

              return pages.map((page, idx) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-3 py-1 text-sm text-gray-500"
                    >
                      ...
                    </span>
                  );
                }

                const pageNumber = page as number;
                const isActive = pageNumber === currentPage;

                return (
                  <Button
                    key={pageNumber}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToSlide(pageNumber - 1)}
                    className={`px-3 py-1 text-sm ${
                      isActive ? "bg-primary text-white" : "hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </Button>
                );
              });
            })()}

            {/* Botón siguiente */}
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="px-3 py-1 text-sm"
            >
              ›
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
