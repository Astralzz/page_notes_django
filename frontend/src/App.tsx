import React from "react";
import { Outlet } from "react-router-dom";
import { useReduxDispatch } from "./redux/hook";
import { updateTheme } from "./redux/slices/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";

// Style
import "./styles/app.scss";
import { useThemeApp } from "./hooks/useThemeApp";
import { useAuthApp } from "./hooks/useAuthApp";
import Login from "./pages/auth/Login";

/**
 *
 * App component - Main
 *
 * @returns {JSX.Element}
 */
const App: React.FC = () => {
  // Variables redux
  const { theme, isThemeDark } = useThemeApp();
  const { user } = useAuthApp();
  const reduxDispatch = useReduxDispatch();

  // Icono del tema
  const IconTheme = React.useMemo(
    () => (isThemeDark ? FaMoon : FaSun),
    [isThemeDark]
  );

  // ? No existe el usuario
  if (!user) {
    return <Login />;
  }

  return (
    <main className={theme}>
      <div className="bg-pry-100 dark:bg-pry-500 text-gray-900 dark:text-gray-100 w-full flex flex-col items-center text-center justify-center min-h-screen">
        {/* Contenido principal */}
        <div className="w-full text-2xl font-bold flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default App;
