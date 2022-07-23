import React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Map2 from '../components/Map2';
import { useEffect, useState } from 'react';
import ParkingSpotTest from '../components/ParkingSpotTest.jsx';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function Success() {
  let checkoutInfo = getCookie('checkoutInfo');

  let origin = getCookie('origin');

  const { location, endDate, startDate } = JSON.parse(checkoutInfo);

  console.log('location==>', location, 'endDate==>', endDate, 'origin==>', origin);

  const [API_KEY, setAPI_KEY] = useState(null);

  useEffect(() => {
    // Get GOOGLE_API_KEY from backend
    axios.get('/api/key').then(response => {
      setAPI_KEY(response.data);
    });
  }, []);

  return (
    <div className='mapAndTiles' style={{ height: 'calc( 100vh - 145px )' }}>
      <div className='leftMap' style={{ width: '49%', height: '100%', float: 'left' }}>
        <Map2 className='map' API_KEY={API_KEY} origin={origin} location={location} />
      </div>
      <div style={{ width: '50%', height: '100%', float: 'right' }}>
        <Grid container justifyContent='center' alignItems='center' style={{ paddingTop: '30vh', paddingLeft: '2vh', paddingRight: '2vh' }}>
          <Grid item md={12} style={{ position: 'center' }}>
            <div style={{ color: '#333333', fontSize: '3vh', fontWeight: 500, fontFamily: 'Helvetica' }}>
              Great news! Parking spot reserved at <br></br>
              <span style={{ color: '#57cdea', fontSize: '3vh', fontWeight: 700 }}> {origin} </span>
              <br></br>
              from <span style={{ color: '#57cdea', fontSize: '3vh', fontWeight: 700 }}>{startDate}</span> to <span style={{ color: '#57cdea', fontSize: '3vh', fontWeight: 700 }}>{endDate}</span>.
            </div>
          </Grid>
          {/* <Grid item element='div'>
            <Typography variant='h6' marked='center'>
              Great news! Parking spot reserved at {origin} from {startDate} to {endDate}
            </Typography>
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
}
