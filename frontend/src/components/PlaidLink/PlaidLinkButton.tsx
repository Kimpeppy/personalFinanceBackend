import React from 'react';
import { usePlaidLink } from 'react-plaid-link';

interface PlaidLinkButtonProps {
  linkToken: string;
  backendServerUrl: string;
}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({ linkToken, backendServerUrl }) => {
  const handleOnSuccess = async (public_token: string) => {
    try {
      // Send public_token to the server
      const response = await fetch(`http://localhost:5000/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token }),
      });

      // Handle response ...
      if (response.ok) {
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
