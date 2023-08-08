import React, { useEffect, useState } from 'react';
import TransactionList from '../Table/TransactionList';
import DonutChart from '../Graphs/DonutChart';
import { filterByName, filterTransactions } from '../FilterOptions/filterTransactions';
import DropDownMenu from '../Graphs/Utils/DropDownMenu/DropDownMenu';
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

interface accountProps {
    account_id: string
    balances: {
        available: number | null;
        current: number;
        iso_currency_code: string;
        limit: number | null;
        unofficial_currency_code: string | null;
    };
    name: string;
    subtype: string;
}

interface AccountsProps {
    accounts: accountProps[];
}

interface combinedProps extends TransactionProps, AccountsProps {}

const AccountInfo: React.FC<combinedProps> = ({ transactions, accounts }) => {
    
    const [selectedMonth, setSelectedMonth] = useState<string>('All Months');
    const [selectedYear, setSelectedYear] = useState<string>('All Years');
    const [selectedAccounts, setSelectedAccounts] = useState<string>();
    const [filteredTransactions, setFilteredTransactions] = useState<transactionsProps[]>(transactions);
    const [transactionName, setTransactionName] = useState<string>('');

    const createListOfAccounts = (accounts: accountProps[]) => {
        return accounts.map(account => ({
            account_id: account.account_id,
            name: account.name,
        }));
    };

    const extractAccountNames = (accountObjects: { account_id: string; name: string }[]) => {
        return accountObjects.map(account => account.name);
    };
    
    const accountForDropDown = {
        name: 'Accounts',
        array: extractAccountNames(createListOfAccounts(accounts))
    }

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

    const handleAccountChange = (selectedAccount: string) => {
        setSelectedAccounts(selectedAccount);
    }

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
            {/* Display Accounts */}
            <DropDownMenu choices={accountForDropDown.array} name={accountForDropDown.name} onChange={handleAccountChange}/>
            <DropDownMenu choices={monthsObject.array} name={monthsObject.name} onChange={handleMonthChange}/>
            <DropDownMenu choices={yearsObject.array} name={yearsObject.name} onChange={handleYearChange} />

            <DonutChart transactions={filteredTransactions} />
            <TransactionsInput onNameChange={handleTransactionNameChange} />
            <TransactionList transactions={filteredTransactions} />
        </div>
    );
};

export default AccountInfo;
