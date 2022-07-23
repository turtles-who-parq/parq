import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/styles/styles.scss';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Signup } from './Signup.jsx';

export function capitalizeFirstLetters(str) {
  //normalize all letters to lowercase
  str = str.toLowerCase();
  //split the above string into an array of strings
  //whenever a blank space is encountered
  const arr = str.split(' ');
  //loop through each element of the array and capitalize the first letter.
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  //Join all the elements of the array back into a string
  //using a blankspace as a separator
  return arr.join(' ');
}

export const Login = ({ setAuth, setUser, setMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();

    axios
      .post('/api/users/login', {
        username,
        password,
      })
      .then(response => {
        console.log(response);
        const name = capitalizeFirstLetters(response.data.firstname + ' ' + response.data.lastname);
        console.log('User ==> ', name);
        setUser(name);
        setAuth(true);
        setMode(response.mode);
        navigate('/dashboard');
      })
      .catch(e => console.log('handleLogin error==>', e));
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
            Login
          </Button>
          <Button
            onClick={signupPopup}
            type='submit'
            color='primary'
            variant='contained'
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
            No account? Sign up!
          </Button>
        </div>
      </Box>
    );
  } else return <Signup setAuth={setAuth} setUser={setUser} setMode={setMode} />;
};
