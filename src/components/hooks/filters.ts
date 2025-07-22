import { useState } from 'react';

export type Filters = {
  status: string;
  priority: string;
  dueBefore: string | null;
  dueAfter: string | null;
  searchText: string;
  showCompleted: boolean;
  showInProgress: boolean;
};

const DEFAULT_FILTERS: Filters = {
  status: 'all',
  priority: 'all',
  dueBefore: null,
  dueAfter: null,
  searchText: '',
  showCompleted: false,
  showInProgress: true,
};

export function useFilters() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const updateFilter = (filter: keyof Filters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [filter]: value }));
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return { filters, updateFilter, clearFilters };
}
