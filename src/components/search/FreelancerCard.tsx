import { Star, MapPin, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FreelancerCardProps {
  freelancer: {
    id: number;
    name: string;
    title: string;
    avatar: string;
    rating: number;
    reviews: number;
    hourlyRate: number;
    skills: string[];
    location: string;
    availability: string;
    verified: boolean;
  };
  onViewProfile: (id: number) => void;
}

export default function FreelancerCard({
  freelancer,
  onViewProfile,
}: FreelancerCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Header con avatar, nombre y precio */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16 flex-shrink-0">
            <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
            <AvatarFallback>
              {freelancer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            {/* Nombre y verificación */}
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg leading-tight">
                {freelancer.name}
              </h3>
              {freelancer.verified && (
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
              )}
            </div>

            {/* Título */}
            <p className="text-muted-foreground text-sm mb-3 leading-relaxed overflow-hidden text-ellipsis whitespace-nowrap">
              {freelancer.title}
            </p>

            {/* Ubicación */}
            <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {freelancer.location}
              </span>
            </div>

            {/* Rating y reviews */}
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{freelancer.rating}</span>
              <span className="text-muted-foreground">
                ({freelancer.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Precio y disponibilidad */}
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-semibold">
              ${freelancer.hourlyRate}/hr
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{freelancer.availability}</span>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <p
            className="text-sm text-muted-foreground leading-relaxed"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            Experienced {freelancer.title.toLowerCase()} with{" "}
            {freelancer.reviews}+ successful projects. Specialized in{" "}
            {freelancer.skills.slice(0, 2).join(", ")} and delivering
            high-quality results.
          </p>
        </div>

        {/* Skills section */}
        <div className="mb-4 flex-1">
          <div className="flex flex-wrap gap-2">
            {freelancer.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {freelancer.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{freelancer.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Button fijo en la parte inferior */}
        <div className="mt-auto pt-4">
          <Button
            onClick={() => onViewProfile(freelancer.id)}
            className="w-full"
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
