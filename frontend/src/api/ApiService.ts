import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { HeaderApiPayload } from "../const/api/HeaderApi.ts";

/**
 * @description - Clase base para manejar operaciones HTTP comunes
 *
 * @class ApiService
 */
abstract class ApiService {
  /**
   * @var {?string} - URL del backend
   */
  private URL_BACKEND_API = process.env.REACT_APP_URL_BACKEND_API || undefined;

  /**
   * @description - Método abstracto para obtener el endpoint
   *
   * @returns {string} - Endpoint de la API
   */
  // abstract getEndpoint(): string;

  /**
   * @description - Método para obtener la URL del backend
   *
   * @returns {string} - URL del backend
   */
  private getUrlBackend = (): string => {
    // ? Url no encontrada
    if (!this.URL_BACKEND_API)
      throw new Error("No se pudo encontrar la ruta al servidor");

    return this.URL_BACKEND_API;
  };

  /**
   * Comprobar datos indefinidos
   *
   * @param res
   * @param mensaje
   * @throws Error
   *
   * @returns {T}
   */
  private checkIntegrityData = <T>(res: AxiosResponse, mensaje?: string): T => {
    // ? Sin datos
    if (!res?.data) {
      throw new Error(
        mensaje ?? `Los datos son indefinidos para la URL: ${res.config.url}`
      );
    }

    return res.data;
  };

  /**
   * @description - Método para convertir un objeto a FormData
   *
   * @returns {FormData} - FormData generado
   */
  private toFormData(obj: Record<string, any>): FormData {
    // Creamos un nuevo FormData
    const formData = new FormData();

    // Recorremos el objeto
    Object.entries(obj).forEach(([key, value]) => {
      // ? Es un array
      if (Array.isArray(value)) {
        value.forEach((item, i) => formData.append(`${key}[${i}]`, item));
        // ? File o Blob
      } else if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
        // ? objeto
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
        // ? indefinido o nulo
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    return formData;
  }

  /**
   * Configuración de axios
   *
   * @param headerApi - Headers personalizados
   * @param asFormData - Si es FormData
   * @param timeout - Tiempo de espera
   *
   * @returns {AxiosRequestConfig}
   */
  private getConfigAxios = (
    headerApi?: HeaderApiPayload,
    asFormData?: boolean,
    timeout?: number
  ): AxiosRequestConfig => {
    // ? Configuración
    const config: AxiosRequestConfig = {
      headers: {
        ...headerApi,
        "Content-Type": asFormData ? "multipart/form-data" : "application/json",
      },
      timeout, // n segundos
    };

    return config;
  };

  /**
   * Manejo del error axios
   *
   * @param err - Error tomado
   * @throws AxiosError
   */
  private catchAxiosError = <T>(err: unknown): Promise<T> => {
    // ? Error de axios
    if (axios.isAxiosError(err)) {
      // Convertimos
      const axiosErr = err as AxiosError;

      // Respuesta
      const responseData = axiosErr.response?.data as Record<string, any>;

      // ? Existe error
      if (responseData?.error) {
        return Promise.reject(new Error(`Error: ${responseData.error}`));
      }

      // ? Es un objeto
      if (responseData && typeof responseData === "object") {
        const errorMessages = Object.values(responseData).flatMap((item) =>
          Array.isArray(item) ? item : [item]
        );
        return Promise.reject(new Error(errorMessages.join(", ")));
      }

      // Errores generales
      return Promise.reject(
        new Error(
          `Error de servidor: ${axiosErr.response?.status} - ${axiosErr.response?.statusText}`
        )
      );
    }

    // Si no es un error de Axios, lo tratamos como un error genérico
    return Promise.reject(new Error(String(err)));
  };

  /**
   * Construye un query string a partir de un objeto genérico.
   * Omite las propiedades nulas o undefined.
   * Si un valor es array, repite la misma clave por cada elemento.
   *
   * @param params Un objeto de tipo T con claves/valores a serializar.
   *
   * @returns {string} -  La cadena formateada sin el “?” inicial.
   */
  protected buildQueryString<T extends Record<string, unknown>>(
    params: T
  ): string {
    // Query
    const qs = new URLSearchParams();

    // Recorremos
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      // Soporte para arrays
      if (Array.isArray(value)) {
        (value as unknown[]).forEach((v) => {
          qs.append(key, String(v));
        });
      } else {
        qs.set(key, String(value));
      }
    });

    return qs.toString();
  }

  /**
   * Método genérico para hacer solicitudes HTTP
   * @param method HTTP method (GET, POST, PUT, DELETE)
   * @param url URL de la API
   * @param extra Datos adicionales (para POST y PUT)
   *
   * @returns {Promise<T>} Respuesta de la API
   */
  protected async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    extra?: {
      data?: any;
      headerApi?: HeaderApiPayload;
      asFormData?: boolean;
      timeout?: number;
    }
  ): Promise<T> {
    try {
      const { data, headerApi, asFormData = true, timeout } = extra ?? {};

      // Detecta si hay que usar FormData
      const payload = asFormData && data ? this.toFormData(data) : data;

      // Configuración
      const config = this.getConfigAxios(
        headerApi,
        Boolean(asFormData && data),
        timeout
      );
      const baseURL = this.getUrlBackend();
      const url = `${baseURL}/${path}`;

      let response;
      switch (method) {
        case "GET":
          response = await axios.get(url, config);
          break;
        case "POST":
          response = await axios.post(url, payload, config);
          break;
        case "PUT":
          response = await axios.put(url, payload, config);
          break;
        case "DELETE":
          response = await axios.delete(url, { data: payload, ...config });
          break;
        default:
          throw new Error("Método HTTP no soportado");
      }

      // Comprobamos data
      return this.checkIntegrityData(response);

      // ! Error
    } catch (error: unknown) {
      return await this.catchAxiosError<T>(error);
    }
  }
}

export default ApiService;
