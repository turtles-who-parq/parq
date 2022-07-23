import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HostForm from './HostForm';
import logo from '../../public/images/blueParq.png';
import Dashboard from '../views/Dashboard';
import requireAuth from './requireAuth';

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
        marginLeft: '10rem',
        width: '50%',
        height: 'auto'
      }}
      {...other}>
      {children}
      <img className='websiteLogo' src={logo} />
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

function HostPopup() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate('/Dashboard');
  };

  return (
    <>
      <Dashboard />
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}>
          <BootstrapDialogTitle
            id='customized-dialog-title'
            onClose={handleClose}></BootstrapDialogTitle>
          <DialogContent dividers>
            <HostForm />
          </DialogContent>
        </BootstrapDialog>
      </div>
    </>
  );
}

export default requireAuth(HostPopup);