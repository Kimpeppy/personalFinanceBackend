import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface TransactionProps {
  transactions: transactionsProps[];
}

interface transactionsProps {
  id?: string; // Make the id property optional
  name: string;
  amount: number;
  date: string;
  category: string[];
}

const TransactionList: React.FC<TransactionProps> = ({ transactions }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => params.value, // Use the original value
      valueFormatter: (params: GridValueGetterParams) => {
        const amount = Number(params.value);
        return amount >= 0 ? `$${amount.toFixed(2)}` : `-$${Math.abs(amount).toFixed(2)}`;
      },
    },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'category', headerName: 'Category', width: 500 },
  ];

  // Generate a unique ID for each row that doesn't have an id property
  const rows = transactions.map((transaction, index) => ({
    id: transaction.id || `row-${index}`, // If id exists, use it. Otherwise, generate a unique ID.
    name: transaction.name,
    amount: transaction.amount,
    date: transaction.date,
    category: transaction.category ? transaction.category.join(', ') : '',
  }));

  const getRowId = (row: transactionsProps) => row.id;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
      />
    </div>
  );
};

export default TransactionList;
