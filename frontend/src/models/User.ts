import Task from "./Task";

/**
 * User model
 * @module User
 * @description This module defines the User model and its properties.
 */
interface User {
  readonly id: string;
  username?: string;
  email?: string;
  profile?: Profile;
  tasks?: Task[];
}

export type Profile = {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  foto?: string;
};

export default User;
