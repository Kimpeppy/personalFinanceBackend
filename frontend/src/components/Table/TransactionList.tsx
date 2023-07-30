import React, { useState, useRef } from 'react';
import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { DateTime } from 'luxon';

interface TransactionListProps {
  transactions: any[]; // Replace 'any' with a more specific type if possible
}

interface CellInfo {
  getValue: () => string;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const data = useMemo(() => transactions, [transactions]);
  const columns = [
    {
      header: 'NAME',
      accessorKey: 'name',
    },
    {
      header: 'Amount',
      accessorFn: (row: any) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(row.amount),
    },
    {
      header: 'Date',
      accessorKey: 'date',
      cell: (info: CellInfo) =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
    {
      header: 'Category',
      accessorKey: 'category',
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  const handleButtonClick = () => {
    table.setPageIndex(0);
    scrollRef.current?.scrollTo(0, 0);
  };

  return (
    <div className="w3-container">
      <div style={{ height: '400px', overflow: 'auto' }} ref={scrollRef}>
        <table style={{ fontSize: '20px' }} className="w3-table-all">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ fontWeight: 'normal', padding: '8px', cursor: 'pointer' }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ padding: '8px' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={handleButtonClick}>FirstPage</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          PrevPage
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          NextPage
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          LastPage
        </button>
      </div>
    </div>
  );
};

export default TransactionList;