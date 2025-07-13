import { useEffect, useReducer, useState } from "react";
import { tasksManager } from "../db/tasks";
import { Task, TaskFormData } from "../components/tasks/types";

export function useTaskManager() {
  const [deps, refresh] = useReducer((x) => x + 1, 0);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    tasksManager.getAllTasks().then(setTasks);
  }, [deps]);

  const createTask = async (task: TaskFormData) => {
    await tasksManager.addTask({
      ...task, 
      createdAt: Date.now(), 
      updatedAt: Date.now()
    });
    refresh();
  }

  return { tasks, createTask };
}