import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Homepage = ({ auth, setAuth, user, setUser }) => {

  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar auth={auth} setAuth={setAuth} user={user} setUser={setUser} />
      <Outlet />
    </div>
  );
};

export default Homepage;