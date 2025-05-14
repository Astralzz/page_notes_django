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

  // Al abrir
  useEffect(() => {
    // ? Se abrió y ahi ref
    if (statusModal.isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
      return;
    }

    // Cerrado
    setTimeout(() => setIsUpdate(false), 500);
  }, [statusModal.isOpen]);

  // Animación al cambiar de pestaña
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isUpdate]);

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
