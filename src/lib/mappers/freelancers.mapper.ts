import {
  HubstaffFreelancer,
  UnifiedFreelancer,
  WorkanaFreelancer,
} from "@/interfaces";

const sanitizeString = (str?: string, fallback = "N/A"): string =>
  str && str.trim() !== "" ? str.trim() : fallback;

const sanitizeImage = (url?: string): string =>
  url || "https://placehold.co/150x150";

const sanitizeNumber = (value: any, fallback = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

const extractHourlyRate = (rate?: string): number =>
  parseFloat(rate?.replace(/[^0-9.]/g, "") || "") || 25;

const getRandomRating = (min = 4, max = 5): number =>
  Math.round((Math.random() * (max - min) + min) * 10) / 10;

const getRandomReviews = (min = 10, max = 150): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const mapHubstaffFreelancer = (
  f: HubstaffFreelancer,
): UnifiedFreelancer => {
  const hourlyRate = extractHourlyRate(f.payRate);
  const rating = sanitizeNumber(f.rating, 0) || getRandomRating();
  const reviews = sanitizeNumber(f.reviews, 0) || getRandomReviews();

  return {
    id: f.id || f.name.replace(/\s+/g, "-").toLowerCase(),
    name: sanitizeString(f.name),
    title: sanitizeString(f.speciality || f.title, "Untitled"),
    description: sanitizeString(f.bio, "No description provided."),
    skills: f.skills || [],
    hourlyRate,
    rating,
    reviews,
    avatar: sanitizeImage(f.imageUrl),
    imageUrl: sanitizeImage(f.imageUrl),
    location: sanitizeString(f.location?.split(",")[0], "Unknown"),
    profileUrl: f.profileUrl || "#",
    payRate: `$${hourlyRate}/hr`,
  };
};

export const mapWorkanaFreelancer = (
  freelancer: WorkanaFreelancer,
): UnifiedFreelancer => {
  const hourlyRate = extractHourlyRate(freelancer.hourlyRate);
  const rating = sanitizeNumber(freelancer.rating, 0) || getRandomRating();
  const reviews = sanitizeNumber(freelancer.reviews, 0) || getRandomReviews();
  return {
    id: freelancer.id || freelancer.name.replace(/\s+/g, "-").toLowerCase(),
    name: sanitizeString(freelancer.name),
    title: sanitizeString(
      freelancer.title || freelancer.speciality,
      "Untitled",
    ),
    description: sanitizeString(
      freelancer.description,
      "No description provided.",
    ),
    skills: freelancer.skills || [],
    hourlyRate,
    rating,
    reviews,
    avatar: sanitizeImage(freelancer.profileImageUrl),
    imageUrl: sanitizeImage(freelancer.profileImageUrl),
    location: sanitizeString(freelancer.country, "Unknown"),
    profileUrl: freelancer.profileUrl || "#",
    payRate: `$${hourlyRate}/hr`,
  };
};
