/**
 * @template T
 * @description Tipo de respuesta general para listados en las APIs
 */
export type ApiListResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
};

/**
 * @description TOpciones para query de lista
 */
export type ParamQueryList = {
  page?: number;
  search?: string;
};

/**
 * @description - Tipo de respuesta para la autenticación
 */
export type AuthResponse = {
  access?: string;
  refresh?: string;
};
