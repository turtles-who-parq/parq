import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
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
    <DialogTitle
      sx={{
        position: 'relative',
        marginLeft: '1.7rem',
        marginTop: '1rem',
        p: 2,
        color: '#BBD1D1',
        fontSize: '800',
        fontWeight: 'bold'
      }}
      {...other}>
      <div className='closeIcon' sx={{ padding: '5px' }}>
        Welcome to Parq
      </div>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#BBD1D1'
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

export default function LoginPopup({ setAuth, setUser, setMode }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} variant='contained' color='secondary' sx={{ flexGrow: 0 }}>
        <Typography
          variant='h6'
          component='div'
          sx={{
            textTransform: 'none',
            fontWeight: 'light',
            color: '#36454F'
          }}>
          Login
        </Typography>
      </Button> 
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}>
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}></BootstrapDialogTitle>
        <DialogContent dividers>
          <Login setAuth={setAuth} setUser={setUser} setMode={setMode} handleClose />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
