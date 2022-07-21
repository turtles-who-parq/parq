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

const HostDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const HostDialogTitle = props => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        position: 'relative',
        marginLeft: '10rem',
        width: '50%',
        height: 'auto',
      }}
      {...other}
    >
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
            color: '#BBD1D1',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

HostDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function HostPopup() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate('/Dashboard');
  };

  return (
    <>
      <Dashboard />
      some text
      <div>
        <HostDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
          <HostDialogTitle id='customized-dialog-title' onClose={handleClose}></HostDialogTitle>
          <DialogContent dividers>
            <HostForm close={handleClose} />
          </DialogContent>
        </HostDialog>
      </div>
    </>
  );
}
