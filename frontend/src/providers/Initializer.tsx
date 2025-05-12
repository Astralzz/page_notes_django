import React from "react";
import { useAuthApp } from "@/hooks/useAuthApp";
import User from "@/models/User";
import { submitFormPost } from "@/utils/formSubmit";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeTokens, updateUser } from "@/redux/slices/authSlice";
import { globalApiUserService } from "@/api/ApiUserService";

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

  // ? Hooks
  const [isPending, startTransition] = React.useTransition();

  /**
   * Handle form submission
   *
   * @param type - The type of form (login or register)
   * @returns {Function} - A function that handles form submission
   */
  const onSubmit = React.useCallback(() => {
    startTransition(async () => {
      // ? Existe token
      if (!tokens?.access) {
        return;
      }

      // data
      const data = {
        token: tokens?.access,
      };

      // Enviamos el formulario
      submitFormPost<User, { token: string }>(
        globalApiUserService.getUserByToken.bind(globalApiUserService),
        data,
        {
          onSuccess(res) {
            console.log(res);
            dispatch(updateUser(res));
          },
          onError() {
            dispatch(removeTokens());
          },
        },
        { isSendNotify: true }
      );
    });
  }, [dispatch, tokens?.access]);

  // Efecto
  React.useEffect(() => {
    onSubmit();
  }, [dispatch, onSubmit]);

  // Efecto para inicializar la autenticación
  if (isPending) return <div>Cargando autenticación...</div>;

  return (
    <>
      {children}

      {/* Toast */}
      <Toaster position="top-right" />
    </>
  );
};

export default Initializer;
