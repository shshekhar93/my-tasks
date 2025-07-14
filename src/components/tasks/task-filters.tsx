import React from 'react';
import Select from '../common/form/select';
import { PRIORITY_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from '../../constants/filters';
import Input from '../common/form/input';
import Button from '../common/form/button';
import ToggleSwitch from '../common/form/toggle-switch';
import { Filters } from '../hooks/filters';

const TaskFilters: React.FC<{ filters: Filters, updateFilter: (filter: keyof Filters, value: string | boolean) => void }> = ({ filters, updateFilter }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <Select name="status" id="status" label="Status" options={STATUS_FILTER_OPTIONS} value={filters.status} onChange={(value) => updateFilter('status', value)} />
        <Select name="priority" id="priority" label="Priority" options={PRIORITY_FILTER_OPTIONS} value={filters.priority} onChange={(value) => updateFilter('priority', value)} />
        <Input label="Due before" type="date" name="dueDate" id="dueDate" labelAnimation={false} value={filters.dueBefore ?? ''} onChange={(e) => updateFilter('dueBefore', e.target.value)} />
        <Input label="Title or description" type="search" name="search" id="search" value={filters.searchText} onChange={(e) => updateFilter('searchText', e.target.value)} />
        <ToggleSwitch label="Show completed" checked={filters.showCompleted} onChange={(e) => updateFilter('showCompleted', e.target.checked)} />
        <ToggleSwitch label="Show in-progress" defaultChecked={filters.showInProgress} onChange={(e) => updateFilter('showInProgress', e.target.checked)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <Button type="tertiary" label="Due today" />
        <Button type="tertiary" label="Due this week" />
        <Button type="tertiary" label="Highest priority" />
        <Button type="tertiary" label="Longest pending" />
      </div>
    </div>
  );
};

export default TaskFilters;
