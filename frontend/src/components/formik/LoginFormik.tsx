import React from "react";
import { FormikHelpers, FormikValues } from "formik";
import GenericFormikForm from "./GenericFormikForm";
import { Lock, Mail } from "lucide-react";
import InputFormik from "./InputFormik";
import * as Yup from "yup";
import CheckboxFormik from "./CheckboxFormik";
import { globalApiAuthService } from "@/api/ApiAuthService";
import { AuthResponse } from "@/types/apiTypes";
import { submitFormPost } from "@/utils/formSubmit";
import { useDispatch } from "react-redux";
import { updateTokens } from "@/redux/slices/authSlice";

// Prueba
// woodardgary
// password123

// Schemas
const registerSchema = {
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(3, "Mínimo 3 caracteres")
      .required("Requerido")
      .max(25, "Máximo 25 caracteres")
      .required("Requerido"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .max(50, "Máximo 50 caracteres")
      .required("Requerido"),
    recording: Yup.boolean().required("Requerido"),
  }),
  initialValues: {
    username: "woodardgary",
    password: "password123",
    recording: false,
  },
};

// Props
interface LoginFormikProps<T = any> {
  onSubmitFinish?: (data: T) => void | Promise<void>;
}

/**
 *  LoginFormik component
 *
 * @param props - Props for the LoginFormik component
 *
 * @returns {JSX.Element} - A Formik form for user registration
 */
const LoginFormik: React.FC<LoginFormikProps> = ({ onSubmitFinish }) => {
  // Redux
  const dispatch = useDispatch();

  // ? Hooks
  const [isPending, startTransition] = React.useTransition();

  /**
   * Handle form submission
   *
   * @param type - The type of form (login or register)
   * @returns {Function} - A function that handles form submission
   */
  const onSubmit = React.useCallback(
    (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
      startTransition(async () => {
        // Obtenemos valores
        const { username, password } = values;

        // ? Validamos
        if (!username || !password) {
          formikHelpers.setFieldError("username", "Requerido");
          formikHelpers.setFieldError("password", "Requerido");
          return;
        }

        // Enviamos el formulario
        submitFormPost<AuthResponse, { username: string; password: string }>(
          globalApiAuthService.getToken.bind(globalApiAuthService), //  bind - Sirve para enlazar el contexto de la función
          {
            username,
            password,
          },
          {
            onSuccess: (res) => {
              dispatch(updateTokens(res));
              onSubmitFinish?.(res);
            },
            // Resetear campos
            resetFields: (values) => ({
              username: values.username,
              password: "",
            }),
            onFinish: () => {
              formikHelpers.setSubmitting(false);
            },
          },
          { isSendNotify: true }
        );
      });
    },
    [onSubmitFinish, dispatch]
  );

  return (
    <GenericFormikForm
      {...registerSchema}
      title="Inicia sesión"
      onSubmit={onSubmit}
      classNames={{
        form: "px-4 py-2",
      }}
      button={{
        text: "Iniciar sesión",
      }}
      loading={isPending}
    >
      {() => (
        <>
          <InputFormik
            name="username"
            placeholder="Nombre de usuario"
            icon={<Mail />}
            className="mt-4"
            required
            disableSpaces
          />

          <InputFormik
            name="password"
            type="password"
            placeholder="Contraseña"
            icon={<Lock />}
            className="mt-4"
            required
            showPasswordToggle
            disableSpaces
          />

          <CheckboxFormik
            name="recording"
            label="¿Mantener sesión iniciada?"
            classNames={{
              container: "mt-4",
              label: "text-xs",
            }}
          />
        </>
      )}
    </GenericFormikForm>
  );
};

export default LoginFormik;
