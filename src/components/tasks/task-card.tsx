import React from 'react';
import { useStyletron } from 'styletron-react';
import { useIsMobile } from '../common/layout/breakpoints';
import { Task } from './types';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
});

const formatDate = (date: number) => {
  return dateFormatter.format(new Date(date));
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const [css] = useStyletron();
  const isMobile = useIsMobile();

  return (
    <div
      className={css({
        padding: '1rem',
        borderRadius: '0.5rem',
        display: 'inline-flex',
        flexDirection: 'column',
        backgroundColor: `var(--priority-p${task.priority ?? 'unknown'})`,
        width: isMobile ? '100%' : '300px',
        color: 'white',
        cursor: 'pointer',
      })}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <h4>{task.title}</h4>
      <p
        className={css({
          margin: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        })}
      >
        {task.description || 'title says it all...'}
      </p>
      <p>{formatDate(task.dueDate)}</p>
    </div>
  );
};

export default TaskCard;
