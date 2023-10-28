import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const styles = {
  appBar: {
    backgroundColor: '#151b26',
  },
  menuButton: {
    marginRight: 'auto',
  },
  menuItems: {
    display: 'flex',
    alignItems: 'center', // Center items vertically
  },
  menuItem: {
    margin: '0 15px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: "'Poppins', sans-serif",
    borderRadius: "8px"
  },
};

export default function CustomNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <AppBar position="static" style={styles.appBar}>
        <Toolbar>
          <div style={{ ...styles.menuItems, margin: '0 auto' }}>
            <MenuItem style={styles.menuItem} onClick={handleClose}>
              <a href="/">Home</a>
            </MenuItem>
            <MenuItem style={styles.menuItem} onClick={handleClose}>
              <a href="/profile">Profile</a>
            </MenuItem>
            <MenuItem style={styles.menuItem} onClick={handleClose}>
              <a href="/contact">Contact</a>
            </MenuItem>
          </div>
        </Toolbar>
      </AppBar>
  );
}
