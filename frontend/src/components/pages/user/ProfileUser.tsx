import React from "react";
import { Pencil, FileText, Phone, User as UserIcon } from "lucide-react";
import User from "@/models/User";
import { Button } from "../../ui/button";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Props
interface DashboardProps {
  user: User;
  updateAction: () => void;
}

/**
 * ProfileUser component
 */
const ProfileUser: React.FC<DashboardProps> = ({ user, updateAction }) => {
  // Datos
  const { profile } = user;
  const fullName = `${profile?.nombre ?? "Nombre"} ${profile?.apellido ?? ""}`;
  const avatar = profile?.foto_url;
  console.log("avatar", profile?.foto_url);

  return (
    <div className="w-full space-y-6">
      {/* Contenedor principal responsivo */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Foto de perfil */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
          <Avatar className="w-full h-full object-cover">
            <AvatarImage src={avatar} alt="Foto de perfil" />
            <AvatarFallback className={clsx("text-4xl dark:text-white")}>
              {(user?.profile?.nombre ?? "N").charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Información del usuario */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold">{fullName}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>

          {user.username && (
            <p className="text-sm text-gray-700 dark:text-gray-400 flex items-center justify-center md:justify-start gap-2">
              <UserIcon className="w-4 h-4 text-gray-800 dark:text-gray-300" />
              {user.username}
            </p>
          )}

          {profile?.telefono && (
            <p className="text-sm text-gray-700 dark:text-gray-400 flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-4 h-4 text-gray-800 dark:text-gray-300" />
              {profile.telefono}
            </p>
          )}

          {/* Notas creadas */}
          <div className="flex items-center justify-center md:justify-start gap-2 pt-2">
            <FileText className="w-4 h-4 text-gray-800 dark:text-gray-300" />
            <span className="text-sm text-gray-700 dark:text-gray-400">
              {user?.tasks?.length ?? 0} Notas Creadas
            </span>
          </div>
        </div>
      </div>

      {/* Botón de editar */}
      <div className="flex justify-center md:justify-end">
        <Button
          variant="outline"
          className={clsx(
            "gap-2 text-white rounded-xl transition-all",
            "bg-gradient-to-r from-pry-500 to-pry-400",
            "hover:from-pry-600 hover:to-pry-500",
            "dark:from-pry-800 dark:to-pry-700",
            "dark:hover:from-pry-800 dark:hover:to-pry-800",
            "hover:cursor-pointer dark:text-white"
          )}
          onClick={updateAction}
        >
          <Pencil className="w-4 h-4" />
          Editar perfil
        </Button>
      </div>
    </div>
  );
};

export default ProfileUser;
