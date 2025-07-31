import React from 'react';
import { PRIORITY_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from '../../constants/filters';
import { formatDateISO } from '../../utils/utils';
import Button from '../common/form/button';
import Input from '../common/form/input';
import Select from '../common/form/select';
import ToggleSwitch from '../common/form/toggle-switch';
import { Flex } from '../common/layout/flex';
import { Filters } from '../hooks/filters';

export type TaskFilterFiledsProps = {
  filters: Filters;
  updateFilter: (filter: keyof Filters, value: string | boolean) => void;
  clearFilters: () => void;
};

const TaskFilterFields: React.FC<TaskFilterFiledsProps> = ({
  filters,
  updateFilter,
  clearFilters,
}) => {
  return (
    <>
      <Flex flexDirection={['row', 'column']} wrap gap="1rem">
        <Select
          name="status"
          id="status"
          label="Status"
          options={STATUS_FILTER_OPTIONS}
          value={filters.status}
          onChange={value => updateFilter('status', value)}
        />
        <Select
          name="priority"
          id="priority"
          label="Priority"
          options={PRIORITY_FILTER_OPTIONS}
          value={filters.priority}
          onChange={value => updateFilter('priority', value)}
          style={{
            minWidth: '4rem',
          }}
        />
        <Input
          label="Due after"
          type="date"
          name="dueAfter"
          id="dueAfter"
          value={filters.dueAfter ?? ''}
          onChange={e => updateFilter('dueAfter', e.target.value)}
        />
        <Input
          label="Due before"
          type="date"
          name="dueBefore"
          id="dueBefore"
          value={filters.dueBefore ?? ''}
          onChange={e => updateFilter('dueBefore', e.target.value)}
        />
        <Input
          label="Title or description"
          type="search"
          name="search"
          id="search"
          value={filters.searchText}
          onChange={e => updateFilter('searchText', e.target.value)}
        />
        <ToggleSwitch
          label="Show completed"
          checked={filters.showCompleted}
          onChange={e => updateFilter('showCompleted', e.target.checked)}
        />
        <ToggleSwitch
          label="Show in-progress"
          checked={filters.showInProgress}
          onChange={e => updateFilter('showInProgress', e.target.checked)}
        />
        <Button
          type="secondary"
          label="Clear all filters"
          onClick={clearFilters}
        />
      </Flex>
      <Flex flexDirection={['row', 'column']} gap="1rem">
        <Button
          type="tertiary"
          label="Due today"
          onClick={() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            updateFilter('dueAfter', formatDateISO(new Date()));
            updateFilter('dueBefore', formatDateISO(tomorrow));
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
            updateFilter('dueAfter', formatDateISO(weekStart));
            updateFilter('dueBefore', formatDateISO(weekEnd));
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
  );
};

export default TaskFilterFields;
