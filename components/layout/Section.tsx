interface SectionProps {
  children: React.ReactNode;
}

export default function Section({ children }: SectionProps) {
  return <section className="py-16 sm:py-20 lg:py-24">{children}</section>;
}
