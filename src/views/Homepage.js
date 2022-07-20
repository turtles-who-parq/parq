import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Homepage = () => {

  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Homepage;