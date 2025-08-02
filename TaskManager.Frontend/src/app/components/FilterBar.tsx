'use client';

import { useState, useEffect } from 'react';

interface Props {
  onFilterChange: (filter: FilterOptions) => void;
}

export interface FilterOptions {
  status: string;
  category: string;
  priority: string;
}

export default function FilterBar({ onFilterChange }: Props) {
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    onFilterChange({ status, category, priority });
  }, [status, category, priority, onFilterChange]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 text-gray-200 shadow-md">
      {/* Status Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
          <option value="overdue">Overdue</option> {/* ✅ New */}
        </select>
      </div>

      {/* Category Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Health">Health</option>
          <option value="Study">Study</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Priority Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="0">Low</option>
          <option value="1">Normal</option>
          <option value="2">High</option>
        </select>
      </div>
    </div>
  );
}
