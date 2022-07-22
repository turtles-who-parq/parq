import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import LoginPopup from './LoginPopup';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';


const AvatarLogin = ({auth, setAuth, user, setUser }) => {

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (auth) {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={ user || 'Guest' } src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography component={RouterLink} to={`/${setting}`} textAlign="center">
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  } else {
    return (
      <LoginPopup setAuth={setAuth} setUser={setUser} />
    );
  }
};

export default AvatarLogin;