import React from "react";
import { Notebook } from "lucide-react";
import { FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import { submitForm } from "@/utils/submitsActions";
import { useTransitionSubmit } from "@/hooks/useTransitionSubmit";
import Task, { TaskRegister } from "@/models/Task";
import InputFormik from "@/components/formik/InputFormik";
import GenericFormikForm from "@/components/formik/GenericFormikForm";
import CheckboxFormik from "@/components/formik/CheckboxFormik";
import { globalApiTaskService } from "@/api/ApiTaskrService";
import TextareaFormik from "@/components/formik/TextareaFormik";

// Props
interface RegisterTaskFormikProps<T = any> {
  task?: Task;
  onSubmitFinishSuccess?: (data: T) => void | Promise<void>;
}

/**
 *  RegisterTaskFormik component
 *
 * @param props - Props for the RegisterTaskFormik component
 *
 * @returns {JSX.Element} - A Formik form for task registration
 */
const RegisterTaskFormik: React.FC<RegisterTaskFormikProps> = ({
  task,
  onSubmitFinishSuccess,
}) => {
  // Existe usuario
  const isEditing = !!task;

  // Esquema
  const getSchema = React.useMemo(
    () => ({
      validationSchema: Yup.object().shape({
        title: Yup.string()
          .min(3, "Mínimo 3 caracteres")
          .max(120, "Máximo 120 caracteres")
          .required("Requerido"),
        description: Yup.string()
          .min(3, "Mínimo 3 caracteres")
          .max(1000, "Máximo 1000 caracteres")
          .required("Requerido"),
        completed: Yup.boolean().required("Requerido"),
      }),
      // Valores de inicio
      initialValues: isEditing
        ? {
            title: task?.title ?? "",
            description: task?.description ?? "",
            completed: task?.completed,
          }
        : {
            title: "",
            description: "",
            completed: false,
          },
    }),
    [isEditing, task]
  );

  // Acción
  const [isPending, submit] = useTransitionSubmit({
    fn: React.useCallback(
      async (
        values: FormikValues,
        formikHelpers: FormikHelpers<FormikValues>
      ) => {
        // Datos
        const { title, description, completed } = values;

        // Datas
        const taskData: TaskRegister = {
          title,
          description,
          completed,
        };

        // Acciones
        const extra = {
          // Acciones
          actions: {
            onSuccess: (res: Task) => {
              onSubmitFinishSuccess?.(res);
              if (!isEditing) {
                formikHelpers.resetForm();
              }
            },
            onFinish: () => formikHelpers.setSubmitting(false),
          },
          // Opciones
          optionsSubmit: {
            isSendNotifyError: true,
            notifySuccessMessage: isEditing
              ? `La nota se actualizó correctamente`
              : `La nota se creó correctamente`,
          },
        };

        // Es edición
        if (isEditing) {
          await submitForm<
            Task,
            {
              taskData: TaskRegister;
              taskId: number;
            }
          >(
            globalApiTaskService.updateTask.bind(globalApiTaskService),
            {
              taskData: taskData,
              taskId: task.id,
            },
            extra.actions,
            extra.optionsSubmit
          );
        } else {
          await submitForm<Task, TaskRegister>(
            globalApiTaskService.createTask.bind(globalApiTaskService),
            taskData,
            extra.actions,
            extra.optionsSubmit
          );
        }
      },
      [isEditing, onSubmitFinishSuccess, task?.id]
    ),
  });

  return (
    <GenericFormikForm
      initialValues={getSchema.initialValues}
      validationSchema={getSchema.validationSchema}
      title={!isEditing ? "Crear nueva nota" : undefined}
      onSubmit={submit}
      button={{ text: isEditing ? "Guardar cambios" : "Crear nota" }}
      loading={isPending}
    >
      {() => (
        <>
          <div>
            <InputFormik
              name="title"
              placeholder="Titulo"
              icon={<Notebook size={20} />}
            />
            <TextareaFormik name="description" placeholder="Descripcion" />
            <CheckboxFormik
              name="completed"
              label="¿Marcar como completada?"
              classNames={{
                container: "ml-2 mt-4",
                label: "text-xs",
              }}
            />
          </div>
        </>
      )}
    </GenericFormikForm>
  );
};

export default RegisterTaskFormik;
