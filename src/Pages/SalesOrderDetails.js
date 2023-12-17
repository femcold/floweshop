//SalesOrderDetails.js
import React, { useState } from 'react';
import {  Container,  Typography,  Button,  Table,  TableRow,  TableCell,  TextField,  Paper,  AppBar,  Toolbar,  IconButton,  MenuItem,} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import {
  Home as HomeIcon,
  LocalMall as PackageIcon,
  Archive as ArchiveIcon,
  Search as SearchIcon,
  Settings as CogIcon,
  DirectionsRun as RunIcon,
  ExitToApp as LogOutIcon,
  Check as CheckIcon,
} from '@mui/icons-material';

const SalesOrderDetails = ({ onClose }) => {
  const [salesOrderLines, setSalesOrderLines] = useState([
    { itemNumber: '', productName: '', quantity: 0, unitPrice: 0, totalPrice: 0, orderStatus: '' },
  ]);

  const location = useLocation();
  console.log('Location object:', location);
  const { salesOrderNumber, customerInfo } = location.state || {};
  console.log('Received state:', location.state);


  const handleAddLine = () => {
    setSalesOrderLines((prevLines) => [
      ...prevLines,
      { itemNumber: '', productName: '', quantity: 0, unitPrice: 0, totalPrice: 0, orderStatus: '' },
    ]);
  };

  const handleRemoveLine = (index) => {
    setSalesOrderLines((prevLines) => prevLines.filter((_, i) => i !== index));
  };

  const handleItemNumberChange = (index, value) => {
    // You can implement logic to fetch product name, unit price, etc., based on the selected item number.
    const updatedLines = salesOrderLines.map((line, i) =>
      i === index ? { ...line, itemNumber: value, productName: 'Populated Product Name', unitPrice: 50 } : line
    );

    setSalesOrderLines(updatedLines);
  };

  const handleChangeLine = (index, fieldName, value) => {
    setSalesOrderLines((prevLines) => {
      const updatedLines = prevLines.map((line, i) => {
        if (i === index) {
          // Update the field value
          const updatedLine = { ...line, [fieldName]: value };

          // Calculate total price based on quantity and unit price
          if (fieldName === 'quantity' || fieldName === 'unitPrice') {
            updatedLine.totalPrice = updatedLine.quantity * updatedLine.unitPrice;
          }

          return updatedLine;
        }
        return line;
      });

      return updatedLines;
    });
  };

  const handleCheckout = () => {
    // Implement logic for handling the checkout process
    // You can send the sales order details to the backend, update the database, etc.
    onClose(); // Close the Sales Order Details page
  };

  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/order" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Ordering App
          </Typography>
          <IconButton component={Link} to="/home" color="inherit">
            <HomeIcon />
            <Typography variant="body2" ml={1}>Home</Typography>
          </IconButton>
          <IconButton component={Link} to="/order" color="inherit">
            <PackageIcon />
            <Typography variant="body2" ml={1}>Orders</Typography>
          </IconButton>
          <IconButton component={Link} to="/inventory" color="inherit">
            <ArchiveIcon />
            <Typography variant="body2" ml={1}>Inventory</Typography>
          </IconButton>
          <IconButton component={Link} to="/searchItems" color="inherit">
            <SearchIcon />
            <Typography variant="body2" ml={1}>Search Items</Typography>
          </IconButton>
          <IconButton component={Link} to="/operations" color="inherit">
            <CogIcon />
            <Typography variant="body2" ml={1}>Operations</Typography>
          </IconButton>
          <IconButton component={Link} to="/logistics" color="inherit">
            <RunIcon />
            <Typography variant="body2" ml={1}>Logistics</Typography>
          </IconButton>
          <IconButton component={Link} to="/signOut" color="inherit">
            <LogOutIcon />
            <Typography variant="body2" ml={1}>Sign Out</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography variant="h6" mt={2}>
        Sales Order Details
      </Typography>

      {/* Customer Information */}
{/* Customer Information */}
<Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Customer Information</Typography>
        <TextField fullWidth value={customerInfo?.customerAccount || ''} variant="outlined" InputProps={{ readOnly: true }} />
        <TextField fullWidth value={customerInfo?.name || ''} variant="outlined" InputProps={{ readOnly: true }} />
        <TextField fullWidth value={customerInfo?.email || ''} variant="outlined" InputProps={{ readOnly: true }} />
        <TextField fullWidth value={customerInfo?.phoneNumber || ''} variant="outlined" InputProps={{ readOnly: true }} />
        <TextField fullWidth value={customerInfo?.address || ''} variant="outlined" InputProps={{ readOnly: true }} />
        <TextField fullWidth value={salesOrderNumber || ''} variant="outlined" InputProps={{ readOnly: true }}
        />
      </Paper>

      {/* Date and Time of Order */}
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Date and Time of Order</Typography>
        {/* Add date and time inputs or date picker as needed */}
      </Paper>

      {/* Sales Order Lines */}
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Sales Order Lines</Typography>
        <Table>
          <thead>
            <TableRow>
              <TableCell>Item Number</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </thead>
          <tbody>
            {salesOrderLines.map((line, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    select
                    value={line.itemNumber}
                    onChange={(e) => handleItemNumberChange(index, e.target.value)}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="001">001</MenuItem>
                    <MenuItem value="002">002</MenuItem>
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={line.productName}
                    size="small"
                    fullWidth
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={line.quantity}
                    size="small"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => handleChangeLine(index, 'quantity', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={line.unitPrice}
                    size="small"
                    fullWidth
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                  />
                </TableCell>
                <TableCell>{line.totalPrice}</TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={line.orderStatus}
                    size="small"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => handleChangeLine(index, 'orderStatus', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveLine(index)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <Button variant="contained" color="primary" onClick={handleAddLine} mt={2}>
          Add Line
        </Button>
      </Paper>

    

      {/* Add space between delivery multiline and checkout button */}
      <div style={{ marginTop: '16px' }} />

      {/* Checkout Button with icon */}
      <Button
        variant="contained"
        color="success"
        onClick={handleCheckout}
        sx={{ mt: 2, ml: 'auto', display: 'flex', alignItems: 'center' }}
      >
        Checkout
        <CheckIcon sx={{ ml: 1 }} />
      </Button>
    </Container>
  );
};

export default SalesOrderDetails;
