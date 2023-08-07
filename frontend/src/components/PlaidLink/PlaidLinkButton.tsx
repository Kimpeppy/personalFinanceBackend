import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import AccountInfo from '../Account/AccountInfo';

interface PlaidLinkButtonProps {
  linkToken: string;
}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({ linkToken }) => {
  const [transactions, setTransactions] = useState<any[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [balances, setBalances] = useState<any[]>(() => {
    const savedBalances = localStorage.getItem('balances');
    return savedBalances ? JSON.parse(savedBalances) : [];
  });
  

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleOnSuccess = async (public_token: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/plaids/set_access_token', { public_token });

      if (response.status === 200) {
        console.log('Access token set successfully.');
        localStorage.setItem('access_token', response.data.access_token);
        fetchTransactions(response.data.access_token);
        fetchBalance(response.data.access_token);
      } else {
        console.error('Failed to set access token.');
      }
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  };

  const fetchBalance = async (accessToken: string) => {
    try {
      const requestData = { ACCESS_TOKEN: accessToken};
      const response = await axios.get('http://localhost:5000/api/plaids/balances', {
        params: requestData,
      });
      console.log(response.data.accounts)
      setBalances(response.data.accounts)
      
    } catch (error) {
      console.error('Error getting balance')
    }
  }

  const fetchTransactions = async (accessToken: string) => {
    try {
      const requestData = { ACCESS_TOKEN: accessToken };
      const response = await axios.get('http://localhost:5000/api/plaids/transactions', {
        params: requestData,
      });
      console.log(response.data.latest_transactions)
      setTransactions(response.data.latest_transactions); // Update the transactions state
    } catch (error) {
      console.error('Error getting transactions: ', error);
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
          <AccountInfo transactions={ transactions }/>
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
