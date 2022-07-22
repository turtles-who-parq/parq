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
import axios from 'axios';
import { capitalizeFirstLetters } from './components/Login';


const App = () => {
  // Define app state
  const [ mode, setMode ] = useState('light');
  const [ auth, setAuth ] = useState(false);
  const [ user, setUser ] = useState('Guest User');

  useEffect(() => {
    const init = async () => {
      try {
        const authorizedUser = await axios.get('/api/users/auth');
        if (authorizedUser.status === 200) {
          setAuth(true);
          setUser(capitalizeFirstLetters(authorizedUser.data.firstname + ' ' + authorizedUser.data.lastname));
          setMode(authorizedUser.data.mode);
        } else {
          setAuth(false);
          setUser('Guest User');
          setMode('light');
        }
      } catch (error) {
        console.error(JSON.stringify(error));
        setAuth(false);
        setUser('Guest User');
        setMode('light');
      }
    };
    init();
  }, []);

  // Change between light and dark mode
  const theme = themeParq(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route exact path='/' element={<Homepage auth={auth} setAuth={setAuth} user={user} setUser={setUser} setMode={setMode} />} >
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