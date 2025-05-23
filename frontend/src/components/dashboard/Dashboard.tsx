import React from "react";
import User from "@/models/User";
import { Button } from "../ui/button";
import {
  Github,
  Globe,
  Linkedin,
  LogOut,
  Moon,
  Sun,
  User as UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useReduxDispatch } from "@/redux/hook";
import { removeAllDataAuth } from "@/redux/slices/authSlice";
import { updateTheme } from "@/redux/slices/themeSlice";
import { useThemeApp } from "@/hooks/useThemeApp";
import ModalUser from "../pages/user/ModalUser";
import gsap from "gsap";
import clsx from "clsx";
import LayoutWrapper from "../wrappers/LayoutWrapper";

// Props
interface DashboardProps {
  children: React.ReactNode;
  user: User;
}

/**
 *
 * Dashboard component - Dashboard
 *
 * @returns {JSX.Element}
 */
const Dashboard: React.FC<DashboardProps> = ({ children, user }) => {
  // Vars
  const [isOpenModalUser, setOpenModalUser] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Variables redux
  const { isThemeDark } = useThemeApp();
  const dispatch = useReduxDispatch();

  // Animaciones al montar
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(containerRef.current, { opacity: 0, y: 30, duration: 0.6 });
      tl.from(
        ".dashboard-header",
        { opacity: 0, y: -20, stagger: 0.2, duration: 0.4 },
        "-=0.3"
      );
      tl.from(
        ".dashboard-content",
        { opacity: 0, y: 10, duration: 0.4 },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Cerrar sesión
  const handleLogout = React.useCallback(() => {
    //Eliminamos todo lo de auth
    dispatch(removeAllDataAuth());
  }, [dispatch]);

  // Cambiar tema
  const handleTheme = React.useCallback(() => {
    gsap.fromTo(
      ".theme-icon",
      { rotate: 0 },
      { rotate: 180, duration: 0.4, ease: "power1.inOut" }
    );
    dispatch(updateTheme(isThemeDark ? "light" : "dark"));
  }, [dispatch, isThemeDark]);

  return (
    <LayoutWrapper className="items-start justify-start px-4 py-6">
      <section
        ref={containerRef}
        className={clsx("w-full max-w-4xl mx-auto p-4 transition-all")}
      >
        {/* Header */}
        <div
          className={clsx(
            "flex flex-col md:flex-row justify-between items-center",
            "gap-6 mb-8"
          )}
        >
          {/* Nombre */}
          <div className="flex items-center gap-4 dashboard-header">
            <Avatar className="h-14 w-14 ring-2 ring-pry-500 shadow-md">
              <AvatarImage src={user?.profile?.foto_url} alt="Foto de perfil" />
              <AvatarFallback
                className={clsx("", {
                  "text-white": isThemeDark,
                })}
              >
                {(user?.profile?.nombre ?? "N").charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-start">
              <h1 className="text-2xl md:text-3xl font-bold text-pry-900 dark:text-pry-100">
                Hola, {user?.profile?.nombre || user?.username}
              </h1>
              <p className="text-pry-700 dark:text-pry-300">
                Aquí están tus notas
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-3 dashboard-header">
            {/* Theme Toggle */}
            <Button
              onClick={handleTheme}
              variant="ghost"
              className={clsx(
                "rounded-full p-2 transition",
                "hover:bg-pry-200 dark:hover:bg-pry-800",
                "hover:cursor-pointer hover:shadow-xl"
              )}
              aria-label="Cambiar tema"
            >
              <Sun className="h-5 w-5 text-pry-700 dark:hidden theme-icon" />
              <Moon className="h-5 w-5 hidden dark:inline text-pry-100 theme-icon" />
            </Button>

            {/* Ver Perfil */}
            <Button
              onClick={() => setOpenModalUser(true)}
              className={clsx(
                "bg-pry-500 hover:bg-pry-600 text-white",
                "rounded-xl shadow-lg transition flex items-center gap-2 px-4 py-2",
                "hover:cursor-pointer hover:shadow-xl"
              )}
            >
              <UserIcon className="h-5 w-5" />
              Perfil
            </Button>

            {/* Logout */}
            <Button
              onClick={handleLogout}
              className={clsx(
                "bg-red-500 hover:bg-red-600 text-white",
                "rounded-xl shadow-lg transition flex items-center gap-2 px-4 py-2",
                "hover:cursor-pointer hover:shadow-xl"
              )}
            >
              <LogOut className="h-5 w-5" />
              Salir
            </Button>
          </div>
        </div>

        {/* Página principal */}
        <div className="dashboard-content">{children}</div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-pry-600 dark:text-pry-400">
          <p>
            &copy; {new Date().getFullYear()} Página de notas creada por{" "}
            <span className="font-semibold text-pry-800 dark:text-pry-200">
              Astralz (Edain JCC)
            </span>{" "}
            ✨
          </p>
          <div className="mt-3 flex justify-center gap-6">
            <a
              href="https://astralzz.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 hover:text-pry-700 dark:hover:text-pry-200"
              aria-label="Portafolio"
            >
              <Globe className="w-5 h-5 inline" />
            </a>
            <a
              href="https://github.com/Astralzz"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 hover:text-pry-700 dark:hover:text-pry-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 inline" />
            </a>
            <a
              href="https://www.linkedin.com/in/edain-jcc"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 hover:text-pry-700 dark:hover:text-pry-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 inline" />
            </a>
          </div>
        </footer>
      </section>

      {/* Modal del usuario */}
      <ModalUser
        statusModal={{
          closeModal: () => setOpenModalUser(false),
          isOpen: isOpenModalUser,
        }}
        user={user}
      />
    </LayoutWrapper>
  );
};

export default Dashboard;
