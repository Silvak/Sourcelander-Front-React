import { cn } from "@/lib/utils";

export default function Container({
  children,
  id = "",
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className="w-full px-4 sm:px-8 md:px-12 border-b">
      <div
        className={cn(
          "relative gradientBorder border-x max-w-[900px] xl:max-w-[1120px] mx-auto px-4 sm:px-8 flex flex-col gap-8 md:gap-8 py-4 md:py-8 pl-4",
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}
