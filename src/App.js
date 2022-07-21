import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './views/Dashboard';
import Homepage from './views/Homepage';
import '../public/styles/styles.scss';
import themeParq from '../public/styles/muiTheme';
import AboutPage from './components/AboutPage';
import LandingPage from './views/LandingPage';
import Host from './components/Host';
import { Login } from './components/Login';
import axios from 'axios';
import LoginPopup from './components/LoginPopup';

const App = () => {
  // Define app state
  const [mode, setMode] = useState('light');
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  // // Get inital state from local storage
  useEffect(() => {
    axios
      .get('/api/auth')
      .then(response => {
        if (response.status === 200) setLoggedIn(true);
      })
      .catch(e => {
        console.log(e.message);
      });
  }, []);

  // // Persist mode in local storage
  // useEffect(() => {
  //   window.localStorage.setItem('mode', mode);
  // }, [mode]);
  // // Persist user in local storage
  // useEffect(() => {
  //   window.localStorage.setItem('user', user);
  // }, [user]);

  // Change between light and dark mode
  const theme = themeParq(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Homepage />
      <Routes>
        {/* <exact path='/' element={<Homepage />}> */}
        <Route index element={<LandingPage />} />
        <Route exact path='/host' element={loggedIn ? <Host /> : <LoginPopup />} />
        <Route exact path='/book' element={<Dashboard />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/about' element={<AboutPage />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/account' element={<Dashboard />} />
        <Route exact path='/logout' element={<LandingPage />} />
        {/* </Route> */}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
