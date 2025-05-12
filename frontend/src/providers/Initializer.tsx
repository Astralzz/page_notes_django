import { useAuthApp } from "@/hooks/useAuthApp";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Props
interface InitializerProps {
  children: React.ReactNode;
}

/**
 * Initializer component - Initializes authentication
 *
 * @param {children} - Children components
 *
 * @returns {JSX.Element} - Initializer component
 */
const Initializer: React.FC<InitializerProps> = ({ children }) => {
  // Redux
  const dispatch = useDispatch();
  const { tokens } = useAuthApp();

  // Variables de estado
  const [loading, setLoading] = useState(true);

  // Efecto
  React.useEffect(() => {
    setLoading(false);
  }, [tokens, dispatch]);

  // Efecto para inicializar la autenticación
  if (loading) return <div>Cargando autenticación...</div>;

  return <>{children}</>;
};

export default Initializer;
