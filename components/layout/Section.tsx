interface SectionProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  id?: string;
}

export default function Section({
  children,
  variant = "primary",
  className = "",
  id,
}: SectionProps) {
  const bgClass = variant === "secondary" ? "bg-bg-secondary" : "bg-bg-primary";

  return (
    <section id={id} className={`relative py-20 sm:py-24 lg:py-32 ${bgClass} ${className}`}>
      {children}
      {/* Gradient transition to next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
    </section>
  );
}
