import { BioItem } from "@/components/bio-item";

type BioListItem = {
  label: string;
  description: string;
};

type BioListProps = {
  items: BioListItem[];
  className?: string;
};

// Reused for both the Bio (year → role) and Stack (category → tools)
// sections in /legacy-reference — same visual structure, different data.
export function BioList({ items, className }: BioListProps) {
  return (
    <div className={className}>
      {items.map((item) => (
        <BioItem
          key={item.label}
          label={item.label}
          description={item.description}
        />
      ))}
    </div>
  );
}
