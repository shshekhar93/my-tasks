import React from 'react';
import Select from '../common/form/select';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../constants/filters';
import Input from '../common/form/input';
import Button from '../common/form/button';
import ToggleSwitch from '../common/form/toggle-switch';

const TaskFilters: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <Select name="status" id="status" label="Status" options={STATUS_OPTIONS} value="all" onChange={() => {}} />
        <Select name="priority" id="priority" label="Priority" options={PRIORITY_OPTIONS} value="all" onChange={() => {}} />
        <Input label="Due before" type="date" name="dueDate" id="dueDate" labelAnimation={false} />
        <Input label="Title or description" type="search" name="search" id="search" />
        <ToggleSwitch label="Show completed" />
        <ToggleSwitch label="Show in-progress" defaultChecked={true} />
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
