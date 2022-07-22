import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import bookArchway from '../../public/images/book-archway.png';
import hostArchway from '../../public/images/host-archway.png';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const topoBackground = 'https://source.unsplash.com/k1AFA4N8O0g'; //E1lw_-kDGlE

export default function LandingPage() {
  const [address, setAddress] = useState('');
  // const [data, setData] = useState({
  //   lat: 34.052235,
  //   lng: -118.243683,
  //   listings: [],
  // });

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post('/api/all', {
        address: address,
      })
      .then(res => {
        navigate('dashboard', { state: res.data });
      })
      .catch(err => {
        console.log(`handleSubmit error==>: ${err}`);
      });
  };

  return (
    <>
      <div className='topoSearch' style={{ height: '350px' }}>
        <img className='topo' src={topoBackground} width='100%'></img>
        <div className='landingSearch'>
          <form onSubmit={handleSubmit}>
            <TextField
              id='standard-search'
              variant='outlined'
              label='city, state, zip code'
              value={address}
              size='xl'
              style={{
                width: '100%'
              }}
              onChange={e => setAddress(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon sx={{ color: '#B9D8D8' }} />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </form>
        </div>
      </div>

      <div className='archways' style={{ height: 'calc( 100vh - 440px)' }}>
        <div className='leftArch' style={{ width: '49%', height: '100%', float: 'left' }}>
          <Button style={{ zIndex: '3', marginLeft: '36%', marginTop: '150px', position: 'fixed', border: '0' }} variant='text' component={RouterLink} to='/dashboard'>
            <Typography variant='h4'>Book</Typography>
          </Button>
          <img className='archway' src={bookArchway} width='100%'></img>
        </div>
        <div className='rightArch' style={{ width: '50%', height: '100%', float: 'right' }}>
          <Button style={{ zIndex: '3', marginLeft: '5%', marginTop: '150px', position: 'fixed', border: '0' }} variant='text' component={RouterLink} to='/Host'>
            <Typography variant='h4'>Host</Typography>
          </Button>
          <img className='archway' src={hostArchway} width='100%'></img>
        </div>
      </div>
    </>
  );
}
