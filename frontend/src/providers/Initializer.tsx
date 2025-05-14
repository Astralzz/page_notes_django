import React from "react";
import { useAuthApp } from "@/hooks/useAuthApp";
import User from "@/models/User";
import { submitForm } from "@/utils/submitsActions";
import { Toaster } from "react-hot-toast";
import { globalApiUserService } from "@/api/ApiUserService";
import useAuthActions from "@/hooks/useAuthActions";
import { useTransitionSubmit } from "@/hooks/useTransitionSubmit";

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
  // ? Hooks
  const { updateUser, removeTokens } = useAuthActions();
  const { tokens, recordingAuth } = useAuthApp();

  /**
   * Handle form submission
   *
   * @param type - The type of form (login or register)
   * @returns {Function} - A function that handles form submission
   */
  const [isPendingGetUser, submitGetUser] = useTransitionSubmit({
    fn: React.useCallback(
      async (accessToken: string) => {
        // ? No existe token
        if (!accessToken) return;

        // Actualizamos token
        await globalApiUserService.updateAccessTokenUser(accessToken);

        // Enviamos el formulario
        submitForm<User, object>(
          globalApiUserService.getUserByToken.bind(globalApiUserService),
          {},
          {
            onSuccess(res) {
              updateUser(res);

              // ? No se quiere recordar la sesión
              if (!recordingAuth) removeTokens();
            },
            onError() {
              removeTokens();
            },
          },
          { isSendNotifyError: true }
        );
      },
      [recordingAuth, removeTokens, updateUser]
    ),
  });

  // Efecto
  React.useEffect(() => {
    // ? No existe
    if (tokens?.access) submitGetUser(tokens.access);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens?.access]);

  // Efecto para inicializar la autenticación
  if (isPendingGetUser) return <div>Cargando autenticación...</div>;

  return (
    <>
      {children}

      {/* Toast */}
      <Toaster position="top-right" />
    </>
  );
};

export default Initializer;
