export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  effort: number;
  priority: number;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
