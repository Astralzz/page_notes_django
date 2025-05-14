import React, { useEffect, useRef } from "react";
import ModalDefault from "../../modals/ModalDefault";
import gsap from "gsap";
import Task from "@/models/Task";
import TaskView from "./TaskView";
import UpdateCreateTask from "./UpdateCreateTask";
import User from "@/models/User";

// Props
interface DashboardProps {
  user: User;
  statusModal: {
    isOpen: boolean;
    closeModal: () => void;
  };
  task?: Task;
}

/**
 * ModalTask component - ModalTask
 *
 * @returns {JSX.Element}
 */
const ModalTask: React.FC<DashboardProps> = ({ statusModal, task, user }) => {
  // Hooks
  const [isForm, setIsForm] = React.useState<boolean>(false);
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
    if (task) setTimeout(() => setIsForm(false), 500);
  }, [statusModal.isOpen, task]);

  // Animación al cambiar de pestaña
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isForm]);

  // Al cambiar user se cierre
  useEffect(() => {
    if (statusModal.isOpen === false) statusModal.closeModal();
  }, [statusModal, task]);

  return (
    <ModalDefault
      size={"sm"}
      statusModal={statusModal}
      title={task ? "Información de la nota" : "Crear nueva nota"}
    >
      <div ref={modalRef}>
        <div ref={contentRef} key={isForm ? "update" : "profile"}>
          {!task ? (
            <UpdateCreateTask user={user} />
          ) : !isForm ? (
            <TaskView
              task={task}
              updateAction={() => setIsForm(true)}
              deleteFinishAction={() => statusModal.closeModal()}
            />
          ) : (
            <UpdateCreateTask
              task={task}
              toggleAction={() => setIsForm(false)}
              user={user}
            />
          )}
        </div>
      </div>
    </ModalDefault>
  );
};

export default ModalTask;
