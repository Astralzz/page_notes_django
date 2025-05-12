import toast, { ToastOptions } from "react-hot-toast";

/**
 * Muestra una notificación predeterminada.
 *
 * @param {("error" | "success" | "loading" | "custom")} type - Tipo de notificación.
 * @param {string} message - Mensaje a mostrar.
 * @param {ToastOptions} [options] - Opciones adicionales para personalizar el toast.
 *
 * @returns {void}
 */
export const setNotifyDefault = (
  message: string,
  type: "error" | "success" | "loading" | "custom" = "custom",
  options?: ToastOptions
): void => {
  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "loading":
      toast.loading(message, options);
      break;
    case "custom":
      toast(message, options);
      break;
    default:
      toast(message, options); // fallback
      break;
  }
};
