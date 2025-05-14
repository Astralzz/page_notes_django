import React from "react";
import RegisterFormik from "@/components/formik/RegisterFormik";
import ToggleAuthMessage from "@/components/Toggles/ToggleAuthMessage";
import User from "@/models/User";
import useAuthActions from "@/hooks/useAuthActions";

// Props
interface DashboardProps {
  user: User;
  profileAction: () => void;
}

/**
 * UpdateUser component
 */
const UpdateUser: React.FC<DashboardProps> = ({ user, profileAction }) => {
  // Hook
  const { updateUser } = useAuthActions();

  // Actualizar user
  const update = React.useCallback(
    (newUser: User) => {
      updateUser(newUser);
    },
    [updateUser]
  );

  return (
    <div className="w-full my-3">
      {/* Formulario */}
      <RegisterFormik onSubmitFinishSuccess={update} user={user} />
      {/* Toggle message */}
      <ToggleAuthMessage
        message={"¿No estas seguro?"}
        actionText={"VVolver"}
        onAction={profileAction}
      />
    </div>
  );
};

export default UpdateUser;
