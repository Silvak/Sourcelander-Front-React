import { cn } from "@/lib/utils";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <>
      <section className="w-full px-4 sm:px-8 md:px-12 h-min border-y -mt-[1px] ">
        <div
          className={cn(
            "relative  border-x max-w-[900px] xl:max-w-[1120px] mx-auto min-h-[400px] px-4 sm:px-8 flex flex-col gap-8 md:gap-8 py-4 md:py-8 pl-4",
            className
          )}
        >
          <div>Logo </div>
          <div>Links</div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-8 md:px-12 h-min border-b">
        <div
          className={cn(
            "relative border-x  text-sm text-gray-400 max-w-[900px] xl:max-w-[1120px] mx-auto min-h-[52px] px-4 sm:px-8 flex flex-wrap items-center justify-between gap-1 md:gap-4 py-4",
            className
          )}
        >
          <p>© {new Date().getFullYear()} Sourcelander. All rights reserved</p>
          <p>Sourcelander is a registered trademark.</p>
        </div>
      </section>
    </>
  );
}
