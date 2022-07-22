import React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Maps from '../components/Map';
import { useEffect, useState } from 'react';
import ParkingSpotTest from '../components/ParkingSpotTest.jsx';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

export default function Dashboard() {

  const [address, setAddress] = useState('');
  const [zoom, setZoom] = useState(5);
  const [home, setHome] = useState({
    lat: 43.65088,
    lng: -79.36576,
  });
  const [listings, setListings] = useState([]);
  const [homeMarker, setHomemarker] = useState(false);
  const [spotElems, setSpotElems] = useState([]);
  const [distance, setDistance] = useState(500);
  const [API_KEY, setAPI_KEY] = useState(null);

  const props = {
    home,
    address,
    zoom,
    homeMarker,
    listings,
  };

  useEffect(() => {
    axios.get('/api/all-listings').then(response => {
      const allListings = response.data.allListings;
      setListings(allListings);
    });
    // Get GOOGLE_API_KEY from backend
    axios.get('/api/key').then(response => {
      setAPI_KEY(response.data);
      console.log('From Dashboard, API_KEY ==> ', response.data);
    });
  }, []);

  const handleChange = event => {
    setDistance(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setZoom(15);
      setHomemarker(true);
      spotFilter();
    } catch (err) {
      console.log('handleSubmit error ==> ', err.response);
    }
  };

  async function spotFilter() {
    //calcuate distanceS between user-input location and all listings; filtering out listings within range (10000 meters)

    try {
      const response = await axios.get('/api/all-listings');

      const allListings = response.data.allListings;

      const requests = allListings.map(async listing => {
        const range = await calculateDistance(address, listing.coordinates);
        if (range < distance) return listing;
      });

      let listingsArray = await Promise.all(requests);

      listingsArray = listingsArray.filter(e => e !== undefined);

      setListings(listingsArray);

      setSpotElems(listingsArray.map((e, i) => <ParkingSpotTest key={i} info={e} {...props} />)); // Waiting for all the requests to get resolved.
    } catch (e) {
      console.log('spotFilter erro==>', e);
    }
  }

  async function calculateDistance(origin, destination) {
    // if (originRef.current.value === '' || destiantionRef.current.value === '') {
    //   return;
    // }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin,
      destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    return results.routes[0].legs[0].distance.value;
  }

  return (
    <>
      <div className='filterBar' style={{ height: '100px' }} sx={{ flexGrow: 1 }}>
        <div className='leftFilter' style={{ flexGrow: '1', float: 'left', marginLeft: '10px' }}>
          <Grid container justifyContent='start' alignItems='center' style={{ paddingTop: '1vh', paddingBottom: '1vh' }}>
            <Grid item >
              
              <form>
                <Tooltip title='Enter your desired parking location to see nearby parking spots' placement='bottom'>
                  <TextField
                    style={{ width: '400px' }}
                    id='standard-search'
                    variant='outlined'
                    label='city, state, zip code'
                    value={address}
                    size='small'
                    onChange={e => setAddress(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='start'>
                          <SearchIcon sx={{ color: '#B9D8D8' }} />
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                </Tooltip>
              </form>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 1, minWidth: 100 }} size='small'>
                <InputLabel id='demo-simple-select-autowidth-label'>Distance</InputLabel>
                <Select style={{ height: '44px' }} labelId='demo-simple-select-autowidth-label' id='demo-simple-select-autowidth' value={distance} onChange={handleChange} label='Age'>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={500}>500 meters</MenuItem>
                  <MenuItem value={1000}>1000 meters</MenuItem>
                  <MenuItem value={1500}>1500 meters</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button onClick={handleSubmit} variant='contained' size='medium'>
                <Typography
                  // component='div'
                  sx={{
                    textTransform: 'none',
                    fontWeight: '600',
                    color: 'white',
                    fontSize: '9',
                  }}
                >
                  Search
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
        <div style={{height: '100px', flexGrow: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <ButtonGroup variant='contained' className='rightFilter' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40%', float: 'right' }}>
            <Button className='filterPrice' sx={{  }}>
              <Typography
                variant="h6"
                component='div'
                sx={{
                  textTransform: 'none'
                }}
              >
              Price
              </Typography>
            </Button>
            <Button className='filterPrice' sx={{  }}>
              <Typography
                variant="h6"
                component='div'
                sx={{
                  textTransform: 'none'
                }}
              >
              Size
              </Typography>
            </Button>
            <Button className='filterPrice' sx={{  }}>
              <Typography
                variant="h6"
                component='div'
                sx={{
                  textTransform: 'none'
                }}
              >
              Type
              </Typography>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className='mapAndTiles' style={{ height: 'calc( 100vh - 145px )' }}>
        <div className='leftMap' style={{ width: '49%', height: '100%', float: 'left' }}>
          <Maps className='map' API_KEY={API_KEY} {...props} />
        </div>
        <div className='rightTiles' style={{ width: '50%', height: '100%', float: 'right' }}>
          {spotElems}
        </div>
      </div>
    </>
  );
}
