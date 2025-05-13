import React from "react";
import { FormikHelpers, FormikValues } from "formik";
import GenericFormikForm from "./GenericFormikForm";
import { Lock, Mail } from "lucide-react";
import InputFormik from "./InputFormik";
import * as Yup from "yup";
import CheckboxFormik from "./CheckboxFormik";
import { globalApiAuthService } from "@/api/ApiAuthService";
import { AuthResponse } from "@/types/apiTypes";
import { submitForm } from "@/utils/submitsActions";
import { useTransitionSubmit } from "@/hooks/useTransitionSubmit";
import useAuthActions from "@/hooks/useAuthActions";

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
    recording: true,
  },
};

// Props
interface LoginFormikProps<T = any> {
  onSubmitFinishSuccess?: (data: T) => void | Promise<void>;
}

/**
 * LoginFormik component
 *
 * Formulario para iniciar sesión usando Formik.
 *
 * @param props - Props opcionales como `onSubmitFinish` para manejar el resultado del login.
 * @returns JSX.Element
 */
const LoginFormik: React.FC<LoginFormikProps> = ({ onSubmitFinishSuccess }) => {
  // Hook actions
  const { updateTokens, updateRecording } = useAuthActions();

  // Transition hook
  const [isPending, submit] = useTransitionSubmit({
    fn: React.useCallback(
      async (
        values: FormikValues,
        formikHelpers: FormikHelpers<FormikValues>
      ) => {
        // Variables
        const { username, password, recording } = values;

        // ? Existen
        if (!username || !password) {
          formikHelpers.setFieldError("username", "Requerido");
          formikHelpers.setFieldError("password", "Requerido");
          return;
        }

        await submitForm<AuthResponse, { username: string; password: string }>(
          globalApiAuthService.getToken.bind(globalApiAuthService),
          { username, password },
          {
            onSuccess: (res) => {
              // Actualizamos
              updateRecording(recording === true);
              updateTokens(res);
              onSubmitFinishSuccess?.(res);
            },
            resetFields: (values) => ({
              username: values.username,
              password: "",
            }),
            onFinish: () => formikHelpers.setSubmitting(false),
          },
          { isSendNotifyError: true }
        );
      },
      [onSubmitFinishSuccess, updateRecording, updateTokens]
    ),
  });

  return (
    <GenericFormikForm
      {...registerSchema}
      title="Inicia sesión"
      onSubmit={submit}
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
              container: "ml-2 mt-4",
              label: "text-xs",
            }}
          />
        </>
      )}
    </GenericFormikForm>
  );
};

export default LoginFormik;
