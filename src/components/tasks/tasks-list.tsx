import React from 'react';
import { StyleObject, useStyletron } from 'styletron-react';
import { Flex } from '../common/layout/flex';
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
    <Flex
      flexDirection="row"
      wrap
      gap="1rem"
      className={css({
        position: 'relative',
        padding: `1rem 0 1rem 3rem`,
      })}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        className={css({
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '2.5rem',
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
      </Flex>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onClick={() => onSelect(task)} />
      ))}
    </Flex>
  );
};

export default TaskList;
