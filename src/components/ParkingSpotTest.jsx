import React, { useState } from 'react';
import topoBackground from '../../public/images/topoBackground.png';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { BookingForm } from './BookingForm.jsx';
import logo from '../../public/images/blueParq.png';

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
            marginLeft: '3rem',
            color: '#BBD1D1',
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

export default function ParkingSpotTest({ info, isVisible }) {
  const { address, options, price, size, hostName } = info;
  const [open, setOpen] = useState(false);
  const onSpotClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='parkingSpotTileOutter' onClick={onSpotClick}>
        <div className='parkingSpotTile' onClick={onSpotClick}>
          <img className='tileTopo' src={topoBackground} width='100%'></img>
          <span>
            <h1 className='spotAddress'>{address}</h1>
          </span>
        </div>
        <div>
          <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
            <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}></BootstrapDialogTitle>
            <DialogContent
              dividers
              sx={{
                fontFamily: 'Helvetica',
                fontWeight: 'thin',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 'x-large',
                  fontWeight: 'bold',
                  color: '#BBD1D1',
                }}
              >
                ${price}/day
              </div>
              <br></br>
              <div style={{ fontWeight: 'lighter' }}>{address}</div>
              {size === 1 && (
                <div style={{ fontWeight: 'lighter' }}>
                  {options} | {size} car
                </div>
              )}
              {size > 1 && (
                <div style={{ fontWeight: 'lighter' }}>
                  {options} | {size} cars
                </div>
              )}
              {/* ${price}/hr | {options} | {size} cars */}
              <BookingForm hostName={hostName} address={address} price={price} close={handleClose} />
            </DialogContent>
          </BootstrapDialog>
        </div>
      </div>
    </>
  );
}
