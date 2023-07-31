import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import TransactionList from '../Table/TransactionList';
import DonutChart from '../Graphs/DonutChart';


interface PlaidLinkButtonProps {
  linkToken: string;
}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({ linkToken }) => {
  const [transactions, setTransactions] = useState<any[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleOnSuccess = async (public_token: string) => {
    try {
      // Send public_token to the server
      const response = await axios.post('http://localhost:5000/api/plaids/set_access_token', { public_token });

      // Handle response ...
      if (response.status === 200) {
        console.log('Access token set successfully.');
        localStorage.setItem('access_token', response.data.access_token);
        try {
          const requestData = { ACCESS_TOKEN: response.data.access_token };
          const response2 = await axios.get('http://localhost:5000/api/plaids/transactions', {
            params: requestData,
          });
          console.log(response2.data.latest_transactions)
          setTransactions(response2.data.latest_transactions); // Update the transactions state
        } catch (error) {
          console.error('Error getting transactions: ', error);
        }
      } else {
        console.error('Failed to set access token.');
      }
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  };

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken,
    onSuccess: handleOnSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {transactions.length > 0 ? (
        <div>
          <DonutChart transactions={transactions}/>
          <TransactionList transactions={transactions}/>
        </div>
      ) : (
        <button onClick={() => open()} disabled={!ready}>
          Link account
        </button>
      )}
    </>
  );
};

export default PlaidLinkButton;
