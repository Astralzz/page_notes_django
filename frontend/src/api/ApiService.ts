import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  AxiosHeaderValue,
} from "axios";
import { HeaderApiPayload } from "../const/api/HeaderApi.ts";
import { viewDebugApp } from "@/funcs/debug.ts";

/**
 * @description - Clase base para manejar operaciones HTTP comunes
 *
 * @class ApiService
 */
abstract class ApiService {
  /**
   * @var {?string} - URL backend
   */
  private URL_BACKEND_API?: string;

  /**
   * @description - Constructor de la clase ApiService
   */
  constructor() {
    this.URL_BACKEND_API = import.meta.env.VITE_URL_BACKEND_API;
  }

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
  private toFormData(
    obj: Record<string, any>,
    form?: FormData,
    namespace = ""
  ): FormData {
    // Creamos un nuevo FormData
    const formData = form || new FormData();

    // Recorremos el objeto
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        const formKey = namespace ? `${namespace}.${property}` : property;
        const value = obj[property];

        if (value instanceof Date) {
          formData.append(formKey, value.toISOString());
        } else if (value instanceof File || value instanceof Blob) {
          formData.append(formKey, value);
        } else if (
          typeof value === "object" &&
          value !== null &&
          !(value instanceof File) &&
          !(value instanceof Blob)
        ) {
          this.toFormData(value, formData, formKey);
        } else if (value !== undefined && value !== null) {
          formData.append(formKey, String(value));
        }
      }
    }

    return formData;
  }

  /**
   * Configuración de axios
   *
   * @param headerApi - Headers personalizados
   * @param asMultipartFormData - Si es FormData
   * @param timeout - Tiempo de espera
   * @param isContendFiles - Contiene archivos
   *
   * @returns {AxiosRequestConfig}
   */
  private getConfigAxios = (
    headerApi?: HeaderApiPayload,
    timeout?: number,
    authorization?: AxiosHeaderValue,
    isContendFiles?: boolean
  ): AxiosRequestConfig => {
    // ? Configuración
    const config: AxiosRequestConfig = {
      headers: {
        "Accept-Language": "es", // Idioma predeterminado
        Authorization: authorization,
        ...(isContendFiles ? { "Content-Type": "multipart/form-data" } : {}),
        ...headerApi,
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
      if (responseData?.error || responseData?.detail) {
        return Promise.reject(
          new Error(`${responseData?.error ?? responseData?.detail}`)
        );
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
  protected async request<T, D = object>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    extra?: {
      data?: D;
      headerApi?: HeaderApiPayload;
      asFormData?: boolean;
      timeout?: number;
      authorization?: AxiosHeaderValue;
      isContendFiles?: boolean;
    }
  ): Promise<T> {
    try {
      const {
        data,
        headerApi,
        asFormData = true,
        timeout,
        authorization,
        isContendFiles = false,
      } = extra ?? {};

      // Detecta si hay que usar FormData
      const payload = asFormData && data ? this.toFormData(data) : data;

      // Configuración
      const config = this.getConfigAxios(
        headerApi,
        timeout,
        authorization,
        isContendFiles
      );
      const baseURL = this.getUrlBackend();
      const url = `${baseURL}/${path}`;

      // Mostramos en consola
      viewDebugApp(
        {
          url,
          config,
          method,
          payload,
          authorization,
        },
        {
          hiddenLineFinish: true,
        }
      );

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

      viewDebugApp(
        {
          res: "Respuesta",
          response,
        },
        {
          hiddenLineStart: true,
        }
      );

      // Comprobamos data
      return this.checkIntegrityData(response);

      // ! Error
    } catch (error: unknown) {
      viewDebugApp(
        {
          res: "Error",
          error,
        },
        {
          hiddenLineStart: true,
        }
      );
      return await this.catchAxiosError<T>(error);
    }
  }
}

export default ApiService;
