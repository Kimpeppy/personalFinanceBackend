import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlaidLinkButton from './PlaidLinkButton';

const PlaidLinkContainer: React.FC = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  const generateToken = async () => {
    try {
      const response = await axios.post('/api/plaids/create_link_token');
      const data = response.data;
      setLinkToken(data.link_token);
    } catch (error) {
      console.error('Error generating link token:', error);
    }
  };

  useEffect(() => {
    generateToken();
  }, []);

  return (
    <div>
      {linkToken != null ? (
        <PlaidLinkButton linkToken={linkToken} />
      ) : null}
    </div>
  );
};

export default PlaidLinkContainer;
