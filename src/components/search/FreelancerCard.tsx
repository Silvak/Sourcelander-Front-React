import { Star, MapPin, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UnifiedFreelancer } from "@/interfaces";
import AddToCartButton from "./AddToCartButton";

interface FreelancerCardProps {
  freelancer: UnifiedFreelancer;
  onViewProfile: (id: string) => void;
}

export default function FreelancerCard({
  freelancer,
  onViewProfile,
}: FreelancerCardProps) {
  // Fallbacks para campos potencialmente undefined
  const name = freelancer.name ?? "N/A";
  const avatar = freelancer.avatar ?? freelancer.imageUrl ?? "";
  const title = freelancer.title ?? freelancer.speciality ?? "Freelancer";
  const location = freelancer.location ?? "N/A";
  const rating = freelancer.rating ?? "N/A";
  const reviews = freelancer.reviews ?? "N/A";
  const hourlyRate = freelancer.hourlyRate ?? freelancer.payRate ?? "N/A";
  const availability = freelancer.availability ?? "N/A";
  const skills = freelancer.skills ?? [];
  const id =
    freelancer.id || `freelancer-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <Card className="hover:border-primary transition-all rounded-[0px] duration-200 h-full flex flex-col group cursor-pointer">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Header con avatar y información principal */}
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-16 w-16 flex-shrink-0 border-2 border-muted group-hover:border-primary/20 transition-colors">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-lg font-semibold bg-primary/10">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            {/* Nombre y verificación */}
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg leading-tight text-foreground">
                {name}
              </h3>
              {freelancer.verified && (
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
              )}
              {/* Indicador de datos mockeados */}
              {id && id.startsWith("MOCK-") && (
                <Badge
                  variant="outline"
                  className="text-xs bg-orange-50 text-orange-700 border-orange-200"
                >
                  MOCK
                </Badge>
              )}
            </div>

            {/* Título */}
            <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
              {title}
            </p>

            {/* Ubicación */}
            <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>

            {/* Rating y reviews */}
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground">({reviews} reviews)</span>
            </div>
          </div>

          {/* Precio y disponibilidad */}
          <div className="text-right flex-shrink-0">
            <div className="text-xl font-bold text-primary">
              ${hourlyRate}/hr
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{availability}</span>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-6 flex-1">
          <p
            className="text-sm text-muted-foreground leading-relaxed"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            Experienced {title?.toLowerCase?.() ?? "freelancer"} with {reviews}+
            successful projects. Specialized in {skills.slice(0, 2).join(", ")}{" "}
            and delivering high-quality results.
          </p>
        </div>

        {/* Skills section */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs hover:bg-secondary/80 transition-colors"
              >
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                +{skills.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Button fijo en la parte inferior */}
        <div className="mt-auto pt-4 border-t border-muted/20">
          <div className="flex flex-col  items-center gap-2">
            <Button
              onClick={() => onViewProfile(id)}
              className="w-full group-hover:bg-primary/90 transition-colors"
            >
              View Profile
            </Button>
            <AddToCartButton freelancer={freelancer} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
