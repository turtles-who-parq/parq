import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

export default function About() {
  const navigate = useNavigate();
  const handleClickOpen = () => {
    navigate('/about');
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button color='inherit' sx={{ flexGrow: 1 }} 
        onClick={handleClickOpen}>
        <Typography
          variant='h6'
          component='div'
          sx={{
            textTransform: 'none',
            fontWeight: 'light',
            color: '#36454F'
          }}>
          about
        </Typography>
      </Button>
    </div>
  );
}
