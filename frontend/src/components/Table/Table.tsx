import React, { useEffect, useState } from 'react';
import BaseTable, { Column } from 'react-base-table'

interface Transactions {
  id: string;
  amount: number;
  description: string;
}

const Table: React.FC = () => {

  return (
    <div>
      <BaseTable  width = {600} height = {400}>

      </BaseTable>
    </div>
  );
};

export default Table;
