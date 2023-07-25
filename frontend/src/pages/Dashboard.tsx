import React, { useEffect, useState } from 'react';
import Account from '../components/Account/Account';

interface User {
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = () => {
    const userData = localStorage.getItem('user');
    return !!userData;
  };

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser: User = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  return (
    <div>
      {isLoggedIn()? (<h1>Welcome to the Dashboard, {user?.name}!<Account/></h1>
      ): (<><h1>Come log in</h1></>)}
      
    </div>
  );
};

export default Dashboard;
