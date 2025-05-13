import React from "react";
import ModalDefault from "./ModalDefault";
import User from "@/models/User";
import { Button } from "../ui/button";
import { Pencil, FileText, Phone, User as UserIcon } from "lucide-react"; // Icono para las notas
import clsx from "clsx";

// Props
interface DashboardProps {
  statusModal: {
    isOpen: boolean;
    closeModal: () => void;
  };
  user: User;
}

/**
 * ModalUser component - ModalUser
 *
 * @returns {JSX.Element}
 */
const ModalUser: React.FC<DashboardProps> = ({ statusModal, user }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (statusModal.isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [statusModal.isOpen]);

  const { profile } = user;
  const fullName = `${profile?.nombre ?? "Nombre"} ${profile?.apellido ?? ""}`;

  return (
    <ModalDefault statusModal={statusModal} title="Información del Usuario">
      <div
        ref={modalRef}
        className="flex flex-col items-center gap-6 p-4 sm:flex-row sm:items-start max-h-[80vh] overflow-y-auto"
      >
        {/* Foto de perfil */}
        <div className="relative w-32 h-32 shrink-0 rounded-full overflow-hidden border-2 border-primary">
          <img
            src={profile?.foto_url || "/images/default-avatar.png"}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info de usuario */}
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold">{fullName}</h2>
          <p className="text-muted-foreground text-sm">{user.email}</p>
          {user?.username && (
            <p className="text-sm text-gray-700 dark:text-gray-400">
              <UserIcon className="inline-block w-4 h-4 mr-2 text-gray-800 dark:text-gray-300" />
              {user.username}
            </p>
          )}
          {profile?.telefono && (
            <p className="text-sm text-gray-700 dark:text-gray-400">
              <Phone className="inline-block w-4 h-4 mr-2 text-gray-800 dark:text-gray-300" />
              {profile.telefono}
            </p>
          )}

          {/* Notas creadas */}
          <div className="flex items-center gap-2 mt-2">
            <FileText className="w-4 h-4 text-gray-800 dark:text-gray-300" />
            <span className="text-sm text-gray-700 dark:text-gray-400">
              {user?.tasks?.length} Notas Creadas
            </span>
          </div>
        </div>
      </div>

      {/* Botón de editar */}
      <div className="flex justify-center mt-6 sm:justify-end">
        <Button
          variant="outline"
          className={clsx(
            "gap-2 text-white hover:text-white rounded-xl transition-all",
            "bg-gradient-to-r from-pry-500 to-pry-400 hover:cursor-pointer",
            "hover:from-pry-600 hover:to-pry-500",
            "dark:from-pry-800 dark:to-pry-700",
            "dark:hover:from-pry-800 dark:hover:to-pry-800"
          )}
          onClick={() => console.log("Editar perfil")}
        >
          <Pencil className="w-4 h-4" />
          Editar perfil
        </Button>
      </div>
    </ModalDefault>
  );
};

export default ModalUser;
