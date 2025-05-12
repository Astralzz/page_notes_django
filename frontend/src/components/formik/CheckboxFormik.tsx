import React from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";

// Props
interface CheckboxFormikProps {
  name: string;
  label: string;
  classNames?: {
    container?: string;
    label?: string;
    error?: string;
  };
}

/**
 * CheckboxFormik component
 *
 * @param props - Props for the CheckboxFormik component
 *
 * @returns {JSX.Element} - A Formik checkbox field with label and error message
 */
const CheckboxFormik: React.FC<CheckboxFormikProps> = ({
  name,
  label,
  classNames,
}) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <div
          className={clsx("flex items-center space-x-2", classNames?.container)}
        >
          <Checkbox
            id={name}
            checked={field.value}
            onCheckedChange={(value) =>
              form.setFieldValue(name, value === true)
            }
          />
          <label
            htmlFor={name}
            className={clsx(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed",
              "peer-disabled:opacity-70 hover:cursor-pointer",
              classNames?.label
            )}
          >
            {label}
          </label>
          <ErrorMessage
            name={name}
            component="div"
            className={clsx("text-sm text-red-600 mt-1", classNames?.error)}
          />
        </div>
      )}
    </Field>
  );
};

export default CheckboxFormik;
