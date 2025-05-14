import React from "react";
import { Lock, Mail, User as UserIcon, Phone, UserPlus } from "lucide-react";
import { FormikHelpers, FormikValues } from "formik";
import ImageUploaderFormik from "./ImageUploaderFormik";
import GenericFormikForm from "./GenericFormikForm";
import InputFormik from "./InputFormik";
import * as Yup from "yup";
import { submitForm } from "@/utils/submitsActions";
import { globalApiUserService } from "@/api/ApiUserService";
import { useTransitionSubmit } from "@/hooks/useTransitionSubmit";
import User, { UserRegister } from "@/models/User";

// Validation Schema
const MAX_IMAGE_SIZE_MB = 2;

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
  user,
  onSubmitFinishSuccess,
}) => {
  // Existe usuario
  const isEditing = !!user;

  // Esquema
  const getSchema = React.useMemo(
    () => ({
      validationSchema: Yup.object().shape({
        username: Yup.string()
          .min(3, "Mínimo 3 caracteres")
          .max(25, "Máximo 25 caracteres")
          .required("Requerido"),
        email: Yup.string()
          .nullable()
          .max(45, "Máximo 45 caracteres")
          .email("Correo inválido"),
        password: isEditing
          ? Yup.string().nullable()
          : Yup.string()
              .min(8, "Mínimo 8 caracteres")
              .max(35)
              .required("Requerido"),
        password_repeat: isEditing
          ? Yup.string().oneOf(
              [Yup.ref("password")],
              "Las contraseñas no coinciden"
            )
          : Yup.string()
              .required("Requerido")
              .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
        nombre: Yup.string().required().min(3).max(50),
        apellido: Yup.string().required().min(3).max(50),
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
      // Valores de inicio
      initialValues: isEditing
        ? {
            username: user.username ?? "",
            email: user.email ?? "",
            password: "",
            password_repeat: "",
            foto: null,
            nombre: user.profile?.nombre ?? "",
            apellido: user.profile?.apellido ?? "",
            telefono: user.profile?.telefono ?? "",
          }
        : {
            username: "",
            email: "",
            password: "",
            password_repeat: "",
            foto: null,
            nombre: "",
            apellido: "",
            telefono: "",
          },
    }),
    [isEditing, user]
  );

  // Acción
  const [isPending, submit] = useTransitionSubmit({
    fn: React.useCallback(
      async (
        values: FormikValues,
        formikHelpers: FormikHelpers<FormikValues>
      ) => {
        // Datos
        const { username, password, email, nombre, apellido, telefono, foto } =
          values;

        // Data
        const userData: UserRegister = {
          username,
          password: password || undefined,
          email,
          profile: {
            nombre,
            apellido,
            telefono,
            foto,
          },
        };

        // Acciones
        const extra = {
          // Acciones
          actions: {
            onSuccess: (res: User | { username: string }) => {
              onSubmitFinishSuccess?.(res);
              if (!isEditing) {
                formikHelpers.resetForm();
              }
            },
            onFinish: () => formikHelpers.setSubmitting(false),
          },
          // Opciones
          optionsSubmit: {
            isSendNotifyError: true,
            notifySuccessMessage: isEditing
              ? `El usuario ${username} se actualizó correctamente`
              : `El usuario ${username} se creó correctamente, ya puedes iniciar sesión`,
          },
        };

        // Es edición
        if (isEditing) {
          await submitForm<
            User,
            {
              userData: UserRegister;
              userId: number;
            }
          >(
            globalApiUserService.updateUser.bind(globalApiUserService),
            {
              userData: userData,
              userId: user.id,
            },
            extra.actions,
            extra.optionsSubmit
          );
        } else {
          await submitForm<{ username: string }, UserRegister>(
            globalApiUserService.createUser.bind(globalApiUserService),
            userData,
            extra.actions,
            extra.optionsSubmit
          );
        }
      },
      [isEditing, onSubmitFinishSuccess, user?.id]
    ),
  });

  return (
    <GenericFormikForm
      initialValues={getSchema.initialValues}
      validationSchema={getSchema.validationSchema}
      title={!isEditing ? "Crea tu cuenta" : undefined}
      onSubmit={submit}
      button={{ text: isEditing ? "Guardar cambios" : "Crear cuenta" }}
      loading={isPending}
    >
      {({ setFieldValue }) => (
        <>
          {/* Imagen y Perfil */}
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center">
              <div className="flex h-full md:col-span-1 items-center justify-center">
                <ImageUploaderFormik
                  name="foto"
                  setFieldValue={setFieldValue}
                  helpText="Solo formatos JPG o PNG. Máx: 2MB."
                  className="w-full max-w-xs"
                  previewClassName="border border-gray-300 shadow-sm rounded-lg"
                  pathImgPreview={user?.profile?.foto_url}
                  single
                />
              </div>

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

          {/* Usuario y contraseña */}
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

            {/* Contraseñas */}
            {!isEditing && (
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
            )}
          </div>
        </>
      )}
    </GenericFormikForm>
  );
};

export default RegisterFormik;
