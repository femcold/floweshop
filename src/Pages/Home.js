import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Typography,
  Toolbar,
} from '@mui/material';
import {
  BiDotsHorizontalRounded,
  BiHome,
  BiPackage,
  BiArchive,
  BiSearch,
  BiCog,
  BiRun,
  BiLogOut,
} from 'react-icons/bi';
import { IoIosAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import CreateOrderForm from './CreateOrderForm'; // Import the new component

const Home = () => {
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [showCreateOrderForm, setShowCreateOrderForm] = useState(false);

  const toggleLeftPanel = () => {
    setShowLeftPanel(!showLeftPanel);
  };

  const openCreateOrderForm = () => {
    setShowLeftPanel(false);
    setShowCreateOrderForm(true);
  };

  const closeCreateOrderForm = () => {
    setShowCreateOrderForm(false);
  };

  return (
    <Container>
      {/* App Bar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleLeftPanel}>
            <BiDotsHorizontalRounded />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
          >
            Ordering App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Panel with hidden menu items */}
      <Drawer anchor="left" open={showLeftPanel} onClose={toggleLeftPanel}>
        <div style={{ width: 210, height: '100vh', overflowY: 'auto' }}>
          <List>
            <ListItem button onClick={openCreateOrderForm}>
              <ListItemIcon>
                <IoIosAdd />
              </ListItemIcon>
              <ListItemText primary="Create Order" />
            </ListItem>
            <ListItem button component={Link} to="/searchUsers">
              <ListItemIcon>
                <BiSearch />
              </ListItemIcon>
              <ListItemText primary="Search for Users" />
            </ListItem>
            <ListItem button component={Link} to="/searchOrders">
              <ListItemIcon>
                <BiSearch />
              </ListItemIcon>
              <ListItemText primary="Search for Orders" />
            </ListItem>
            {/* Add more hidden menu items as needed */}
          </List>
        </div>
      </Drawer>

      {/* Main Content */}
      <Container className="mt-4">
        <Typography variant="h4">Welcome to the Flower Shop</Typography>
        <Typography variant="body1">Explore our beautiful collection of flowers...</Typography>

        {/* Main Navigation Menu */}
        <List className="d-flex">
          <ListItem button component={Link} to="/home">
            <ListItemIcon>
              <BiHome />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/order">
            <ListItemIcon>
              <BiPackage />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button component={Link} to="/inventory">
            <ListItemIcon>
              <BiArchive />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItem>
          <ListItem button component={Link} to="/searchItems">
            <ListItemIcon>
              <BiSearch />
            </ListItemIcon>
            <ListItemText primary="Search Items" />
          </ListItem>
          <ListItem button component={Link} to="/operations">
            <ListItemIcon>
              <BiCog />
            </ListItemIcon>
            <ListItemText primary="Operations" />
          </ListItem>
          <ListItem button component={Link} to="/logistics">
            <ListItemIcon>
              <BiRun />
            </ListItemIcon>
            <ListItemText primary="Logistics" />
          </ListItem>
          <ListItem button component={Link} to="/signOut">
            <ListItemIcon>
              <BiLogOut />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>

        {/* Create Order Form */}
        {showCreateOrderForm && <CreateOrderForm showModal={showCreateOrderForm} handleClose={closeCreateOrderForm} />}
      </Container>
    </Container>
  );
};

export default Home;
