import React from 'react';
import { Task } from './types';
import TaskCard from './task-card';

interface TaskListProps {
  tasks: Task[];
  onSelect: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onSelect }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      gap: '1rem' 
    }}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onClick={() => onSelect(task)} />
      ))}
    </div>
  );
};

export default TaskList;