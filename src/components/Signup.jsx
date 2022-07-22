import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { capitalizeFirstLetters } from './Login';

export const Signup = ({ setAuth, setUser, setMode }) => {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSignup = async e => {

    e.preventDefault();

    let response;
    try {
      response = await axios.post('/api/users/signup', {
        firstname,
        lastname,
        username,
        password,
      });

      // if (res.status === 201) {
      const name = capitalizeFirstLetters(response.data.firstname + ' ' + response.data.lastname);
      setUser(name);
      setAuth(true);
      setMode('light');
      navigate('/dashboard');
      // }
    } catch (e) {
      console.log('the error ==>', e);
    }
  };
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
        <TextField onChange={e => setFirstname(e.target.value)} required id='outlined-required' label='First Name' defaultValue='' />
        <TextField onChange={e => setLastname(e.target.value)} required id='outlined-required' label='Last Name' defaultValue='' />
        <TextField onChange={e => setUsername(e.target.value)} required id='outlined-required' label='Username' defaultValue='' />
        <TextField onChange={e => setPassword(e.target.value)} required id='outlined-password-input' label='Password' type='password' autoComplete='current-password' />
        <Button
          onClick={handleSignup}
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
            marginLeft: '.5rem',
            marginTop: '.5rem',
            paddingTop: '.75rem',
            paddingBottom: '.75rem',
            fontWeight: 'bold',
            marginBottom: '.5rem',
          }}
        >
          {' '}
          Create Account
        </Button>
      </div>
    </Box>
  );
};
