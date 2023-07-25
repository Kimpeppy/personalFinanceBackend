import React, { useEffect, useState } from 'react';
import PlaidLinkContainer from '../PlaidLink/PlaidContainerButton';

interface User {
  name: string;
  email: string;
}

const Account: React.FC = () => {

  return (
    <div>
        <PlaidLinkContainer/>
    </div>
  );
};

export default Account;
