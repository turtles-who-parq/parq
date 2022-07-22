import React, { useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Axios from 'axios';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PetsIcon from '@mui/icons-material/Pets';
import { differenceInDays } from 'date-fns';
import { blue, blueGrey, purple } from '@mui/material/colors';
import { fontFamily } from '@mui/system';

const Booking = props => {
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const { updateBooking, user, state, handleState } = props;
  console.log('props.state on booking page ==>', state);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndtDate] = useState(new Date());
  const [dogs, setDogs] = useState(0);
  const [cats, setCats] = useState(0);

  const navigate = useNavigate();

  const handleStartDate = date => {
    setStartDate(date);
  };
  const handleEndDate = date => {
    setEndtDate(date);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //console.log('startDate.toDateString() before submitting==>', startDate.toDateString());

    const updateInfo = {};
    updateInfo.startDate = startDate.toDateString();
    updateInfo.endDate = endDate.toDateString();
    updateInfo.numberOfDogs = dogs;
    updateInfo.numberOfCats = cats;
    updateInfo.totalDue = (dogs * 50 + cats * 40) * differenceInDays(endDate, startDate) || 0;

    fetch(`../api/booking/${user.username}`, {
      method: 'PATCH',
      body: JSON.stringify(updateInfo),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        handleState({ user: data });
        //console.log('state after fetch==>', props.state);
      });
    navigate('/allset');
  };

  // async function
  //   try {
  //     const response = await Axios.patch('api/signup', { username, password });
  //     updateBooking(startDate.toDateString(), endDate.toDateString());
  //   } catch (e) {
  //     console.log('the error==>', e);
  //   }
  //   console.log('Booking props==>', props);
  // }

  return (
    <div style={{ paddingTop: '12vh' }}>
      <Grid container style={{ paddingTop: '2vh' }}>
        <Grid item md={12} style={{ position: 'relative', left: '100px' }}>
          {' '}
          <div className='greeting'>
            Hello &nbsp;<span style={{ color: 'blue', fontSize: '7vh', fontWeight: 800 }}>{user.username}</span>&nbsp;! Please select the dates for your pet stay.
          </div>
        </Grid>
        <Grid container justifyContent='space-around' alignItems='center' style={{ paddingTop: '-10vh' }}>
          <Grid item md={6}>
            <div className='startDate'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent='space-around'>
                  <KeyboardDatePicker
                    disableToolbar
                    variant='inline'
                    format='MM/dd/yyy'
                    margin='normal'
                    id='date-picker'
                    label='Check-in Date'
                    value={startDate}
                    onChange={handleStartDate}
                    KeyboardButtonProps={{ 'aria-label': 'change date' }}
                  ></KeyboardDatePicker>
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <div className='endDate'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent='space-around'>
                  <KeyboardDatePicker
                    disableToolbar
                    variant='inline'
                    format='MM/dd/yyy'
                    margin='normal'
                    id='date-picker'
                    label='Check-out Date'
                    value={endDate}
                    onChange={handleEndDate}
                    KeyboardButtonProps={{ 'aria-label': 'change date' }}
                  ></KeyboardDatePicker>
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          </Grid>
          <Grid item md={2}>
            <Typography sx={{ mt: 4, mb: 2 }} variant='h7' style={{ paddingTop: '-48px' }} component='div'>
              Price List
            </Typography>
            <Demo>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PetsIcon />
                  </ListItemIcon>
                  <ListItemText primary='Dog' secondary='$50 per night' />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PetsIcon />
                  </ListItemIcon>
                  <ListItemText primary='Cat' secondary='$40 per night' />
                </ListItem>
              </List>
            </Demo>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
        <Grid container alignItems='center' justifyContent='center' style={{ paddingTop: '-7px' }}>
          {/* <Grid item md={4}></Grid> */}
          <Grid item md={4}>
            {' '}
            <div className='price' style={{}}>
              Total price:&nbsp;&nbsp;
              <span style={{ color: 'red', fontSize: '47px', fontFamily: "'Indie Flower', cursive" }}>{`  $${(dogs * 50 + cats * 40) * differenceInDays(endDate, startDate) || 0}`}</span>
            </div>
          </Grid>
          {/* <Grid item md={4}></Grid> */}
        </Grid>{' '}
        <Grid container alignItems='center' justifyContent='space-around' style={{ paddingTop: '7vh' }}>
          <Grid item md={4} className='form-group'>
            <form onSubmit={handleSubmit}>
              <label htmlFor='number-of-dogs' className='text-muted mb-1'>
                <div className='numberOfPets'>Number of dogs</div>
              </label>
              <input onChange={e => setDogs(e.target.value)} id='number-of-dogs' name='numberOfDogs' className='form-control' type='text' placeholder='0' autoComplete='off' />

              <label htmlFor='number-of-cats' className='text-muted mb-1'>
                <div className='numberOfPets'>Number of cats</div>
              </label>
              <input onChange={e => setCats(e.target.value)} id='number-of-cats' name='numberOfCats' className='form-control' type='text' placeholder='0' autoComplete='off' />

              <button type='submit' className='py-3 mt-4 btn btn-lg btn-success btn-block'>
                All Set
              </button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Booking;

/*saveUpdates(e) {
    const charId = parseInt(this.props.match.params.id);
    const defaults = {
      nickname: 'Honeybun',
      fav_food: 'Spaghetti',
    }
    const updateInfo = {};
    updateInfo.nickname = !this.state.nickname ? defaults.nickname : this.state.nickname;
    updateInfo.fav_food = !this.state.fav_food ? defaults.fav_food : this.state.fav_food;
    
    const { name } = e.target;
    if (name) {
      Object.keys(updateInfo).forEach(prop => {
        if (prop === name) updateInfo[prop] = 'delete';
        else updateInfo[prop] = 'keep';
      })
    }

    fetch(`../api/character/${charId - 1}`, {
      method: 'PATCH',
      body: JSON.stringify(updateInfo),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(character => {
        if (Object.keys(character).length <= 1) throw 'Incorrect shape of response';
        return this.props.customizeCharacter(charId, character);
      })      
      .catch(err => console.log('favClicked: ERROR: ', err));
  }
  */

/*
        
  */
