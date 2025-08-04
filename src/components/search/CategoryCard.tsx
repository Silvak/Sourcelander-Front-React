import { popularCategories } from "@/lib/searchData";

interface CategoryCardProps {
  category: (typeof popularCategories)[0];
  onClick: (categoryId: string) => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={() => onClick(category.id)}
      className="bg-white group p-6 border hover:border-primary transition-all duration-200 text-left w-full"
    >
      <div className="flex items-start gap-2">
        <div className="text-3xl">{category.icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-1">
            {category.description}
          </p>
          <span className="text-xs text-muted-foreground">
            {category.count} freelancers
          </span>
        </div>
      </div>
    </button>
  );
}
