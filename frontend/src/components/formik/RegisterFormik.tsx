import React from "react";
import { FormikHelpers, FormikValues } from "formik";
import ImageUploaderFormik from "./ImageUploaderFormik";
import GenericFormikForm from "./GenericFormikForm";
import { Lock, Mail } from "lucide-react";
import InputFormik from "./InputFormik";
import * as Yup from "yup";

// Schemas
const registerSchema = {
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Requerido"),
    email: Yup.string().email("Correo inválido").required("Requerido"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
    avatar: Yup.mixed().required("Imagen requerida"),
  }),
  initialValues: {
    name: "",
    email: "",
    password: "",
    avatar: null,
  },
};

// Props
interface RegisterFormikProps {
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void | Promise<void>;
}

/**
 *  RegisterFormik component
 *
 * @param props - Props for the RegisterFormik component
 *
 * @returns {JSX.Element} - A Formik form for user registration
 */
const RegisterFormik: React.FC<RegisterFormikProps> = ({ onSubmit }) => {
  return (
    <GenericFormikForm
      {...registerSchema}
      title="Crea tu cuenta"
      onSubmit={onSubmit}
      button={{
        text: "Crear cuenta",
      }}
    >
      {({ setFieldValue }) => (
        <>
          <ImageUploaderFormik
            name="avatar"
            setFieldValue={setFieldValue}
            helpText="Solo formatos JPG o PNG. Máx: 2MB."
            className="mt-4"
            previewClassName="border border-gray-300 shadow-sm"
            single
          />

          <InputFormik
            name="name"
            placeholder="Nombre completo"
            icon={<Mail size={20} />}
            className="w-full"
            inputClassName="rounded-lg"
          />

          <InputFormik
            name="email"
            placeholder="Correo electrónico"
            icon={<Mail size={20} />}
            className="w-full"
            inputClassName="rounded-lg"
          />

          <InputFormik
            name="password"
            type="password"
            placeholder="Contraseña"
            icon={<Lock size={20} />}
            className="w-full"
            inputClassName="rounded-lg"
            showPasswordToggle
          />
        </>
      )}
    </GenericFormikForm>
  );
};

export default RegisterFormik;
