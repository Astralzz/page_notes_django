/**
 * Recorre recursivamente cualquier estructura de errores y devuelve un array de strings.
 *
 * @param {unknown} errors - Error que puede ser string, objeto, array, número, etc.
 * @returns {string[]} - Array de mensajes de error.
 */
export const getErrorMessages = (errors: unknown): string[] => {
  // Mensajes
  const messages: string[] = [];

  // Función recursiva para recorrer el error
  const traverse = (err: unknown) => {
    // ? Es un string
    if (typeof err === "string") {
      messages.push(err);
      // ? Es un arreglo
    } else if (Array.isArray(err)) {
      err.forEach(traverse);
      // ? Es un objeto
    } else if (typeof err === "object" && err !== null) {
      Object.values(err).forEach(traverse);
      // ? Es un numero o booleano
    } else if (typeof err === "number" || typeof err === "boolean") {
      messages.push(String(err));
    }
  };

  traverse(errors);

  // Esta vació
  if (messages.length === 0) messages.push("Error desconocido");

  return [...new Set(messages)];
};
