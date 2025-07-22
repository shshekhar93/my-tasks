import React from 'react';
import { useStyletron } from 'styletron-react';
import TaskCard from './task-card';
import { Task } from './types';

interface TaskListProps {
  tasks: Task[];
  onSelect: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onSelect }) => {
  const [css] = useStyletron();
  return (
    <div className={css({ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem' })}>
      {tasks.length === 0 && (
        <div className={css({ width: '100%', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' })}>
          No tasks, create one!
        </div>
      )}
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onClick={() => onSelect(task)} />
      ))}
    </div>
  );
};

export default TaskList;
