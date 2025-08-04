import { popularCategories } from "@/lib/searchData";

interface CategoryCardProps {
  category: (typeof popularCategories)[0];
  onClick: (categoryId: string) => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={() => onClick(category.id)}
      className="group p-6 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 text-left"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{category.icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-2">
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
