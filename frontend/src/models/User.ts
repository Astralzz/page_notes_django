import Task from "./Task";

/**
 * User model
 * @module User
 * @description This module defines the User model and its properties.
 */
interface User {
  readonly id: number;
  username: string;
  email?: string;
  profile?: Profile;
  tasks?: Task[];
}

// Register model: igual que User pero sin id y con contraseña
export type UserRegister = Omit<User, "id" | "tasks"> & {
  password: string;
};

export type Profile = {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  foto_url?: string;
  foto?: string;
};

export default User;
