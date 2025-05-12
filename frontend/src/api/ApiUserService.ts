import User from "../models/User";
import { ApiListResponse, ParamQueryList } from "../types/apiTypes";
import ApiService from "./ApiService";

/**
 * @description - Clase para manejar las operaciones de los alumnos
 *
 * @class UsersService
 */
class ApiUserService extends ApiService {
  /**
   * @var {string} - Base path for CRUD operations
   * @description - Ruta base para las operaciones CRUD
   */
  private CRUD_PATH: string = "account";

  /**
   * Método para obtener la lista de alumnos
   * @returns Respuesta con la lista de alumnos
   */
  async getListUsers(
    params: ParamQueryList
  ): Promise<ApiListResponse<Array<User>>> {
    return await this.request<ApiListResponse<Array<User>>>(
      "GET",
      `${this.CRUD_PATH}/users?${this.buildQueryString<ParamQueryList>(params)}`
    );
  }

  /**
   * Método para crear un nuevo user
   * @param alumnoData Datos del nuevo user
   * @returns Respuesta de la creación del user
   */
  async createUser(alumnoData: User): Promise<User> {
    return this.request<User>("POST", `${this.CRUD_PATH}/register/`, {
      data: alumnoData,
    });
  }

  /**
   * Método para obtener un user por ID
   * @param alumnoId ID del user
   *
   * @returns {Promise<User>} - Respuesta con el user
   */
  async getUser(alumnoId: number): Promise<User> {
    return this.request<User>("GET", `${this.CRUD_PATH}/user/${alumnoId}/`);
  }

  /**
   * Método para actualizar los datos de un user
   * @param alumnoId ID del user
   * @param alumnoData Datos actualizados del user
   *
   * @returns {Promise<User>} - Respuesta con el user actualizado
   */
  async updateUser(alumnoData: User, alumnoId: number): Promise<User> {
    return this.request<User>("PUT", `${this.CRUD_PATH}/user/${alumnoId}/`, {
      data: alumnoData,
    });
  }

  /**
   * Método para eliminar un user
   * @param alumnoId ID del user a eliminar
   *
   * @returns {Promise<void>} - Respuesta de la eliminación
   */
  async deleteUser(alumnoId: number): Promise<void> {
    return this.request<void>("DELETE", `${this.CRUD_PATH}/user/${alumnoId}/`);
  }
}

// Referencia global
export const globalApiUserService = new ApiUserService();

export default ApiUserService;
