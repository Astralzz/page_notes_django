import React, { ComponentProps } from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";

interface TextareaFormikProps extends ComponentProps<typeof Textarea> {
  name: string;
  placeholder?: string;
  className?: string;
  textareaClassName?: string;
  disableSpaces?: boolean;
}

/**
 * TextareaFormik component
 *
 * @param props - Props for the TextareaFormik component
 *
 * @returns {JSX.Element} - A Formik textarea field with optional space sanitization
 */
const TextareaFormik: React.FC<TextareaFormikProps> = ({
  name,
  placeholder,
  className,
  textareaClassName,
  disableSpaces = false,
  ...props
}) => {
  const sanitizeAndHandleChange = React.useCallback(
    (
      e: React.ChangeEvent<HTMLTextAreaElement>,
      fieldOnChange: (event: React.ChangeEvent<any>) => void
    ) => {
      const rawValue = e.target.value;
      const sanitizedValue = disableSpaces
        ? rawValue.replace(/\s+/g, " ")
        : rawValue;

      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
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
        <div className={clsx("mb-3", className)}>
          <Textarea
            {...field}
            {...props}
            placeholder={placeholder}
            onChange={(e) => sanitizeAndHandleChange(e, field.onChange)}
            className={clsx(
              "focus:ring-2 focus:ring-pry-500 transition-all",
              "rounded-lg",
              textareaClassName
            )}
          />
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

export default TextareaFormik;
