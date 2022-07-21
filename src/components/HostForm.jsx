import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function HostForm(props) {
  const { close } = props;
  console.log('props==>', props);
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [options, setOptions] = useState('');

  const navigate = useNavigate();

  const handleHost = async e => {
    e.preventDefault();
    console.log('handleHost post called');
    let response;
    try {
      response = await axios.post('/api/location', {
        address,
        price,
        options,
        size,
      });

      console.log('response from axios:', response);
      if (response.status === 200) {
        alert('Location saved');
        navigate({
          pathname: '/dashboard',
          data: response.data,
        });
      }
      close();
    } catch (e) {
      console.log('handleHost error==>', e);
    }
  };

  // if (setLocation) {
  //   setTimeout(() => {
  //     history.push({
  //       pathname: "/dashboard",
  //       data: res.data});
  //   }, 0);
  // }

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <div>
        <TextField onChange={e => setAddress(e.target.value)} required id='outlined-required' label='Address' defaultValue='' />
        <TextField onChange={e => setPrice(e.target.value)} required id='outlined-required' label='Price' defaultValue='' />
        <TextField onChange={e => setOptions(e.target.value)} required id='outlined-required' label='Options' defaultValue='' />
        <TextField onChange={e => setSize(e.target.value)} required id='outlined-input' label='Size' />
        <Button onClick={handleHost} type='submit' color='primary' variant='contained'>
          Submit Form
        </Button>
      </div>
    </Box>
  );
}
