import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

type ProjectCardImage = {
  src: ImageProps["src"];
  alt: string;
};

export type ProjectCardProps = {
  href: string;
  title: string;
  description: string;
  /** Real screenshot/thumbnail. When omitted, `fallbackIcon` renders instead. */
  image?: ProjectCardImage;
  /** Centered icon shown when no `image` is provided (e.g. a source-code link). */
  fallbackIcon?: ReactNode;
  target?: string;
  rel?: string;
  className?: string;
};

// Ported from /legacy-reference/css/style.css (.grid-item, .thumb,
// .thumb-image, .thumb-app). rounded-xl (12px) already matches
// --radius-thumb exactly. The hover elevation lives on the ancestor
// (.grid-item:hover .thumb), replicated here via Tailwind's `group`.
export function ProjectCard({
  href,
  title,
  description,
  image,
  fallbackIcon,
  target,
  rel,
  className,
}: ProjectCardProps) {
  const classes = ["group block text-center", className]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} target={target} rel={rel} className={classes}>
      <div
        className="bg-thumb-bg relative aspect-[1200/630] w-full overflow-hidden rounded-xl transition-[transform,box-shadow] duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_14px_26px_-14px_rgba(0,0,0,0.3)]"
        style={
          !image
            ? {
                backgroundImage:
                  "linear-gradient(135deg, var(--thumb-app-from), var(--thumb-app-to))",
              }
            : undefined
        }
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 560px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="text-thumb-app-text flex h-full w-full items-center justify-center">
            {fallbackIcon}
          </div>
        )}
      </div>
      <p className="mt-2 font-semibold">{title}</p>
      <p className="text-caption text-text-soft">{description}</p>
    </a>
  );
}
