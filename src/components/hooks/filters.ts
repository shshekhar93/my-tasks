import { useState } from "react";

export type Filters = {
  status: string;
  priority: string;
  dueBefore: string | null;
  dueAfter: string | null;
  searchText: string;
  showCompleted: boolean;
  showInProgress: boolean;
}

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    priority: 'all',
    dueBefore: null,
    dueAfter: null,
    searchText: '',
    showCompleted: false,
    showInProgress: true,
  });

  const updateFilter = (filter: keyof Filters, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  }

  return { filters, updateFilter };
}