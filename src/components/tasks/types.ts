export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: number;
  effort: number;
  priority: number;
  category?: string;
  tags?: string[];
  createdAt: number;
  updatedAt: number;
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'> & {
  status?: 'pending' | 'in-progress' | 'completed';
};
