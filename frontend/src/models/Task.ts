/**
 * Task model
 * @module Task
 * @description This module defines the Task model and its properties.
 */
interface Task {
  readonly id: number;
  title?: string;
  description?: string;
  completed: boolean;
}

// Register model: igual que task pero sin id
export type TaskRegister = Omit<Task, "id">;

export default Task;
