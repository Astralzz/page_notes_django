import React, { useState } from "react";
import { useAuthApp } from "@/hooks/useAuthApp";
import { Plus } from "lucide-react";
import gsap from "gsap";
import clsx from "clsx";
import ModalTask from "@/components/pages/tasks/ModalTask";
import Task from "@/models/Task";
import FilterSelect from "@/components/selects/FilterSelect";
import { useThemeApp } from "@/hooks/useThemeApp";

const filterOptions = [
  { label: "Todas", value: "all" },
  { label: "Completadas", value: "completed" },
  { label: "No completadas", value: "incomplete" },
];

type FilterType = (typeof filterOptions)[number]["value"];

/**
 *
 * NotesPage component - Main
 *
 * @returns {JSX.Element}
 */
const NotesPage: React.FC = () => {
  // Hooks
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isOpenModalTask, setOpenModalTask] = useState<boolean>(false);
  const [taskSelect, setTaskSelect] = useState<Task | undefined>(undefined);
  const [listTasks, setListTasks] = useState<Task[]>([]);
  const { isThemeDark } = useThemeApp();
  const { user } = useAuthApp();

  // Animación al montar
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".notes-title", { y: -20, opacity: 0, duration: 0.5 });
      tl.from(".create-note-button", {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Al cambiar user se cierre
  React.useEffect(() => {
    setOpenModalTask(false);
    setTaskSelect(undefined);
    setListTasks(user?.tasks ?? []);
    setFilter("all");
  }, [user?.tasks]);

  // Notas filtradas
  const getFilteredTasks = React.useMemo(
    () =>
      listTasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
      }),
    [filter, listTasks]
  );

  return (
    <>
      <div ref={containerRef} className="relative w-full">
        {/* Header */}
        <div
          className={clsx(
            "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-4 sm:gap-y-0 mb-6",
            "notes-title"
          )}
        >
          {/* Título */}
          <h2
            className={clsx(
              "text-3xl font-bold",
              "text-pry-800 dark:text-pry-100"
            )}
          >
            Mis Notas
          </h2>

          {/* Contenedor del filtro y botón */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            {/* Selector de filtro */}
            <div className={clsx("create-note-button group")}>
              <FilterSelect
                value={filter}
                onChange={setFilter}
                options={filterOptions}
                placeholder="Filtrar notas"
                isThemeDark={isThemeDark}
                classNames={{
                  trigger: clsx(
                    "flex items-center gap-2 px-3 py-2 rounded-xl shadow-md transition-transform transform",
                    "group-hover:scale-105 group-hover:rotate-1 hover:shadow-xl",
                    "bg-pry-500 dark:bg-pry-700 hover:bg-pry-600 dark:hover:bg-pry-600",
                    "text-white text-sm hover:cursor-pointer border-none"
                  ),
                }}
              />
            </div>

            {/* Botón flotante */}
            <button className={clsx("create-note-button group")}>
              <div
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 rounded-xl shadow-md transition-transform transform",
                  "group-hover:scale-105 group-hover:rotate-1 hover:shadow-xl",
                  "bg-pry-500 dark:bg-pry-700 hover:bg-pry-600 dark:hover:bg-pry-600",
                  "text-white text-sm hover:cursor-pointer"
                )}
                onClick={() => {
                  setTaskSelect(undefined);
                  setOpenModalTask(true);
                }}
              >
                <Plus className="h-4 w-4" />
                <span className="font-medium">Crear nueva nota</span>
              </div>
            </button>
          </div>
        </div>

        {/* Grid de Notas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {getFilteredTasks.length ? (
            getFilteredTasks.map((task, i) => (
              <div className="group" key={i}>
                <div
                  className={clsx(
                    "note-card p-4 rounded-xl shadow-md transition-all duration-300",
                    "transform transition-transform",
                    "group-hover:scale-110 group-hover:rotate-1 hover:shadow-3xl",
                    "bg-white dark:bg-pry-950 cursor-pointer"
                  )}
                  onClick={() => {
                    setTaskSelect(task);
                    setOpenModalTask(true);
                  }}
                >
                  <h3 className="font-semibold text-pry-900 dark:text-pry-100">
                    {task.title || "Sin título"}
                  </h3>
                  <p className="text-sm text-pry-700 dark:text-pry-300">
                    {task.description || "Sin descripción"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div
              className={clsx("note-card", "text-pry-800 dark:text-pry-200")}
            >
              No tienes notas aún.
            </div>
          )}
        </div>
      </div>

      {/* Modal task */}
      {user && (
        <ModalTask
          statusModal={{
            closeModal: () => setOpenModalTask(false),
            isOpen: isOpenModalTask,
          }}
          task={taskSelect}
          user={user}
        />
      )}
    </>
  );
};

export default NotesPage;
