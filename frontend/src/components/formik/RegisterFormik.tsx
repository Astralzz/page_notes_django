import React from "react";
import { Lock, Mail, User as UserIcon, Phone, UserPlus } from "lucide-react";
import { FormikHelpers, FormikValues } from "formik";
import ImageUploaderFormik from "./ImageUploaderFormik";
import GenericFormikForm from "./GenericFormikForm";
import InputFormik from "./InputFormik";
import * as Yup from "yup";
import { submitForm } from "@/utils/submitsActions";
import { globalApiUserService } from "@/api/ApiUserService";
import User, { UserRegister } from "@/models/User";
import { useTransitionSubmit } from "@/hooks/useTransitionSubmit";

// Validation Schema
const MAX_IMAGE_SIZE_MB = 2;

// Validate
const registerSchema = {
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(3, "Mínimo 3 caracteres")
      .max(25, "Máximo 25 caracteres")
      .required("Requerido"),
    email: Yup.string()
      .nullable()
      .max(45, "Máximo 45 caracteres")
      .email("Correo inválido"),
    password: Yup.string()
      .min(8, "Mínimo 8 caracteres")
      .max(35, "Máximo 35 caracteres")
      .required("Requerido"),
    password_repeat: Yup.string()
      .required("Requerido")
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),

    // Perfil
    nombre: Yup.string()
      .required("Requerido")
      .min(3, "Mínimo 3 caracteres")
      .max(50, "Máximo 50 caracteres"),
    apellido: Yup.string()
      .required("Requerido")
      .min(3, "Mínimo 3 caracteres")
      .max(50, "Máximo 50 caracteres"),
    telefono: Yup.string()
      .nullable()
      .matches(/^\d{10}$/, "Debe tener 10 dígitos"),
    foto: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        `La imagen debe pesar menos de ${MAX_IMAGE_SIZE_MB}MB`,
        (value) =>
          !value ||
          (value instanceof File &&
            value.size / 1024 / 1024 <= MAX_IMAGE_SIZE_MB)
      ),
  }),

  initialValues: {
    username: "",
    email: "",
    password: "",
    password_repeat: "",
    foto: null,
    nombre: "",
    apellido: "",
    telefono: "",
  },
};

// Props
interface RegisterFormikProps<T = any> {
  user?: User;
  onSubmitFinishSuccess?: (data: T) => void | Promise<void>;
}

/**
 *  RegisterFormik component
 *
 * @param props - Props for the RegisterFormik component
 *
 * @returns {JSX.Element} - A Formik form for user registration
 */
const RegisterFormik: React.FC<RegisterFormikProps> = ({
  onSubmitFinishSuccess,
}) => {
  // Transition hook
  const [isPending, submit] = useTransitionSubmit({
    fn: React.useCallback(
      async (
        values: FormikValues,
        formikHelpers: FormikHelpers<FormikValues>
      ) => {
        const { username, password, email, nombre, apellido, telefono, foto } =
          values;

        const user: UserRegister = {
          username,
          password,
          email,
          profile: {
            nombre,
            apellido,
            telefono,
            foto_url: foto,
          },
        };

        await submitForm<{ username: string }, UserRegister>(
          globalApiUserService.createUser.bind(globalApiUserService),
          user,
          {
            onSuccess(res) {
              console.log(res);
              onSubmitFinishSuccess?.(res);

              // Limpia el formulario
              formikHelpers.resetForm();
            },
            onFinish: () => formikHelpers.setSubmitting(false),
          },
          {
            isSendNotifyError: true,
            notifySuccessMessage: `El usuario ${
              username ?? "N/A"
            } se creo correctamente, ya puedes iniciar sesión`,
          }
        );
      },
      [onSubmitFinishSuccess]
    ),
  });

  return (
    <GenericFormikForm
      {...registerSchema}
      title="Crea tu cuenta"
      onSubmit={submit}
      button={{
        text: "Crear cuenta",
      }}
      loading={isPending}
    >
      {({ setFieldValue }) => (
        <>
          {/* Perfil */}
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center">
              {/* Imagen */}
              <div className="flex h-full md:col-span-1 items-center justify-center">
                <ImageUploaderFormik
                  name="foto"
                  setFieldValue={setFieldValue}
                  helpText="Solo formatos JPG o PNG. Máx: 2MB."
                  className="w-full max-w-xs"
                  previewClassName="border border-gray-300 shadow-sm rounded-lg"
                  single
                />
              </div>

              {/* Datos */}
              <div className="flex pt-4 flex-col space-y-4 px-4 md:col-span-2">
                <InputFormik
                  name="nombre"
                  placeholder="Nombre"
                  icon={<UserPlus size={20} />}
                />
                <InputFormik
                  name="apellido"
                  placeholder="Apellido"
                  icon={<UserPlus size={20} />}
                />
                <InputFormik
                  name="telefono"
                  placeholder="Teléfono (10 dígitos)"
                  icon={<Phone size={20} />}
                  disableSpaces
                />
              </div>
            </div>
          </div>

          {/* User */}
          <div>
            <InputFormik
              name="username"
              placeholder="Nombre de usuario único"
              icon={<UserIcon size={20} />}
              className="w-full"
              disableSpaces
            />
            <InputFormik
              name="email"
              placeholder="Correo electrónico"
              icon={<Mail size={20} />}
              className="w-full"
              disableSpaces
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <InputFormik
                name="password"
                type="password"
                placeholder="Contraseña"
                icon={<Lock size={20} />}
                className="w-full"
                showPasswordToggle
                disableSpaces
              />

              <InputFormik
                name="password_repeat"
                type="password"
                placeholder="Repite la contraseña"
                className="w-full"
                showPasswordToggle
                disableSpaces
              />
            </div>
          </div>
        </>
      )}
    </GenericFormikForm>
  );
};

export default RegisterFormik;
