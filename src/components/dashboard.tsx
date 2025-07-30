import React, { useState } from 'react';
import { useTaskManager } from '../hooks/tasks.ts';
import { applyTaskFilters } from '../utils/task-filters.ts';
import { Flex } from './common/layout/flex.tsx';
import { Menu } from './common/menu.tsx';
import { Navigation } from './common/navigation.tsx';
import { useFilters } from './hooks/filters.ts';
import TaskFilters from './tasks/task-filters.tsx';
import CreateTaskModal from './tasks/task-form.tsx';
import { TaskLists } from './tasks/task-lists.tsx';
import { Task } from './tasks/types.ts';
import ViewTaskModal from './tasks/view-task.tsx';
import { useStyletron } from 'styletron-react';

const Dashboard: React.FC = () => {
  const [css] = useStyletron();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { filters, updateFilter, clearFilters } = useFilters();
  const { tasks, createTask, updateTask, deleteTask, backupTasks, restoreTasks } = useTaskManager();
  const filteredTasks = applyTaskFilters(tasks, filters);

  const closeModal = () => {
    setSelectedTask(null);
    setIsCreateTaskModalOpen(false);
  };

  return (
    <Flex className={css({ height: '100%' })}>
      <Navigation>
        <Menu
          openCreateTaskModal={() => setIsCreateTaskModalOpen(true)}
          createBackup={backupTasks}
          restoreBackup={restoreTasks}
        />
      </Navigation>
      <Flex as="main" flexDirection="column" gap="0.5rem" flex={1}>
        <TaskFilters filters={filters} updateFilter={updateFilter} clearFilters={clearFilters} />
        <TaskLists tasks={filteredTasks} onSelect={setSelectedTask} />
      </Flex>
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        task={selectedTask}
        onClose={closeModal}
        onSubmit={selectedTask ? task => updateTask(task as Task) : createTask}
      />
      <ViewTaskModal
        isOpen={!!selectedTask}
        onClose={closeModal}
        task={selectedTask!}
        onEdit={() => setIsCreateTaskModalOpen(true)}
        onTransition={task => updateTask(task as Task)}
        onDelete={() => deleteTask(selectedTask!)}
      />
    </Flex>
  );
};

export default Dashboard;
