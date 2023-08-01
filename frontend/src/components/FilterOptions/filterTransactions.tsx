
interface Transaction {
    id: string;
    name: string;
    amount: number;
    date: string;
    category: string[];
}


// Assuming selectedMonth can be one of the months in the following array
const months = [
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
];

export const filterTransactions = (transactions: Transaction[], selectedMonth: string, selectedYear: string) => {
   // If selectedMonth is all and selectedYear is all
   // Return the entire transactions
   if (selectedMonth === "All Months" && selectedYear === "All Years") {
    return transactions
   }
   // If selectedMonth is not all but selectedYear is all
   // Return transactions
   if (selectedMonth !== "All Months" && selectedYear === "All Years") {
    return transactions
   }

   // If selectedMonth is all but selectedYear is not
   // Return the transactions in that year
   if (selectedMonth === "All Months" && selectedYear !== "All Years") {
    return transactions.filter(transaction => new Date(transaction.date).getFullYear().toString() === selectedYear);
   }

   // If selectedMonth is not all and selectedYear is not all
   // Return the transactions in that month of the year
   if (selectedMonth !== "All Months" && selectedYear !== "All Years") {
    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return (
            transactionDate.getMonth() === months.indexOf(selectedMonth) &&
            transactionDate.getFullYear().toString() === selectedYear
        );
    });

   }
};

export const filterByName = (transactions: Transaction[], selectedName: string): Transaction[] => {
    // Use the filter method to create a new array with transactions that match the selected name
    const filteredTransactions = transactions.filter((transaction) =>
      transaction.name.toLowerCase().includes(selectedName.toLowerCase())
    );
  
    return filteredTransactions;
};


