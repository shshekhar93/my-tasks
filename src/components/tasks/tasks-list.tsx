import React from 'react';
import { StyleObject, useStyletron } from 'styletron-react';
import TaskCard from './task-card';
import { Task } from './types';

interface TaskListProps {
  title: string;
  tasks: Task[];
  onSelect: (task: Task) => void;
  titleContainerStyle?: StyleObject;
}

const TaskList: React.FC<TaskListProps> = ({ title, titleContainerStyle, tasks, onSelect }) => {
  const [css] = useStyletron();
  return (
    <div className={css({
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '1rem',
      padding: `1rem 1rem 1rem 3rem`,
    })}
    >
      <div className={css({
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        ...titleContainerStyle,
      })}
      >
        <span className={css({
          writingMode: 'sideways-lr',
          marginLeft: '-3px',
        })}
        >
          {title}
        </span>
      </div>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onClick={() => onSelect(task)} />
      ))}
    </div>
  );
};

export default TaskList;
