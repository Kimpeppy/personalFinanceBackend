import React, { useEffect, useState } from 'react';
import TransactionList from '../Table/TransactionList';
import DonutChart from '../Graphs/DonutChart';
import { filterByName, filterTransactions } from '../FilterOptions/filterTransactions';
import DropDownMenu from '../Graphs/Utils/DropDownMenu';
import TransactionsInput from '../Form/TransactionNameInput';

interface TransactionProps {
  transactions: transactionsProps[];
}

interface transactionsProps {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string[];
}



const AccountInfo: React.FC<TransactionProps> = ({ transactions }) => {
    const [selectedMonth, setSelectedMonth] = useState<string>('All Months');
    const [selectedYear, setSelectedYear] = useState<string>('All Years');
    const [filteredTransactions, setFilteredTransactions] = useState<transactionsProps[]>(transactions);
    const [transactionName, setTransactionName] = useState<string>('');

    const monthsObject = {
        name: 'Months',
        array: [
            'All Months',
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
    };

    const yearsObject = {
        name: 'Years',
        array: ['All Years', '2023', '2022', '2021' ],
    };

    // Update selected month and year when DropDownMenu values change
    const handleMonthChange = (selectedMonth: string) => {
        setSelectedMonth(selectedMonth);
    };

    const handleYearChange = (selectedYear: string) => {
        setSelectedYear(selectedYear);
    };

    const handleTransactionNameChange = (name: string) => {
        setTransactionName(name);
    };

    useEffect(() => {
        // Filter the transactions based on the selected month and year
        const updatedTransactions = filterTransactions(transactions, selectedMonth, selectedYear);
        let filtered = updatedTransactions || [];

        // Filter by name if there is a search term
        if (transactionName) {
          filtered = filterByName(filtered, transactionName);
        }

        setFilteredTransactions(filtered);
    }, [transactions, selectedMonth, selectedYear, transactionName]);

    return (
        <div>
            <DropDownMenu choices={monthsObject.array} name={monthsObject.name} onChange={handleMonthChange}/>
            <DropDownMenu choices={yearsObject.array} name={yearsObject.name} onChange={handleYearChange} />

            <DonutChart transactions={filteredTransactions} />
            <TransactionsInput onNameChange={handleTransactionNameChange} />
            <TransactionList transactions={filteredTransactions} />
        </div>
    );
};

export default AccountInfo;
