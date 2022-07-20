import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Signup } from './Signup.jsx';

export const Login = () => {
  const [createUsername, setCreateUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  const handleLogin = e => {
    const username = createUsername;
    const password = createPassword;
    e.preventDefault();
    console.log('handleLogin post called');

    axios
      .post('/api/users/login', {
        username: username,
        password: password
      })
      .then(res => {
        console.log('response from axios:', res);
        sessionStorage.setItem('access_token', res.data);
        if (res.status === 201) {
          setLoggedIn(true);
        }
      })
      .catch(err => console.log(err));
  };

  if (loggedIn) {
    setTimeout(() => {
      navigate('/dashboard');
    }, 0);
  }

  const signupPopup = e => {
    e.preventDefault();
    setSignUp(true);
  };

  if (!signUp) {
    return (
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete='off'>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
          <TextField
            onChange={e => setCreateUsername(e.target.value)}
            required
            id='outlined-required'
            label='username'
            defaultValue=''
          />
          <TextField
            onChange={e => setCreatePassword(e.target.value)}
            required
            id='outlined-password-input'
            label='password'
            type='password'
            autoComplete='current-password'
            sx={{}}
          />
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
                boxShadow: 'none'
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
              fontWeight: 'bold'
            }}>
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
                boxShadow: 'none'
              },
              background: '#F8F6F2',
              textTransform: 'none',
              boxShadow: 'none',
              width: '92%',
              marginBottom: '.5rem',
              marginLeft: '.5rem',
              paddingTop: '.75rem',
              paddingBottom: '.75rem',
              fontWeight: 'bold'
            }}>
            {' '}
            no account? sign up
          </Button>
        </div>
      </Box>
    );
  } else return <Signup />;
};
