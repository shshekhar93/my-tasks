import React, { useState } from 'react';
import { useStyletron } from 'styletron-react';
import Button from '../common/form/button';
import { useIsMobile } from '../common/layout/breakpoints';
import { Flex } from '../common/layout/flex';
import TaskFilterFields, { TaskFilterFiledsProps } from './task-filter-fields';
import Modal from '../common/modal';

export type TaskFiltersProps = TaskFilterFiledsProps;

const TaskFilters: React.FC<TaskFiltersProps> = (props) => {
  const [css] = useStyletron();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const Component = isMobile ? Modal : React.Fragment;

  return (
    <Flex flexDirection="column" gap="0.5rem">
      {isMobile
        && (
          <Flex gap="1rem">
            <Button
              className={css({
                flex: 1,
              })}
              type="secondary"
              label="Filter tasks"
              onClick={() => setIsExpanded(!isExpanded)}
            />
            <Button
              className={css({
                flex: 1,
              })}
              type="secondary"
              label="Clear all"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </Flex>
        )}
      <Component title="Task filters" isOpen={isExpanded} onClose={() => setIsExpanded(false)}>
        <TaskFilterFields {...props} />
      </Component>
    </Flex>
  );
};

export default TaskFilters;
