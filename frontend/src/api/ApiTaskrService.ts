import Task, { TaskRegister } from "../models/Task";
import { ApiListResponse, ParamQueryList } from "../types/apiTypes";
import ApiService from "./ApiService";

/**
 * @description - Clase para manejar las operaciones de los alumnos
 *
 * @class TasksService
 */
class ApiTaskService extends ApiService {
  /**
   * @var {string} - Base path for CRUD operations
   * @description - Ruta base para las operaciones CRUD
   */
  private CRUD_PATH: string = "task/tasks";

  /**
   * Método para obtener la lista de alumnos
   * @returns Respuesta con la lista de alumnos
   */
  async getListTasks(
    params: ParamQueryList
  ): Promise<ApiListResponse<Array<Task>>> {
    return await this.request<ApiListResponse<Array<Task>>>(
      "GET",
      `${this.CRUD_PATH}?${this.buildQueryString<ParamQueryList>(params)}`
    );
  }

  /**
   * Método para crear un nuevo task
   * @param taskData Datos del nuevo task
   * @returns Respuesta de la creación del task
   */
  async createTask(taskData: TaskRegister): Promise<Task> {
    return this.request<Task>("POST", `${this.CRUD_PATH}/`, {
      data: taskData,
      addAccessToken: true,
    });
  }

  /**
   * Método para obtener un task por ID
   * @param alumnoId ID del task
   *
   * @returns {Promise<Task>} - Respuesta con el task
   */
  async getTask(alumnoId: number): Promise<Task> {
    return this.request<Task>("GET", `${this.CRUD_PATH}/${alumnoId}/`);
  }

  /**
   * Método para actualizar los datos de un task
   * @param taskId ID del task
   * @param taskData Datos actualizados del task
   *
   * @returns {Promise<Task>} - Respuesta con el task actualizado
   */
  async updateTask(data: {
    taskData: TaskRegister;
    taskId: number;
  }): Promise<Task> {
    return this.request<Task>("PUT", `${this.CRUD_PATH}/${data.taskId}/`, {
      data: data.taskData,
      addAccessToken: true,
    });
  }

  /**
   * Método para eliminar un task
   * @param idTak ID del task a eliminar
   *
   * @returns {Promise<void>} - Respuesta de la eliminación
   */
  async deleteTask(data: { idTak: number }): Promise<void> {
    return this.request<void>("DELETE", `${this.CRUD_PATH}/${data.idTak}/`, {
      addAccessToken: true,
    });
  }
}

// Referencia global
export const globalApiTaskService = new ApiTaskService();

export default ApiTaskService;
