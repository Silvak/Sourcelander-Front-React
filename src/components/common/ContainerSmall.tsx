import { cn } from "@/lib/utils";

export default function ContainerSmall({
  children,
  id = "",
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className="w-full px-4 sm:px-8 md:px-12 h-min border-b">
      <div
        className={cn(
          "relative border-x max-w-[900px] xl:max-w-[1120px] mx-auto min-h-[80px] px-4 sm:px-8 flex items-center gap-8 md:gap-8",
          className,
          "bg-[radial-gradient(circle,_#E5E5E5_1px,_transparent_1px)] bg-[length:7px_7px]"
        )}
      >
        {children}
      </div>
    </section>
  );
}
