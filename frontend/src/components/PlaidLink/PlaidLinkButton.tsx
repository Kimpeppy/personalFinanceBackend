import React, { useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';

interface PlaidLinkButtonProps {
  linkToken: string;
}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({ linkToken }) => {
  const [transactions, setTransactions] = useState<any[]>([]);

  const checkLocalStorageItemExists = (key: string): boolean => {
    const value = localStorage.getItem(key);
    return value !== null;
  };

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
      <button onClick={() => open()} disabled={!ready}>
        Link account
      </button>

      {/* Display transactions */}
      {transactions.length > 0 && (
        <div>
          <h2>Transactions:</h2>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                <p>Name: {transaction.name}</p>
                <p>Amount: {transaction.amount}</p>
                <p>Currency: {transaction.currency}</p>
                <p>Category: {transaction.category.join(', ')}</p>
                <p>Date: {transaction.date}</p>
                <p>Transaction Type: {transaction.transaction_type}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PlaidLinkButton;
