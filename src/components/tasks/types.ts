export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: number;
  effort: number;
  priority: number;
  category?: string;
  tags?: string[];
  createdAt: number;
  updatedAt: number;
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
