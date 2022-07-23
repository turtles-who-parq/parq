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
import '../../public/styles/datePicker.css';
//import 'react-calendar/dist/Calendar.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import requireAuth from './requireAuth';

// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import { differenceInDays } from 'date-fns';

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

const BookingForm = ({ hostName, address, price, close }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndtDate] = useState(new Date());
  const [length, setLength] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  //const [value, onChange] = useState(new Date());

  async function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // const checkoutInfo = {};
  // checkoutInfo.startDate = startDate.toDateString();
  // checkoutInfo.endDate = endDate.toDateString();
  // checkoutInfo.totalDue = price * differenceInDays(endDate, startDate) || 0;
  // checkoutInfo.hostUsername = hostName,
  // checkoutInfo.clientUsername = clientUsername,

  const handleClose = () => {
    setOpen(false);
  };

  const handleBooking = async e => {
    e.preventDefault();
    console.log('price==>', price);
    console.log('handleBooking post called');

    //*********** TO STRIP*****************
    //navigate(`/checkoutSession`{checkoutInfo});
    const clientUsername = await getCookie('username');
    //console.log('differenceInDays(endDate, startDate)==>', differenceInDays(endDate, startDate));
    const checkoutInfo = {};
    checkoutInfo.startDate = startDate.toDateString();
    checkoutInfo.endDate = endDate.toDateString();
    //checkoutInfo.totalDue = price * (differenceInDays(endDate, startDate) + 1) * 100;
    checkoutInfo.hostUsername = hostName;
    checkoutInfo.clientUsername = clientUsername;
    checkoutInfo.location = address;
    checkoutInfo.priceInCents = price * 100;
    checkoutInfo.quantity = differenceInDays(endDate, startDate) + 1;

    document.cookie = `checkoutInfo=` + `${JSON.stringify(checkoutInfo)}`;
    close(),
      axios
        .post('api/checkout', { checkoutInfo })
        // .then(res => {
        //   if (res.ok) return res.json();
        //   return res.json().then(json => Promise.reject(json));
        // })
        .then(data => {
          //console.log('data.data.url==>', data.data.url);
          window.location = data.data.url;
        })
        .catch(e => {
          console.error(e.error);
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
        <Grid container justifyContent='space-around' alignItems='center' spaceing='1' style={{ paddingTop: '-10vh' }}>
          <Grid item md={5}>
            <div className='startDate'>
              <Typography sx={{ mt: 4, mb: 2 }} variant='h9' style={{ paddingTop: '5px' }} component='div'>
                Start Date
              </Typography>
              <div>
                <Calendar onChange={setStartDate} value={startDate} />
              </div>
            </div>
          </Grid>
          <Grid item md={5}>
            <div className='endDate'>
              <Typography sx={{ mt: 4, mb: 2 }} variant='h9' style={{ paddingTop: '5px' }} component='div'>
                End Date
              </Typography>
              <div>
                <Calendar onChange={setEndtDate} value={endDate} />
              </div>
            </div>
          </Grid>
        </Grid>
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
            marginTop: '1vh',
            marginLeft: '.2rem',
            paddingTop: '.75rem',
            paddingBottom: '.75rem',
            fontWeight: 'bold',
          }}
        >
          {' '}
          Proceed to payment
        </Button>
      </Box>
    );
  } else
    return (
      <BootstrapDialog onClose={close} aria-labelledby='customized-dialog-title' open={open}>
        <BootstrapDialogTitle id='customized-dialog-title' onClose={close}></BootstrapDialogTitle>
        <DialogContent dividers>
          <Login />
        </DialogContent>
      </BootstrapDialog>
    );
};

export default requireAuth(BookingForm);
