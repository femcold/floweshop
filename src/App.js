import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderIntake from './Components/orderIntake';
import Home from './Pages/Home';
import CreateOrderForm  from './Pages/CreateOrderForm';
import SalesOrderDetails from './Pages/SalesOrderDetails'; // Import SalesOrderDetails
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/order" element={<OrderIntake />} />
        <Route path="/create-order" element={<CreateOrderForm />} />
        <Route path="/sales-order-details" element={<SalesOrderDetails />} />
        {/* Add more routes for other pages */}
        
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
