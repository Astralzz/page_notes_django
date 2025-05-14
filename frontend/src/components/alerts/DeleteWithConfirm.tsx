import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import clsx from "clsx";
import { useThemeApp } from "@/hooks/useThemeApp";
import { Loader2 } from "lucide-react";

// Props
interface DeleteWithConfirmProps {
  onConfirm: () => void;
  description?: string;
  confirmText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isLoadingAction?: boolean;
}

/**
 * DeleteWithConfirm component
 */
const DeleteWithConfirm: React.FC<DeleteWithConfirmProps> = ({
  onConfirm,
  description = "¿Estás seguro de que deseas eliminar esto? Esta acción no se puede deshacer.",
  confirmText = "Confirmar eliminación",
  open,
  onOpenChange,
  isLoadingAction,
}) => {
  // Variables redux
  const { isThemeDark } = useThemeApp();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={clsx("bg-gradient-to-br", {
          "from-pry-100 to-pry-300": !isThemeDark,
          "dark from-pry-950 to-pry-800": isThemeDark,
          "text-white": isThemeDark,
          "text-gray-950": !isThemeDark,
        })}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-900"
            onClick={onConfirm}
            disabled={isLoadingAction}
          >
            {isLoadingAction ? (
              <Loader2 className="animate-spin" />
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWithConfirm;
