import React, { useEffect, useState } from 'react';
import PlaidLinkContainer from '../PlaidLink/PlaidContainerButton';
import axios from 'axios';

interface Transaction {
  id: string;
  amount: number;
  description: string;
}

const Account: React.FC = () => {

  return (
    <div>
      <PlaidLinkContainer />
      
    </div>
  );
};

export default Account;
