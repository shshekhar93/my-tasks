import React from 'react';
import { useStyletron } from 'styletron-react';
import TaskList from './tasks-list';
import { Task } from './types';

export type TaskListsProp = {
  tasks: Task[];
  onSelect: (task: Task) => void;
};

export function TaskLists({ tasks, onSelect }: TaskListsProp) {
  const [css] = useStyletron();
  const inProgressTasks = tasks.filter(({ status }) => status === 'in-progress');
  const pendingTasks = tasks.filter(({ status }) => !status || status === 'pending');
  const completedTasks = tasks.filter(({ status }) => status === 'completed');

  if (tasks.length === 0) {
    return (
      <div className={css({ width: '100%', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' })}>
        No tasks, create one!
      </div>
    );
  }

  return (
    <div className={css({
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '1rem',
    })}
    >
      {inProgressTasks.length > 0 && (
        <TaskList
          title="In progress"
          tasks={inProgressTasks}
          onSelect={onSelect}
          titleContainerStyle={{
            backgroundColor: `var(--status-in-progress)`,
            color: 'white',
          }}
        />
      )}
      {pendingTasks.length > 0 && (
        <TaskList
          title="Todo"
          tasks={pendingTasks}
          onSelect={onSelect}
          titleContainerStyle={{
            backgroundColor: `var(--status-pending)`,
            color: 'white',
          }}
        />
      )}
      {completedTasks.length > 0 && (
        <TaskList
          title="Completed"
          tasks={completedTasks}
          onSelect={onSelect}
          titleContainerStyle={{
            backgroundColor: `var(--status-completed)`,
            color: 'white',
          }}
        />
      )}
    </div>
  );
}
