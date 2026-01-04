interface SectionProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  spacing?: "compact" | "default" | "relaxed";
  separator?: "subtle" | "visible" | "none";
  className?: string;
  id?: string;
}

const spacingClasses = {
  compact: "py-16 sm:py-20 lg:py-24",
  default: "py-20 sm:py-24 lg:py-32",
  relaxed: "py-24 sm:py-28 lg:py-36",
};

const separatorClasses = {
  subtle: "h-px opacity-50",
  visible: "h-px opacity-100",
  none: "h-0 opacity-0",
};

export default function Section({
  children,
  variant = "primary",
  spacing = "default",
  separator = "subtle",
  className = "",
  id,
}: SectionProps) {
  const bgClass = variant === "secondary" ? "bg-bg-secondary" : "bg-bg-primary";

  return (
    <section id={id} className={`relative ${spacingClasses[spacing]} ${bgClass} ${className}`}>
      {children}
      {/* Gradient transition to next section */}
      <div
        className={`pointer-events-none absolute bottom-0 left-0 right-0 ${separatorClasses[separator]} ${
          separator === "visible" ? "separator-visible" : "bg-gradient-to-r from-transparent via-border-subtle to-transparent"
        }`}
      />
    </section>
  );
}
