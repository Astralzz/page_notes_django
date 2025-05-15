import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Task from "@/models/Task";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import DeleteWithConfirm from "@/components/alerts/DeleteWithConfirm";
import { useTransitionSubmit } from "@/hooks/useTransitionSubmit";
import { submitForm } from "@/utils/submitsActions";
import { globalApiTaskService } from "@/api/ApiTaskrService";
import User from "@/models/User";
import useAuthActions from "@/hooks/useAuthActions";

/**
 * Props
 */
interface DashboardProps {
  task: Task;
  user: User;
  updateAction: () => void;
  deleteFinishAction?: () => void;
}

/**
 * TaskView component (designed for use inside a modal)
 */
const TaskView: React.FC<DashboardProps> = ({
  task,
  user,
  updateAction,
  deleteFinishAction,
}) => {
  // Hook
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { updateUser } = useAuthActions();

  // Eliminar task por ID
  const removeTask = React.useCallback(
    (taskId: number) => {
      // ? Sin user
      if (!user || !taskId) return;

      // Filtramos tareas
      const updatedTasks =
        user.tasks?.filter((task) => task.id !== taskId) ?? [];

      // Nuevo objeto user con tareas actualizadas
      const newUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        tasks: updatedTasks,
      };

      updateUser(newUser);
    },
    [updateUser, user]
  );

  // Acción
  const [isDeleting, deleteTask] = useTransitionSubmit({
    fn: React.useCallback(async () => {
      // Id task
      const idTask = task.id;

      // Enviamos el formulario
      submitForm<
        void,
        {
          idTak: number;
        }
      >(
        globalApiTaskService.deleteTask.bind(globalApiTaskService),
        {
          idTak: idTask,
        },
        {
          onSuccess() {
            removeTask(idTask);
            deleteFinishAction?.();
          },
          onFinish: () => setIsDialogOpen(false),
        },
        {
          isSendNotifyError: true,
          notifySuccessMessage: "La nota se elimino correctamente",
          resIsVoid: true,
        }
      );
    }, [deleteFinishAction, removeTask, task.id]),
  });

  return (
    <div className="space-y-6 px-2 py-1">
      {/* Título */}
      <h2 className="text-2xl font-semibold text-pry-600 dark:text-pry-300">
        {task.title || "Sin título"}
      </h2>

      {/* Descripción */}
      <div className="text-slate-700 dark:text-slate-200 whitespace-pre-line text-base leading-relaxed">
        {task.description || "No hay descripción para esta nota."}
      </div>

      {/* Estado */}
      <p
        className={clsx(
          "text-sm font-medium inline-block px-3 py-1 rounded-full",
          task.completed
            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
        )}
      >
        {task.completed ? "Completada" : "Pendiente"}
      </p>

      {/* Botones */}
      <div className="flex justify-end gap-2">
        {/* Ver nota */}
        <Button
          onClick={() => setIsDialogOpen(true)}
          className={clsx(
            "flex items-center gap-2 rounded-xl text-white shadow-sm transition-all",
            "bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500",
            "dark:from-red-700 dark:to-red-600 dark:hover:from-red-800 dark:hover:to-red-700",
            "hover:cursor-pointer"
          )}
        >
          <Trash2 className="w-4 h-4" />
          Eliminar
        </Button>

        {/* Editar */}
        <Button
          onClick={updateAction}
          className={clsx(
            "flex items-center gap-2 rounded-xl text-white shadow-sm transition-all",
            "bg-gradient-to-r from-pry-500 to-pry-400 hover:from-pry-600 hover:to-pry-500",
            "dark:from-pry-700 dark:to-pry-600 dark:hover:from-pry-800 dark:hover:to-pry-700",
            "hover:cursor-pointer"
          )}
        >
          <Pencil className="w-4 h-4" />
          Editar nota
        </Button>
      </div>

      {/* Alerta */}
      <DeleteWithConfirm
        onConfirm={deleteTask}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        description="¿Estás seguro de que deseas eliminar esta nota? Esta acción no se puede deshacer."
        isLoadingAction={isDeleting}
      />
    </div>
  );
};

export default TaskView;
