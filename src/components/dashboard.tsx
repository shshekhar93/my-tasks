import React, { useEffect, useState } from 'react';
import CreateTaskModal from './tasks/create-task.tsx';
import { Task, TaskFormData } from './tasks/types.ts';
import { tasksManager } from '../db/tasks.ts';
import { Navigation } from './common/navigation.tsx';

const Dashboard: React.FC = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    tasksManager.getAllTasks().then(setTasks);
  }, []);

  const onTaskCreated = (task: TaskFormData) => {
    tasksManager.addTask({
      ...task, 
      createdAt: Date.now(), 
      updatedAt: Date.now()
    });
    setIsCreateTaskModalOpen(false);
  };

  return (
    <div>
      <Navigation>
        <button onClick={() => setIsCreateTaskModalOpen(true)}>Create Task</button>
      </Navigation>
      <main>
        <h1>Tasks</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </main>
      <CreateTaskModal isOpen={isCreateTaskModalOpen} onClose={() => setIsCreateTaskModalOpen(false)} onSubmit={onTaskCreated} />
    </div>
  );
};

export default Dashboard;
