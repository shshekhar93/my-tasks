import React, { useState } from 'react';
import { useStyletron } from 'styletron-react';
import { PRIORITY_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from '../../constants/filters';
import Button from '../common/form/button';
import Input from '../common/form/input';
import Select from '../common/form/select';
import ToggleSwitch from '../common/form/toggle-switch';
import { useIsMobile } from '../common/layout/breakpoints';
import { Flex } from '../common/layout/flex';
import { Filters } from '../hooks/filters';

export type TaskFiltersProps = {
  filters: Filters;
  updateFilter: (filter: keyof Filters, value: string | boolean) => void;
  clearFilters: () => void;
};

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  updateFilter,
  clearFilters,
}) => {
  const [css] = useStyletron();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isMobile = useIsMobile();

  return (
    <Flex flexDirection="column" gap="0.5rem">
      {isMobile
        && (
          <Flex justifyContent="center" alignItems="center">
            <Button type="tertiary" label={isExpanded ? 'Hide filters' : 'Show filters'} onClick={() => setIsExpanded(!isExpanded)} />
            <span className={css({
              width: '0.5rem',
              height: '0.5rem',
              borderLeft: 'solid 1px black',
              borderBottom: 'solid 1px black',
              transform: isExpanded ? 'rotate(135deg)' : 'rotate(-45deg)',
              transition: 'transform .3s ease-in-out',
            })}
            >
            </span>
          </Flex>
        )}
      {(!isMobile || isExpanded) && (
        <>
          <Flex flexDirection={['row', 'column']} gap="1rem">
            <Select name="status" id="status" label="Status" options={STATUS_FILTER_OPTIONS} value={filters.status} onChange={value => updateFilter('status', value)} />
            <Select name="priority" id="priority" label="Priority" options={PRIORITY_FILTER_OPTIONS} value={filters.priority} onChange={value => updateFilter('priority', value)} />
            <Input label="Due after" type="date" name="dueAfter" id="dueAfter" labelAnimation={false} value={filters.dueAfter ?? ''} onChange={e => updateFilter('dueAfter', e.target.value)} />
            <Input label="Due before" type="date" name="dueBefore" id="dueBefore" labelAnimation={false} value={filters.dueBefore ?? ''} onChange={e => updateFilter('dueBefore', e.target.value)} />
            <Input label="Title or description" type="search" name="search" id="search" value={filters.searchText} onChange={e => updateFilter('searchText', e.target.value)} />
            <ToggleSwitch label="Show completed" checked={filters.showCompleted} onChange={e => updateFilter('showCompleted', e.target.checked)} />
            <ToggleSwitch label="Show in-progress" checked={filters.showInProgress} onChange={e => updateFilter('showInProgress', e.target.checked)} />
            <Button type="secondary" label="Clear all filters" onClick={clearFilters} />
          </Flex>
          <Flex flexDirection={['row', 'column']} gap="1rem">
            <Button
              type="tertiary"
              label="Due today"
              onClick={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                updateFilter('dueAfter', formatDate(new Date()));
                updateFilter('dueBefore', formatDate(tomorrow));
              }}
            />
            <Button
              type="tertiary"
              label="Due this week"
              onClick={() => {
                const weekStart = new Date();
                weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                weekStart.setHours(0, 0, 0, 0);
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekEnd.getDate() + 6);
                updateFilter('dueAfter', formatDate(weekStart));
                updateFilter('dueBefore', formatDate(weekEnd));
              }}
            />
            <Button
              type="tertiary"
              label="Highest priority"
              onClick={() => {
                updateFilter('priority', '0');
              }}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default TaskFilters;
