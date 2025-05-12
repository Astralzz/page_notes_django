import { JSX } from "react";
import { RouteObject } from "react-router-dom";
import { IconType } from "react-icons";
import NotesPage from "@/pages/NotesPage";

// Tipo de ruta
export type RouteAppType = {
  route: RouteObject;
  label: string;
  Icon?: IconType;
};

// Función para generar rutas
export const generateRouterApp = ({
  path,
  element,
  icon,
  label,
}: {
  path: string;
  label?: string;
  element?: JSX.Element;
  icon?: IconType;
}): RouteAppType => ({
  label: label || path,
  Icon: icon,
  route: {
    path: `/${path}`,
    element: element || <p>{label || path}</p>,
  },
});

// Lista de rutas
const routesListApp: RouteAppType[] = [
  generateRouterApp({ path: "", label: "Home", element: <NotesPage /> }),
  generateRouterApp({ path: "home", label: "Home", element: <NotesPage /> }),
] as const; // Hace que la lista sea inmutable

export default routesListApp;
