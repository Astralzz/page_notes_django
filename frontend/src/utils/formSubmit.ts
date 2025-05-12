import { getErrorMessages } from "@/funcs/global";
import { setNotifyDefault } from "../funcs/notify";

/**
 * Enviar formularios usando Inertia con manejo de errores y notificaciones.
 *
 * @template T - Tipo de los valores del formulario.
 * @param {string} url - URL a la que se enviará el formulario.
 * @param {T} values - Valores a recibir.
 * @param {V} values - Valores del formulario a enviar.
 * @param {Object} options - Opciones para manejar el envío del formulario.
 *
 * @returns {Promise<void>} - Promesa que se resuelve cuando el formulario se envía correctamente.
 */
export async function submitFormPost<T, V extends Record<string, any>>(
  action: (data: V, id?: number) => Promise<T>,
  values: V,
  {
    onSuccess,
    onError,
    resetFields,
    onFinish,
  }: {
    onSuccess: (response: T) => void;
    onError: (errors: unknown) => void;
    resetFields?: (values: V) => Partial<V>;
    onFinish?: () => void;
  },
  options?: {
    isSendNotify?: boolean;
  }
): Promise<void> {
  try {
    // ? Enviamos el formulario
    const res = await action(values, 0);

    // ? Si hay respuesta
    if (res) {
      onSuccess?.(res);

      // ? Resetear valores
      if (resetFields) {
        const updatedValues = resetFields(values);
        Object.assign(values, updatedValues);
      }

      // Salimos del try
      return;
    }

    // Mandar error
    throw new Error("No se ha podido enviar el formulario");

    // ! Error
  } catch (errs) {
    console.log("Error en el submit", errs);
    // ? Mostramos errores
    if (options?.isSendNotify) {
      getErrorMessages(errs).forEach((msg) => setNotifyDefault(msg, "error"));
    }
    // ? Errors es diferente
    onError?.(errs);
  }

  // Al final
  onFinish?.();
}
