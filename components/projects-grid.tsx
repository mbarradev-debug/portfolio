import { ProjectCard, type ProjectCardProps } from "@/components/project-card";

type ProjectsGridProps = {
  items: ProjectCardProps[];
  className?: string;
};

// Ported from /legacy-reference/css/style.css (.grid-2). The 560px
// collapse breakpoint doesn't match Tailwind's default scale, so it's
// expressed as an arbitrary max-width variant to stay pixel-exact.
export function ProjectsGrid({ items, className }: ProjectsGridProps) {
  const classes = [
    "grid grid-cols-2 gap-6 mb-6 max-[560px]:grid-cols-1",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {items.map((item) => (
        <ProjectCard key={item.href} {...item} />
      ))}
    </div>
  );
}
