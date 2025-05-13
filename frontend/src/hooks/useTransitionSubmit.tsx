import { useTransition, useCallback } from "react";

/**
 * Options
 *
 * @type {TArgs} - Tipo genérico que representa los argumentos que acepta la función que vas a ejecutar dentro del startTransition.
 */
interface UseTransitionSubmitOptions<TArgs extends unknown[]> {
  fn: (...args: TArgs) => void | Promise<void>;
}

/**
 * Reusable hook for wrapping any async function inside a transition.
 *
 * @param fn - Function to execute inside the transition
 * @returns A tuple with isPending and a submit function
 */
export function useTransitionSubmit<TArgs extends unknown[]>(
  options: UseTransitionSubmitOptions<TArgs>
): [boolean, (...args: TArgs) => void] {
  // Var
  const [isPending, startTransition] = useTransition();

  const submit = useCallback(
    (...args: TArgs) => {
      startTransition(() => {
        void options.fn(...args);
      });
    },
    [options]
  );

  return [isPending, submit];
}
