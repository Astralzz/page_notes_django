import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Si usas tailwind utils para clases
import { useThemeApp } from "@/hooks/useThemeApp";
import LayoutWrapper from "@/components/wrappers/LayoutWrapper";
import gsap from "gsap";

/**
 * 404 page
 *
 * @returns {JSX.Element}
 */
const NotFoundPage: React.FC = () => {
  // Refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Hooks
  const { isThemeDark } = useThemeApp();

  // Animaciones
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    tl.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1 },
      "<"
    )
      .fromTo(
        messageRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.3"
      )
      .fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1 },
        "-=0.4"
      );
  }, []);

  return (
    <LayoutWrapper>
      <div className="space-y-4">
        <h1
          ref={titleRef}
          className={cn("text-7xl font-extrabold drop-shadow-lg", {
            "text-white": isThemeDark,
            "text-gray-900": !isThemeDark,
          })}
        >
          404
        </h1>

        <p
          ref={messageRef}
          className={cn("text-2xl", {
            "text-white": isThemeDark,
            "text-gray-800": !isThemeDark,
          })}
        >
          Página no encontrada
        </p>

        <Link to="/" ref={buttonRef}>
          <Button className="rounded-xl shadow-md hover:shadow-lg transition-all hover:cursor-pointer">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </LayoutWrapper>
  );
};

export default NotFoundPage;
