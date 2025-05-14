import React from "react";
import ToggleAuthMessage from "@/components/Toggles/ToggleAuthMessage";
import Task from "@/models/Task";
import useAuthActions from "@/hooks/useAuthActions";
import User from "@/models/User";
import RegisterTaskFormik from "./RegisterTaskFormik";

// Props
interface DashboardProps {
  user: User;
  task?: Task;
  toggleAction?: () => void;
}

/**
 * UpdateCreateTask component
 */
const UpdateCreateTask: React.FC<DashboardProps> = ({
  user,
  task,
  toggleAction,
}) => {
  // Hook
  const { updateUser } = useAuthActions();

  // Actualizar task
  const update = React.useCallback(
    (newTask: Task) => {
      // ? Sin user
      if (!user) return;

      // Actualizamos
      const updatedTasks =
        user.tasks?.map((task) => (task.id === newTask.id ? newTask : task)) ??
        [];

      // Nuevo
      const newUser = {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        profile: user.profile,
        tasks: updatedTasks,
      };

      updateUser(newUser);

      toggleAction?.();
    },
    [toggleAction, updateUser, user]
  );

  console.log(user);

  // Actualizar task
  const create = React.useCallback(
    (newTask: Task) => {
      // ? Sin user
      if (!user || !newTask) return;

      // Añadimos
      const updatedTasks = [newTask, ...(user?.tasks ?? [])];

      // Nuevo
      const newUser = {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        profile: user.profile,
        tasks: updatedTasks,
      };

      updateUser(newUser);
    },
    [updateUser, user]
  );

  return (
    <div className="w-full my-3">
      {/* Formulario */}
      <RegisterTaskFormik
        onSubmitFinishSuccess={task ? update : create}
        task={task}
      />
      {/* Toggle message */}
      {task && toggleAction && (
        <ToggleAuthMessage
          message={"¿No estas seguro?"}
          actionText={"VVolver"}
          onAction={toggleAction}
        />
      )}
    </div>
  );
};

export default UpdateCreateTask;
