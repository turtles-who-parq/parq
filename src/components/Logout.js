import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';

const Logout = () => {
  const clearToken = async () => {
    await axios.get('/api/users/logout');
  };
  clearToken();
  return (
    <Navigate to='/' replace={true} />
  );
}

export default Logout;