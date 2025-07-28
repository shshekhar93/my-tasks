import { Filters } from '../components/hooks/filters';
import { Task } from '../components/tasks/types';

const noFilter = () => true;

export function applyTaskFilters(tasks: Task[], filters: Filters) {
  const statusFilter = createStatusFilter(filters);
  const priorityFilter = createPriorityFilter(filters);
  const dueDateFilter = createDueDateFilter(filters);

  let filtered = tasks;
  console.log('All tasks', filtered);
  // filtered = filtered.filter(statusFilter);
  // console.log('After status', filtered);
  filtered = filtered.filter(priorityFilter);
  console.log('After priority', filtered);
  filtered = filtered.filter(dueDateFilter);
  console.log('After due date filter', filtered);

  return tasks.filter(statusFilter)
    .filter(priorityFilter)
    .filter(dueDateFilter);
}

export function createStatusFilter({ status, showCompleted, showInProgress }: Filters) {
  if (!status || status === 'all') {
    return ({ status }: Task) => {
      if (!showCompleted && status === 'completed') {
        return false;
      }
      if (!showInProgress && status === 'in-progress') {
        return false;
      }
      return true;
    };
  }

  return (task: Task) => task.status === status;
}

export function createPriorityFilter({ priority }: Filters) {
  if (!priority || priority === 'all') {
    return noFilter;
  }

  return (task: Task) => task.priority === +(priority.match(/\d+/)?.[0] ?? '-1');
}

export function createDueDateFilter({ dueBefore, dueAfter }: Filters) {
  if (!dueBefore && !dueAfter) {
    return noFilter;
  }
  const dueDateStart = (new Date(dueAfter ?? '1000-01-01T00:00:00Z')).getTime();
  const dueDateEnd = (new Date(dueBefore ?? '9999-12-31T00:00:00')).getTime();

  return (task: Task) => task.dueDate > dueDateStart && task.dueDate < dueDateEnd;
}
