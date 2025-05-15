import React, { useState, useRef } from "react";
import RegisterFormik from "@/components/formik/RegisterFormik";
import LoginFormik from "@/components/formik/LoginFormik";
import ToggleAuthMessage from "@/components/Toggles/ToggleAuthMessage";
import { gsap } from "gsap";
import clsx from "clsx";
import LayoutWrapper from "@/components/wrappers/LayoutWrapper";

/**
 * Login page
 *
 * @returns {JSX.Element} - The Login component
 */
const Login: React.FC = () => {
  // ? Hooks
  const [isLogin, setIsLogin] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Toggle between login and register modes
   */
  const toggleMode = () => {
    gsap
      .timeline()
      .to(cardRef.current, {
        rotateY: 90,
        scale: 0.95,
        duration: 0.3,
        ease: "power1.inOut",
        onComplete: () => setIsLogin((prev) => !prev),
      })
      .to(cardRef.current, {
        rotateY: 0,
        scale: 1,
        duration: 0.3,
        ease: "power1.inOut",
      });
  };

  return (
    <LayoutWrapper>
      <div
        className={clsx("w-full perspective-1000", {
          "max-w-3xl": isLogin,
          "max-w-xl": !isLogin,
        })}
      >
        <div
          ref={cardRef}
          className={clsx(
            "relative rounded-3xl shadow-2xl py-8 px-4 bg-white/95 backdrop-blur-md",
            "dark:bg-pry-600/95 dark:text-white",
            "transform-style-preserve-3d border transition-shadow",
            "border-pry-100 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]"
          )}
        >
          <div className="flex gap-12">
            <div className="flex-1">
              {isLogin ? (
                <LoginFormik />
              ) : (
                <RegisterFormik onSubmitFinishSuccess={toggleMode} />
              )}
              {/* Toggle message */}
              <ToggleAuthMessage
                message={isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
                actionText={isLogin ? "Regístrate" : "Inicia sesión"}
                onAction={toggleMode}
              />
            </div>
            {/* Image right */}
            {isLogin && (
              <div className="flex-1 hidden lg:block">
                <img
                  src="https://www.pngarts.com/files/3/Technology-Free-PNG-Image.png"
                  alt="Login img"
                  className="w-auto h-full object-contain animate-float"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Login;
