import type { AnchorHTMLAttributes, ReactNode } from "react";

type IconLinkOwnProps = {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export type IconLinkProps = IconLinkOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof IconLinkOwnProps>;

// Ported from /legacy-reference/css/style.css (.nav-link, .nav-link::after,
// .nav-link--icon). rounded (4px), p-2 (8px) and text-body (16px) already
// match the legacy values exactly, so no new tokens were needed. The
// underline is a real `::after` pseudo-element (via Tailwind's `after:`
// variant) rather than a sibling <span>, matching the legacy technique of
// animating it independently of the icon/text layout.
const baseClasses =
  "text-text relative inline-flex items-center gap-1 rounded p-2 " +
  "font-body text-body after:absolute after:bottom-[5px] after:left-2 " +
  "after:right-2 after:h-[1.5px] after:origin-left after:scale-x-0 " +
  "after:bg-current after:transition-transform after:duration-[250ms] " +
  "after:content-[''] hover:after:scale-x-100 focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-brand-teal-500 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function IconLink({
  icon,
  children,
  className,
  ...props
}: IconLinkProps) {
  const classes = [baseClasses, className].filter(Boolean).join(" ");

  return (
    <a className={classes} {...props}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </a>
  );
}
