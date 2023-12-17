import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Select, MenuItem, Button } from '@mui/material';
import { BiHome, BiPackage, BiArchive, BiSearch, BiCog, BiRun, BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const OrderIntake = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuItemSelect = (menuItem) => {
    setSelectedMenuItem(menuItem);
    // Add logic to handle the selected menu item
  };

  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/order" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            Ordering App
          </Typography>
          <div>
            <Button color="inherit" component={Link} to="/home" onClick={() => handleMenuItemSelect('home')}>
              <BiHome /> Home
            </Button>
            <Button color="inherit" component={Link} to="/order" onClick={() => handleMenuItemSelect('orders')}>
              <BiPackage /> Orders
            </Button>
            <Button color="inherit" component={Link} to="/inventory" onClick={() => handleMenuItemSelect('inventory')}>
              <BiArchive /> Inventory
            </Button>
            <Button color="inherit" component={Link} to="/searchItems" onClick={() => handleMenuItemSelect('searchItems')}>
              <BiSearch /> Search Items
            </Button>
            <Button color="inherit" component={Link} to="/operations" onClick={() => handleMenuItemSelect('operations')}>
              <BiCog /> Operations
            </Button>
            <Button color="inherit" component={Link} to="/logistics" onClick={() => handleMenuItemSelect('logistics')}>
              <BiRun /> Logistics
            </Button>
            <Button color="inherit" component={Link} to="/signOut" onClick={() => handleMenuItemSelect('signOut')}>
              <BiLogOut /> Sign Out
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Container style={{ backgroundColor: '#FFF', padding: '20px', marginTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select variant="outlined" fullWidth>
              <MenuItem value="">Select Category</MenuItem>
              {/* Add category options */}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default OrderIntake;
