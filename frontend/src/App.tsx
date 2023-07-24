import React from 'react';
import PlaidLinkContainer from './components/PlaidLink/PlaidContainerButton';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <>
      <Register/>
    </>
  );
};

export default App;