import React, { useEffect, useState } from 'react';
import PlaidLinkContainer from '../PlaidLink/PlaidContainerButton';
import axios from 'axios';
interface Transaction {
  id: string;
  amount: number;
  description: string;
}

const Account: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const getTransactions = async() => {
    try {
      const access_token = localStorage.getItem('access_token')
      console.log(access_token)
      const response = await axios.get('/api/plaids/transactions', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      const data: Transaction[] = response.data;
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions: ', error)
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
        <PlaidLinkContainer/>
        
    </div>
  );
};

export default Account;
