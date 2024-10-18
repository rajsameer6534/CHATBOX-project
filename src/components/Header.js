import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Avatar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CompanyLogo from './39-396725_fakery-logo-fake-company-logo-transparent.png'; // Dummy company logo

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        mb: 2,
        background: 'linear-gradient(45deg, #3a7bd5 30%, #00d2ff 90%)',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Company logo and name */}
        <Box display="flex" alignItems="center" sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}>
          <img
            src={CompanyLogo}
            alt="Company Logo"
            style={{ width: isMobile ? 30 : 100, height: isMobile ? 30 : 60, marginRight: 10 }}
          />
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            component="div"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              textShadow: '1px 1px 5px rgba(0,0,0,0.5)',
            }}
          >
           Hello,Good Morining!!!
          </Typography>
        </Box>

        {/* User profile and dropdown */}
        <Box display="flex" alignItems="center">
          <Typography
            variant={isMobile ? 'body2' : 'body1'}
            sx={{ mr: 2, color: 'white', fontWeight: '900', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}
          >
            Sameer Raj
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
            sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
          >
            <Avatar alt="Sameer Raj" src="data:image/jpeg;base64,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" />
          </IconButton>

          {/* Dropdown menu */}
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: '#f5f5f5',
                color: '#333',
                boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
              },
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
