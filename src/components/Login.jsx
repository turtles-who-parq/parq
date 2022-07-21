import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/styles/styles.scss';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SignupPopup from './SignupPopup.jsx';
import { Signup } from './Signup.jsx';

export function Login(props) {
  const { close, setLoggedIn } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [loggedIn, setLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async e => {
    // const username = username;
    // const password = password;
    e.preventDefault();
    console.log('handleLogin post called');
    let response;
    try {
      response = await axios.post('/api/users/login', {
        username,
        password,
      });
      console.log('response==>', response);

      //sessionStorage.setItem('access_token', res.data);
      setLoggedIn(true);
      close();
      navigate('/dashboard');
    } catch (e) {
      console.log('handleLogin error==>', e);
    }
  };

  const signupPopup = e => {
    e.preventDefault();
    setSignUp(true);
  };

  if (!signUp) {
    return (
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
          <TextField onChange={e => setUsername(e.target.value)} required id='outlined-required' label='username' defaultValue='' />
          <TextField onChange={e => setPassword(e.target.value)} required id='outlined-password-input' label='password' type='password' autoComplete='current-password' sx={{}} />
          <Button
            onClick={handleLogin}
            type='submit'
            color='primary'
            variant='contained'
            // style={btnstyle}
            fullWidth
            sx={{
              border: '.75px solid #36454F',
              color: '#BBD1D1',
              '&:hover': {
                backgroundColor: '#BBD1D1',
                color: '#F8F6F2',
                boxShadow: 'none',
              },
              background: '#F8F6F2',
              textTransform: 'none',
              boxShadow: 'none',
              marginTop: '.5rem',
              marginBottom: '.5rem',
              width: '92%',
              marginLeft: '.5rem',
              paddingTop: '.75rem',
              paddingBottom: '.75rem',
              fontWeight: 'bold',
            }}
          >
            {' '}
            log in
          </Button>
          <Button
            onClick={signupPopup}
            type='submit'
            color='primary'
            variant='contained'
            // style={btnstyle}
            sx={{
              border: '.75px solid #36454F',
              color: '#BBD1D1',
              '&:hover': {
                backgroundColor: '#BBD1D1',
                color: '#F8F6F2',
                boxShadow: 'none',
              },
              background: '#F8F6F2',
              textTransform: 'none',
              boxShadow: 'none',
              width: '92%',
              marginBottom: '.5rem',
              marginLeft: '.5rem',
              paddingTop: '.75rem',
              paddingBottom: '.75rem',
              fontWeight: 'bold',
            }}
          >
            {' '}
            no account? sign up
          </Button>
        </div>
      </Box>
    );
  } else return <Signup />;
}
