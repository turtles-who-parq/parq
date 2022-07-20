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


const App = () => {
  // Define app state
  const [ mode, setMode ] = useState('light');
  const [ auth, setAuth ] = useState(false);
  const [ user, setUser ] = useState();

  // // Get inital state from local storage
  // useEffect(() => {
  //   setMode(JSON.parse(window.localStorage.getItem('mode')));
  //   setUser(JSON.parse(window.localStorage.getItem('user')));
  // }, []);
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
      <Routes>
        <Route exact path='/' element={<Homepage />} >
          <Route index element={<LandingPage />} />
          <Route exact path='Host' element={<Host />} />
          <Route exact path='Book' element={<Dashboard />} />          
          <Route exact path='Dashboard' element={<Dashboard />} />
          <Route exact path='About' element={<AboutPage />} />
          <Route exact path='Profile' element={<Dashboard />} />
          <Route exact path='Account' element={<Dashboard />} />
          <Route exact path='Logout' element={<LandingPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;