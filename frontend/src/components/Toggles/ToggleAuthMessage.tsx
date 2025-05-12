import React from "react";
import clsx from "clsx";

// Props
interface ToggleAuthMessageProps {
  message: string;
  actionText: string;
  onAction: () => void;
  classNames?: {
    message?: string;
    actionText?: string;
  };
}

/**
 * ToggleAuthMessage component
 *
 * @param props - Props for the ToggleAuthMessage component
 *
 * @returns {JSX.Element} - A message with an action button for toggling authentication modes
 */
const ToggleAuthMessage: React.FC<ToggleAuthMessageProps> = ({
  message,
  actionText,
  onAction,
  classNames,
}) => {
  return (
    <p className={clsx("text-center text-pry-600 mt-4", classNames?.message)}>
      {message}{" "}
      <button
        onClick={onAction}
        className={clsx(
          "font-semibold underline underline-offset-4 hover:cursor-pointer",
          classNames?.actionText
        )}
      >
        {actionText}
      </button>
    </p>
  );
};

export default ToggleAuthMessage;
