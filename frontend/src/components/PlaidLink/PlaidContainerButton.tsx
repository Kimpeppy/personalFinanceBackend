import React, { useState, useEffect } from 'react';
import PlaidLinkButton from './PlaidLinkButton';

const PlaidLinkContainer: React.FC = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  const generateToken = async () => {
    try {
      const response = await fetch('/api/plaids/create_link_token', {
        method: 'POST',
      });
      const data = await response.json();
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
        <PlaidLinkButton linkToken={linkToken} backendServerUrl='http://localhost:5000' />
      ) : null}
    </div>
  );
};

export default PlaidLinkContainer;
