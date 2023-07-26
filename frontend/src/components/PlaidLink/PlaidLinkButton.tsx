import React from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';

interface PlaidLinkButtonProps {
  linkToken: string;
}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({ linkToken }) => {
  const handleOnSuccess = async (public_token: string) => {
    try {
      // Send public_token to the server
      const response = await axios.post('http://localhost:5000/api/plaids/set_access_token', {public_token});

      // Handle response ... 
      if (response.status == 200) {
        localStorage.setItem('access_token', response.data.access_token)
        console.log('Access token set successfully.');
        
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
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
};

export default PlaidLinkButton;
