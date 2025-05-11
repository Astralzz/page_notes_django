/**
 * @const {HeaderApi}
 * @description Claves válidas para headers personalizados en las peticiones Axios
 */
export const HeaderApi = {
  USER_ID: "X-User-Id",
} as const;

// Keys
export type HeaderApiKey = keyof typeof HeaderApi;

// Type
export type HeaderApiType = (typeof HeaderApi)[HeaderApiKey];

/**
 * @description Payload posible para cabeceras personalizadas
 */
export type HeaderApiPayload = Partial<{
  [HeaderApi.USER_ID]: number;
}>;

/**
 * @description Objeto con todos los headers válidos
 */
export const getHeaderApiValues = (): HeaderApiType[] =>
  Object.values(HeaderApi);

/**
 * @description Valida si un string es un header válido
 */
export const isHeaderApi = (value: string): value is HeaderApiType =>
  getHeaderApiValues().includes(value as HeaderApiType);
