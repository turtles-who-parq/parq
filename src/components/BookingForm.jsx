import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Login } from './Login.jsx';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import '../../public/styles/styles.scss';
//import 'react-calendar/dist/Calendar.css';
import Grid from '@mui/material/Grid';

// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import { differenceInDays } from 'date-fns';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = props => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const BookingForm = ({ hostName, address }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndtDate] = useState(new Date());
  const [length, setLength] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());

  const handleClose = () => {
    setOpen(false);
  };

  const handleBooking = e => {
    e.preventDefault();
    console.log('handleBooking post called');
    console.log('BOOKING CREATED ------------------------->');
    console.log('REDIRECTING TO CHECKOUT PAGE -------------------->');

    axios
      .post(
        '/api/booking',
        {
          hostUsername: hostName,
          bookingDate: date,
          length: length,
          location: address,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        }
      )
      .then(res => {
        if (res.status === 200) {
          alert('Booking has been created');
          navigate(`/checkoutSession`);
        }
      })
      .catch(err => {
        console.log(err.response.status);
        if (err.response.status === 403) {
          setOpen(true);
          // alert("Please log in");
        }
      });
  };
  if (!open) {
    return (
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '20ch' },
        }}
        noValidate
        autoComplete='off'
      >
        
        



        <Grid container justifyContent='space-around' alignItems='center' style={{ paddingTop: '-10vh' }}>
          <Grid item md={6}>
            <div className='startDate'>

            <Typography sx={{ mt: 4, mb: 2 }} variant='h7' style={{ paddingTop: '5px' }} component='div'>
              Start Date
            </Typography>





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








          <div>
          <Calendar onChange={onChange} value={value} />
          </div>
          
          <TextField onChange={e => setLength(e.target.value)} required id='outlined-required' label='Length' defaultValue='' />
          <TextField onChange={e => setDate(e.target.value)} required id='outlined-required' label='Date' defaultValue='' />
          <Button
            onClick={handleBooking}
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
              width: '84%',
              marginBottom: '.5rem',
              marginLeft: '.2rem',
              paddingTop: '.75rem',
              paddingBottom: '.75rem',
              fontWeight: 'bold',
            }}
          >
            {' '}
            Book
          </Button>
        </div>
      </Box>
    );
  } else
    return (
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}></BootstrapDialogTitle>
        <DialogContent dividers>
          <Login />
        </DialogContent>
      </BootstrapDialog>
    );
};
