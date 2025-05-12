import React, { ComponentProps, HTMLInputTypeAttribute, useState } from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input"; // ajusta si es necesario

// Props
interface InputFormikProps extends ComponentProps<typeof Input> {
  name: string;
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  inputClassName?: string;
  showPasswordToggle?: boolean;
  disableSpaces?: boolean;
}
/**
 * InputFormik component
 *
 * @param props - Props for the InputFormik component
 *
 * @returns {JSX.Element} - A Formik input field with optional icon and password toggle
 */
const InputFormik: React.FC<InputFormikProps> = ({
  name,
  icon,
  placeholder,
  className,
  type = "text",
  inputClassName,
  showPasswordToggle = false,
  disableSpaces = false,
}) => {
  // State to manage the visibility of the password
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Tipo
  const inputType =
    showPasswordToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  const sanitizeAndHandleChange = React.useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      fieldOnChange: (event: React.ChangeEvent<any>) => void
    ) => {
      // Prevent default behavior
      const rawValue = e.target.value;
      const sanitizedValue = disableSpaces
        ? rawValue.replace(/\s+/g, "")
        : rawValue;

      // Set the sanitized value to the input
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(e.target, sanitizedValue);

      const ev2 = new Event("input", { bubbles: true });
      e.target.dispatchEvent(ev2);

      fieldOnChange(e);
    },
    [disableSpaces]
  );

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <div className={clsx("mb-4", className)}>
          <div className="relative flex items-center">
            {icon && <div className="absolute left-3 text-pry-500">{icon}</div>}
            <Input
              {...field}
              type={inputType}
              placeholder={placeholder}
              onChange={(e) => sanitizeAndHandleChange(e, field.onChange)}
              className={clsx(
                icon && "pl-10",
                showPasswordToggle && "pr-10",
                "focus:ring-2 focus:ring-pry-500 transition-all",
                inputClassName
              )}
            />
            {showPasswordToggle && type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-pry-500 hover:cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
          </div>
          <ErrorMessage
            name={name}
            component="div"
            className="text-sm text-red-600 dark:text-red-400 mt-1"
          />
        </div>
      )}
    </Field>
  );
};

export default InputFormik;
