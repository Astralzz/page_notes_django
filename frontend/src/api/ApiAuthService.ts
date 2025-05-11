import { AuthResponse } from "../types/apiTypes";
import ApiService from "./ApiService";

/**
 * @description - Clase para manejar las operaciones de los alumnos
 *
 * @class AuthService
 */
class ApiAuthService extends ApiService {
  /**
   * @var {string} - Base path for CRUD operations
   * @description - Ruta base para las operaciones CRUD
   */
  private CRUD_PATH: string = "token";

  /**
   * Método para obtener token de acceso
   *
   * @param auth Datos de autenticación
   * @description - Se utiliza para obtener un token de acceso utilizando el nombre de usuario y la contraseña
   *
   * @returns {Promise<AuthResponse>} - Respuesta de autenticación
   */
  async getToken(auth: {
    username: string;
    password: string;
  }): Promise<AuthResponse> {
    return await this.request<AuthResponse>("POST", `${this.CRUD_PATH}/`, {
      data: auth,
    });
  }

  /**
   * Método para refrescar el token de acceso
   *
   * @param auth Datos de autenticación
   * @description - Se utiliza para obtener un nuevo token de acceso utilizando el token de actualización
   *
   * @returns {Promise<AuthResponse>} - Respuesta de autenticación
   */
  async getTokenRefresh(auth: { refresh: string }): Promise<AuthResponse> {
    return await this.request<AuthResponse>(
      "POST",
      `${this.CRUD_PATH}refresh/`,
      {
        data: auth,
      }
    );
  }
}

// Referencia global
export const globalApiAuthService = new ApiAuthService();

export default ApiAuthService;
