"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
}

export default function AnimateOnScroll({
  children,
  className = "",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible
          ? "animate-in fade-in slide-in-from-bottom-2 duration-300"
          : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
