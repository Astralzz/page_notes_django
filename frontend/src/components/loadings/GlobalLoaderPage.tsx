import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import gsap from "gsap";

// Props
interface GlobalLoaderPageProps {
  message?: string;
  isThemeDark?: boolean;
}

/**
 * GlobalLoaderPage - Page
 *
 * @returns {JSX.Element}
 */
const GlobalLoaderPage: React.FC<GlobalLoaderPageProps> = ({
  message = "Cargando...",
  isThemeDark = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.8 },
    });

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1 }).fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.6"
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500",
        "bg-gradient-to-br",
        {
          "from-pry-100 to-pry-300": !isThemeDark,
          "dark from-pry-950 to-pry-800": isThemeDark,
        }
      )}
    >
      <Loader2
        className="w-16 h-16 animate-spin text-pry-500"
        strokeWidth={2}
      />
      <p
        ref={textRef}
        className={cn("mt-4 text-xl font-semibold", {
          "text-white": isThemeDark,
          "text-gray-800": !isThemeDark,
        })}
      >
        {message}
      </p>
    </div>
  );
};

export default GlobalLoaderPage;
