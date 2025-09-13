"use client";

import React from 'react';
import { cn } from '@/lib/design-system';

const Table = React.forwardRef(({
  children,
  className,
  ...props
}, ref) => (
  <div className="overflow-x-auto">
    <table
      ref={ref}
      className={cn('min-w-full divide-y divide-gray-200', className)}
      {...props}
    >
      {children}
    </table>
  </div>
));

Table.displayName = 'Table';

const TableHeader = React.forwardRef(({
  children,
  className,
  ...props
}, ref) => (
  <thead
    ref={ref}
    className={cn('bg-gray-50', className)}
    {...props}
  >
    {children}
  </thead>
));

TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef(({
  children,
  className,
  ...props
}, ref) => (
  <tbody
    ref={ref}
    className={cn('bg-white divide-y divide-gray-200', className)}
    {...props}
  >
    {children}
  </tbody>
));

TableBody.displayName = 'TableBody';

const TableRow = React.forwardRef(({
  children,
  className,
  hoverable = true,
  ...props
}, ref) => (
  <tr
    ref={ref}
    className={cn(
      hoverable && 'hover:bg-gray-50',
      className
    )}
    {...props}
  >
    {children}
  </tr>
));

TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef(({
  children,
  className,
  sortable = false,
  sorted,
  onSort,
  ...props
}, ref) => (
  <th
    ref={ref}
    className={cn(
      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
      sortable && 'cursor-pointer hover:bg-gray-100',
      className
    )}
    onClick={sortable ? onSort : undefined}
    {...props}
  >
    <div className="flex items-center space-x-1">
      <span>{children}</span>
      {sortable && (
        <span className="text-gray-400">
          {sorted === 'asc' ? '↑' : sorted === 'desc' ? '↓' : '↕'}
        </span>
      )}
    </div>
  </th>
));

TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef(({
  children,
  className,
  ...props
}, ref) => (
  <td
    ref={ref}
    className={cn('px-6 py-4 whitespace-nowrap text-sm text-gray-900', className)}
    {...props}
  >
    {children}
  </td>
));

TableCell.displayName = 'TableCell';

// Enhanced DataTable component with search, sorting, and pagination
const DataTable = ({
  data = [],
  columns = [],
  searchable = true,
  sortable = true,
  paginated = true,
  pageSize = 10,
  loading = false,
  emptyMessage = "No data available",
  className
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortConfig, setSortConfig] = React.useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = React.useState(1);

  // Filter data based on search
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(item =>
      columns.some(column => {
        const value = item[column.key];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!paginated) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, paginated]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search */}
      {searchable && (
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-sm text-gray-500">
            Showing {paginatedData.length} of {sortedData.length} results
          </div>
        </div>
      )}

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead
                key={column.key}
                sortable={sortable && column.sortable !== false}
                sorted={sortConfig.key === column.key ? sortConfig.direction : ''}
                onSort={() => handleSort(column.key)}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((item, index) => (
              <TableRow key={index}>
                {columns.map(column => (
                  <TableCell key={column.key}>
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell,
  DataTable 
};