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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
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
            color: theme => theme.palette.grey[500]
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export const BookingForm = ({ hostName, address }) => {
  const [createDate, setCreateDate] = useState('');
  const [createLength, setCreateLength] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleBooking = e => {
    const date = createDate;
    const length = createLength;

    e.preventDefault();
    console.log('handleBooking post called');

    axios
      .post(
        '/api/booking',
        {
          hostUsername: hostName,
          bookingDate: date,
          length: length,
          location: address
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          alert('Booking has been created');
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
          '& .MuiTextField-root': { m: 1, width: '20ch' }
        }}
        noValidate
        autoComplete='off'>
        <div>
          {' '}
          <TextField
            onChange={e => setCreateLength(e.target.value)}
            required
            id='outlined-required'
            label='Length'
            defaultValue=''
          />
          <TextField
            onChange={e => setCreateDate(e.target.value)}
            required
            id='outlined-required'
            label='Date'
            defaultValue=''
          />
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
                boxShadow: 'none'
              },
              background: '#F8F6F2',
              textTransform: 'none',
              boxShadow: 'none',
              width: '84%',
              marginBottom: '.5rem',
              marginLeft: '.2rem',
              paddingTop: '.75rem',
              paddingBottom: '.75rem',
              fontWeight: 'bold'
            }}>
            {' '}
            Book
          </Button>
        </div>
      </Box>
    );
  } else
    return (
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}>
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}></BootstrapDialogTitle>
        <DialogContent dividers>
          <Login />
        </DialogContent>
      </BootstrapDialog>
    );
};
