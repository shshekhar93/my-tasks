import React, { useState } from 'react';
import CreateTaskModal from './tasks/create-task.tsx';
import { Navigation } from './common/navigation.tsx';
import { useTaskManager } from '../hooks/tasks.ts';
import TaskList from './tasks/tasks-list.tsx';
import TaskFilters from './tasks/task-filters.tsx';
import Button from './common/form/button.tsx';

const Dashboard: React.FC = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const { tasks, createTask } = useTaskManager();

  return (
    <div>
      <Navigation>
        <Button onClick={() => setIsCreateTaskModalOpen(true)} label="Create Task" />
      </Navigation>
      <main style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <TaskFilters />
        <TaskList tasks={tasks} />
      </main>
      <CreateTaskModal isOpen={isCreateTaskModalOpen} onClose={() => setIsCreateTaskModalOpen(false)} onSubmit={createTask} />
    </div>
  );
};

export default Dashboard;
