export default function Container({
  children,
  id = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className="w-full px-4 sm:px-8 md:px-12 h-min border-b">
      <div className="relative gradientBorder border-x max-w-[1120px] mx-auto  min-h-[400px] px-4 sm:px-8 undefined grid grid-cols-1 md:grid-cols-1 items-center gap-8 md:gap-8 py-4 md:py-8 pl-4">
        {children}
      </div>
    </section>
  );
}
