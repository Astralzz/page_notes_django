import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils"; // Si usas tailwind utils para clases
import gsap from "gsap";
import { useThemeApp } from "@/hooks/useThemeApp";

// Props
interface LayoutWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 404 page
 *
 * @returns {JSX.Element}
 */
const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  className,
}) => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Hooks
  const { isThemeDark } = useThemeApp();

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "min-h-screen flex items-center justify-center p-4 text-center transition-all duration-500",
        "bg-gradient-to-br",
        {
          "rom-pry-100 to-pry-300": !isThemeDark,
          "dark from-pry-950 to-pry-800": isThemeDark,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default LayoutWrapper;
