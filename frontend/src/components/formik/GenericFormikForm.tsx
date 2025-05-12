import React from "react";
import {
  Formik,
  Form,
  FormikConfig,
  FormikValues,
  FormikHelpers,
} from "formik";
import clsx from "clsx";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

// Props
interface GenericFormikFormProps extends FormikConfig<FormikValues> {
  title?: string;
  headerImageUrl?: string;
  children?: (
    formik: FormikHelpers<FormikValues> & FormikValues
  ) => React.ReactNode;
  classNames?: {
    form?: string;
    title?: string;
    headerImage?: string;
  };
  button?: {
    text: string;
    className?: string;
  };
  loading?: boolean;
}

/**
 *  GenericFormikForm component
 *
 * @param props - Props for the GenericFormikForm component
 *
 * @returns {JSX.Element} - A Formik form with optional title and header image
 */
const GenericFormikForm: React.FC<GenericFormikFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  title,
  headerImageUrl,
  children,
  classNames,
  button,
  loading = false,
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Image */}
      {headerImageUrl && (
        <div className={clsx("mb-4", classNames?.headerImage)}>
          <img
            src={headerImageUrl}
            alt="Encabezado"
            className="w-full h-40 object-cover rounded-lg shadow"
          />
        </div>
      )}

      {/* Title */}
      {title && (
        <h2
          className={clsx(
            "text-3xl font-bold mb-8 bg-clip-text text-transparent text-center",
            "bg-gradient-to-r from-pry-600 to-pry-400",
            classNames?.title
          )}
        >
          {title}
        </h2>
      )}

      {/* Formik Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className={clsx("space-y-6", classNames?.form)}>
            {children?.(formik)}

            {button && (
              <Button
                type="submit"
                className={clsx(
                  "w-full text-white py-6 rounded-xl transition-all shadow-lg",
                  "bg-gradient-to-r from-pry-500 to-pry-400 hover:cursor-pointer",
                  "hover:from-pry-600 hover:to-pry-500 hover:shadow-pry-200",
                  button.className
                )}
                disabled={loading || formik.isSubmitting}
              >
                {loading || formik.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  button.text
                )}
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GenericFormikForm;
