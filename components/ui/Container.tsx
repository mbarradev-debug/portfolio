import { ElementType, ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Container({
  children,
  className = "",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={`max-w-5xl mx-auto w-full px-6 ${className}`.trim()}>
      {children}
    </Component>
  );
}
