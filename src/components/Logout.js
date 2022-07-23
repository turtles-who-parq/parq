import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setReload }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const clearToken = async () => {
      await axios.get('/api/users/logout');
    };
    clearToken();
    setReload(true);
    navigate('/');
  }, []);
  return <></>;
};

export default Logout;
