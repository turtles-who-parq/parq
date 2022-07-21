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

import logo from '../../public/images/blueParq.png';
import Dashboard from '../views/Dashboard';
import { Login } from './Login.jsx';

const LoginDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const LoginDialogTitle = props => {
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

LoginDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function LoginPopup(props) {
  const { setLoggedIn } = props;
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
        <LoginDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
          <LoginDialogTitle id='customized-dialog-title' onClose={handleClose}></LoginDialogTitle>
          <DialogContent dividers>
            <Login close={handleClose} setLoggedIn={setLoggedIn} />
          </DialogContent>
        </LoginDialog>
      </div>
    </>
  );
}

// import React from 'react';
// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
//

// const LoginDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// const LoginDialogTitle = props => {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle
//       sx={{
//         position: 'relative',
//         marginLeft: '1.7rem',
//         marginTop: '1rem',
//         p: 2,
//         color: '#BBD1D1',
//         fontSize: '800',
//         fontWeight: 'bold',
//       }}
//       {...other}
//     >
//       <div className='closeIcon' sx={{ padding: '5px' }}>
//         welcome to parq
//       </div>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label='close'
//           onClick={onClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: '#BBD1D1',
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// };

// LoginDialogTitle.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };

// export default function LoginPopup() {
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       {/* <Button onClick={handleClickOpen} color='inherit' sx={{ flexGrow: 1 }}>
//         <Typography
//           variant='h6'
//           component='div'
//           sx={{
//             textTransform: 'none',
//             fontWeight: 'light',
//             color: '#36454F',
//           }}
//         >
//           log In
//         </Typography>
//       </Button> */}
//       <LoginDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
//         <LoginDialogTitle id='customized-dialog-title' onClose={handleClose}></LoginDialogTitle>
//         <DialogContent dividers>
//           <Login handleClose={handleClose} />
//         </DialogContent>
//       </LoginDialog>
//     </div>
//   );
// }
