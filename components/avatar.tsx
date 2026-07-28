import Image, { type ImageProps } from "next/image";

type AvatarProps = {
  src: ImageProps["src"];
  alt: string;
  className?: string;
};

// Ported from /legacy-reference/css/style.css (.avatar). border-avatar-border
// is already a theme token (light/dark), so only the 100px size, circular
// crop, and hover scale needed porting.
export function Avatar({ src, alt, className }: AvatarProps) {
  const classes = [
    "border-avatar-border inline-block h-[100px] w-[100px] overflow-hidden",
    "rounded-full border-2 transition-transform duration-[250ms] hover:scale-105",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
