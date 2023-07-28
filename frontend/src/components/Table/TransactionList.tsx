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
      header: 'amount',
      accessorKey: 'amount',
      footer: 'amount'
    },
    {
      header: 'currency',
      accessorKey: 'currency',
      footer: 'currency'
    },
    {
      header: 'date',
      accessorKey: 'date',
      footer: 'date'
    }

  ]

  const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel()});
  return (
    <div>
      <h2>Transactions:</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <p>Name: {transaction.name}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Currency: {transaction.currency}</p>
            <p>Date: {transaction.date}</p>
            <h1>------------------------</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
