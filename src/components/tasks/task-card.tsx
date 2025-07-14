import React from 'react';
import { Task } from './types';
import { isMobile } from '../../utils';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
});

const formatDate = (date: number) => {
  return dateFormatter.format(new Date(date));
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <div style={{ 
      position: 'relative', 
      padding: '1rem', 
      borderRadius: '0.5rem', 
      display: 'inline-flex', 
      flexDirection: 'column',
      backgroundColor: `var(--priority-p${task.priority ?? 'unknown'})`,
      width: isMobile() ? '100%' : '300px',
      color: 'white',
      cursor: 'pointer',
    }} onClick={onClick} role="button" tabIndex={0}>
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        bottom: 0, 
        width: '10px',
        backgroundColor: `var(--status-${task.status ?? 'pending'})`,  
        borderTopLeftRadius: '0.5rem',
        borderBottomLeftRadius: '0.5rem',
      }} aria-label={`Status: ${task.status ?? 'pending'}`} />
      <h4>{task.title}</h4>
      <p style={{ 
        margin: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>{task.description}</p>
      <p>{formatDate(task.dueDate)}</p>
    </div>
  );
};

export default TaskCard;
