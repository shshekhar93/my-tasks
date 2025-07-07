import { TaskFormData } from "../components/tasks/types";

export function createTask(task: TaskFormData) {
  const newTask = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newTask;
}
