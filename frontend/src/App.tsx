import React, { useState, useEffect } from 'react';
import PlaidLinkButton from './components/PlaidLinkButton';


const App: React.FC = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  const generateToken = async () => {
    try {
      const response = await fetch('/api/plaids/create_link_token', {
        method: 'POST',
      });
      const data = await response.json();
      console.log("here")
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
      <h1>Hello!</h1>
      {linkToken != null ? <PlaidLinkButton linkToken={linkToken} /> : null}
    </div>
  );
};





export default App;
