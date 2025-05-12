import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import { useThemeApp } from "./hooks/useThemeApp";
import { useAuthApp } from "./hooks/useAuthApp";
import Login from "./pages/auth/Login";

// Style
import "./styles/app.scss";

/**
 *
 * App component - Main
 *
 * @returns {JSX.Element}
 */
const App: React.FC = () => {
  // Variables redux
  const { theme } = useThemeApp();
  const { user } = useAuthApp();

  return (
    <main className={theme}>
      {!user ? (
        <Login />
      ) : (
        <Dashboard user={user}>
          <Outlet />
        </Dashboard>
      )}
    </main>
  );
};

export default App;
