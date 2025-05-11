/**
 * Task model
 * @module Task
 * @description This module defines the Task model and its properties.
 */
interface Task {
  readonly id: string;
  title?: string;
  description?: string;
  completed: boolean;
}

export default Task;
