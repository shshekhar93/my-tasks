import React from 'react';
import { Task } from './types';
import { isMobile } from '../../utils';

interface TaskCardProps {
  task: Task;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
});

const formatDate = (date: number) => {
  return dateFormatter.format(new Date(date));
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '1rem', 
      borderRadius: '0.5rem', 
      display: 'inline-flex', 
      flexDirection: 'column',
      width: isMobile() ? '100%' : '300px',
    }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>{formatDate(task.dueDate)}</p>
    </div>
  );
};

export default TaskCard;
