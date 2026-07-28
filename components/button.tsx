import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "solid" | "ghost";
export type ButtonIconPosition = "leading" | "trailing";

type ButtonOwnProps = {
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: ButtonIconPosition;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

// Ported from /legacy-reference/css/style.css (.btn, .btn-solid, .btn-ghost).
// rounded-md (6px) and text-button (15px) already match --radius-sm /
// --text-button exactly, so no new tokens were needed for those.
const baseClasses =
  "group font-body text-button inline-flex h-10 items-center gap-2 " +
  "rounded-md px-4 font-semibold whitespace-nowrap transition-colors " +
  "duration-150 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-brand-teal-500 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-bg disabled:pointer-events-none " +
  "disabled:opacity-50 aria-disabled:pointer-events-none " +
  "aria-disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  solid: "bg-brand-teal-500 text-white hover:bg-brand-teal-600",
  // rgba(49, 151, 149, .12) is the fixed hover tint from .btn-ghost:hover —
  // legacy never tokenized it per theme, so it's kept as-is here.
  ghost: "text-ghost-text hover:bg-[rgba(49,151,149,0.12)]",
};

function ButtonContent({
  icon,
  iconPosition,
  children,
}: {
  icon: ReactNode;
  iconPosition: ButtonIconPosition;
  children: ReactNode;
}) {
  return (
    <>
      {icon && iconPosition === "leading" && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "trailing" && (
        <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]">
          {icon}
        </span>
      )}
    </>
  );
}

export function Button({
  variant = "solid",
  icon,
  iconPosition = "trailing",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        <ButtonContent icon={icon} iconPosition={iconPosition}>
          {children}
        </ButtonContent>
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      <ButtonContent icon={icon} iconPosition={iconPosition}>
        {children}
      </ButtonContent>
    </button>
  );
}
