// TransactionList.tsx
import React from 'react';
import {useMemo} from 'react'
import {useReactTable, getCoreRowModel, flexRender} from '@tanstack/react-table'

interface TransactionListProps {
  transactions: any[]; // Replace 'any' with a more specific type if possible
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const data = useMemo(() => transactions, [transactions])
  const columns = [
    {
      header: 'NAME',
      accessorKey: 'name',
      footer: 'NAME'
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      footer: 'amount'
    },
    {
      header: 'Currency',
      accessorKey: 'currency',
      footer: 'currency'
    },
    {
      header: 'Date',
      accessorKey: 'date',
      footer: 'date'
    }

  ]

  const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel()});
  return (
    <div>
      <table style={{ fontSize: '20px' }}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key = {headerGroup.id}>
            {headerGroup.headers.map(header => <th key = {header.id} style={{fontWeight: 'normal', padding: '8px' }}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>)}
          </tr>
        ))}
        
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key = {row.id}>
              {row.getVisibleCells().map(cell => (
                <td key = {cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key = {footerGroup.id}>
              {footerGroup.headers.map(footer => <th key = {footer.id} style={{fontWeight: 'normal', padding: '8px' }}>
                {flexRender(footer.column.columnDef.header, footer.getContext())}
              </th>)}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default TransactionList;
