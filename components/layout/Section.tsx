interface SectionProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Section({
  children,
  variant = "primary",
  className = "",
}: SectionProps) {
  const bgClass = variant === "secondary" ? "bg-bg-secondary" : "bg-bg-primary";

  return (
    <section className={`py-20 sm:py-24 lg:py-32 ${bgClass} ${className}`}>
      {children}
    </section>
  );
}
