import React, { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { ErrorMessage } from "formik";
import { ImageIcon, X } from "lucide-react";
import clsx from "clsx";

// Props
interface ImageUploaderFormikProps {
  name?: string;
  setFieldValue: (field: string, value: any) => void;
  className?: string;
  showPreview?: boolean;
  previewClassName?: string;
  label?: string;
  helpText?: string;
  accept?: Accept;
  single?: boolean;
}

/**
 *  ImageUploaderFormik component
 *
 * @param props - Props for the ImageUploaderFormik component
 *
 * @returns {JSX.Element} - A Formik image uploader with drag-and-drop functionality
 */
export const ImageUploaderFormik: React.FC<ImageUploaderFormikProps> = ({
  name = "avatar",
  setFieldValue,
  className,
  showPreview = true,
  previewClassName,
  label,
  helpText,
  accept = { "image/*": [] },
  single = false,
}) => {
  // State to manage the preview of the image
  const [preview, setPreview] = useState<string | null>(null);

  // Callback to handle the drop event
  const onDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      setFieldValue(name, single ? file : files);
      if (showPreview && file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    },
    [setFieldValue, name, showPreview, single]
  );

  // Function to clear the image preview
  const clearImage = () => {
    setPreview(null);
    setFieldValue(name, null);
  };

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
    multiple: !single,
    disabled: single && !!preview,
  });

  return (
    <div className={clsx("space-y-2", className)}>
      {label && !preview && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      {/* Show preview if single image and preview is available */}
      {single && preview ? (
        <div className="flex w-full items-center justify-center">
          <div className="relative inline-block w-32 h-32">
            <img
              src={preview}
              alt="Vista previa"
              className={clsx(
                "rounded-md object-cover w-full h-full",
                previewClassName
              )}
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-[-10px] right-[-10px] bg-white text-red-600 rounded-full p-1 shadow hover:bg-red-100"
              aria-label="Eliminar imagen"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={clsx(
            "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors",
            isDragActive
              ? "border-pry-500 bg-pry-50"
              : "border-pry-200 hover:border-pry-300"
          )}
        >
          <input {...getInputProps()} />
          <ImageIcon
            className="mx-auto mb-2 text-pry-500 dark:text-pry-300"
            size={24}
          />
          <p className="text-sm text-pry-600 dark:text-pry-300">
            {isDragActive
              ? "Suelta la imagen aquí"
              : "Arrastra o haz click para subir tu foto"}
          </p>
          {helpText && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {helpText}
            </p>
          )}
        </div>
      )}

      {!single && showPreview && preview && (
        <img
          src={preview}
          alt="Vista previa"
          className={clsx(
            "rounded-md w-32 h-32 object-cover",
            previewClassName
          )}
        />
      )}

      {name && (
        <ErrorMessage
          name={name}
          component="div"
          className="text-sm dark:text-red-400 text-red-600"
        />
      )}
    </div>
  );
};

export default ImageUploaderFormik;
