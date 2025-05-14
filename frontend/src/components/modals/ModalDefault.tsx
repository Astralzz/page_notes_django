// components/Modal/ModalDefault.tsx
import React from "react";
import clsx from "clsx";
import { gsap } from "gsap";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useThemeApp } from "@/hooks/useThemeApp";

interface ModalDefaultProps {
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  maxHeight?: string;
  hideHeader?: boolean;
  fullWidth?: boolean;
  footer?: React.ReactNode;
  statusModal: {
    isOpen: boolean;
    closeModal: () => void;
  };
  classNames?: {
    modalContainer?: string;
    header?: string;
    title?: string;
    closeButton?: string;
    content?: string;
    footer?: string;
  };
}

const sizeClasses = {
  sm: "min-w-sm",
  md: "min-w-md",
  lg: "min-w-lg",
  xl: "min-w-xl",
  "2xl": "min-w-2xl",
  full: "w-full max-w-full",
};

const ModalDefault: React.FC<ModalDefaultProps> = ({
  children,
  title,
  statusModal: { isOpen, closeModal },
  size = "md",
  maxHeight = "70vh",
  hideHeader = false,
  fullWidth = false,
  footer,
  classNames,
}) => {
  // Estado
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Variables redux
  const { isThemeDark } = useThemeApp();

  React.useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        ref={modalRef}
        className={clsx(
          "rounded-xl border p-6 shadow-xl transition-all bg-gradient-to-br",
          sizeClasses[size],
          "flex flex-col",
          fullWidth && "w-full",
          {
            "from-pry-100 to-pry-300": !isThemeDark,
            "dark from-pry-950 to-pry-800": isThemeDark,
            "text-white": isThemeDark,
            "text-gray-950": !isThemeDark,
          },
          classNames?.modalContainer
        )}
        style={{ maxHeight }}
      >
        {/* Header */}
        {!hideHeader && (
          <DialogHeader
            className={clsx("mb-4 flex justify-between", classNames?.header)}
          >
            <DialogTitle
              className={clsx(
                "text-lg font-semibold leading-tight",
                classNames?.title
              )}
            >
              {title}
            </DialogTitle>
            {/* Descripcion para adaptadores */}
            <DialogDescription className="sr-only">{title}</DialogDescription>
          </DialogHeader>
        )}

        {/* Body */}
        <div
          className={clsx(
            "overflow-y-auto custom-scrollbar flex-1 min-h-0",
            classNames?.content
          )}
          style={{ maxHeight }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <DialogFooter
            className={clsx("mt-4 border-t pt-4", classNames?.footer)}
          >
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDefault;
