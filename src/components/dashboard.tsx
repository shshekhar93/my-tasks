import React, { useState } from 'react';
import CreateTaskModal from './tasks/create-task.tsx';
import { Task, TaskFormData } from './tasks/types.ts';
import { createTask } from '../records/tasks.ts';
import { Navigation } from './common/navigation.tsx';

const Dashboard: React.FC = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const onTaskCreated = (task: TaskFormData) => {
    setTasks([...tasks, createTask(task)]);
  };

  return (
    <div>
      <Navigation>
        <button onClick={() => setIsCreateTaskModalOpen(true)}>Create Task</button>
      </Navigation>
      <CreateTaskModal isOpen={isCreateTaskModalOpen} onClose={() => setIsCreateTaskModalOpen(false)} onSubmit={onTaskCreated} />
    </div>
  );
};

export default Dashboard;
