type BioItemProps = {
  label: string;
  description: string;
  className?: string;
};

// Ported from /legacy-reference/css/style.css (.bio-item, .bio-year).
// Hanging indent via the classic negative-text-indent + padding-left
// technique: wrapped lines align under the description, not the label.
export function BioItem({ label, description, className }: BioItemProps) {
  const classes = ["-indent-[3.4em] mb-1 pl-[3.4em]", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <span className="mr-[1em] font-bold">{label}</span>
      {description}
    </div>
  );
}
