import React, { useEffect, useRef } from "react";
import ModalDefault from "../../modals/ModalDefault";
import User from "@/models/User";
import ProfileUser from "./ProfileUser";
import UpdateUser from "./UpdateUser";
import gsap from "gsap";

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
  // Hooks
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animación al cambiar de pestaña
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isUpdate]);

  // Al cambiar user se vuela al perfil
  useEffect(() => {
    if (statusModal.isOpen === true) setIsUpdate(false);
  }, [statusModal, user]);

  return (
    <ModalDefault
      size={isUpdate ? "xl" : "sm"}
      statusModal={statusModal}
      title="Información del Usuario"
    >
      <div ref={modalRef}>
        <div ref={contentRef} key={isUpdate ? "update" : "profile"}>
          {isUpdate ? (
            <UpdateUser user={user} profileAction={() => setIsUpdate(false)} />
          ) : (
            <ProfileUser user={user} updateAction={() => setIsUpdate(true)} />
          )}
        </div>
      </div>
    </ModalDefault>
  );
};

export default ModalUser;
