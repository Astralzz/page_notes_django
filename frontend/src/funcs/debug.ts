import moment from "moment";

/**
 * Control global para activar/desactivar logs
 */
const DEBUG_ENABLED = true;

/**
 * Visualizar datos de salida para debugging
 *
 * @param {string} title - Título opcional para agrupar los logs
 * @param {Record<string, any>} data - Objeto con datos a mostrar
 */
export const viewDebugApp = (
  data: Record<string, any> | any, // Ahora puede aceptar cualquier tipo de dato
  options?: {
    title?: string;
    hiddenHour?: string;
    hiddenLineStart?: boolean;
    hiddenLineFinish?: boolean;
  }
): void => {
  // ? Debug disable
  if (!DEBUG_ENABLED) return;

  const {
    title,
    hiddenHour = false,
    hiddenLineFinish = false,
    hiddenLineStart = false,
  } = options || {};

  // Obtener la hora actual con Moment.js
  const timeStamp = hiddenHour
    ? "----------"
    : moment().format("YYYY-MM-DD HH:mm:ss");

  // Título con la hora para tener más contexto
  if (!hiddenLineStart) console.log(`\n------------[${timeStamp}]------------`);
  if (title) console.log(`\n${title}\n`);

  // Función para manejar FormData, Map, Set, etc.
  const handleSpecialTypes = (value: any) => {
    // ? Es formData
    if (value instanceof FormData) {
      // Mostramos las entradas
      const formDataEntries: Record<string, string> = {};
      value.forEach((val, key) => {
        formDataEntries[key] =
          typeof val === "string" ? val : `[File: ${val.name}]`;
      });
      return JSON.stringify(formDataEntries, null, 2); // Convertirlo en JSON para que se vea bien
    }

    if (value instanceof Map) {
      // Si es un Map, lo convertimos en un array de pares clave-valor
      return JSON.stringify(Array.from(value.entries()), null, 2);
    }

    if (value instanceof Set) {
      // Si es un Set, lo convertimos en un array
      return JSON.stringify(Array.from(value), null, 2);
    }

    if (typeof Buffer !== "undefined" && Buffer.isBuffer(value)) {
      // Si es un buffer, lo mostramos en su formato hexadecimal
      return value.toString("hex");
    }

    // Si no es ninguno de estos casos, lo devolvemos tal cual
    return value;
  };

  // Comprobar si el dato es un objeto o no
  if (typeof data === "object" && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      try {
        const output =
          typeof value === "string" ||
          typeof value === "number" ||
          value instanceof Date
            ? value
            : handleSpecialTypes(value); // Llamamos a la función para manejar tipos especiales
        console.log(`  ${key}:`, output);
      } catch (err) {
        console.error(`  ${key}: [Error al serializar]`, err);
      }
    });
  } else {
    // Si no es un objeto, simplemente lo mostramos
    console.log(data);
  }

  // Finish
  if (!hiddenLineFinish)
    console.log("\n-----------------------------------------");
};
