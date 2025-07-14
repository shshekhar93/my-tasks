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
      updatedAt: Date.now(),
      status: 'pending'
    });
    refresh();
  }

  const updateTask = async (task: Task) => {
    await tasksManager.updateTask(task);
    refresh();
  }

  const deleteTask = async (task: Task) => {
    await tasksManager.removeTask(task.id);
    refresh();
  }

  return { tasks, createTask, updateTask, deleteTask };
}