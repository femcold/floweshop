// CreateOrderForm.js
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Accordion, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import NewAccountModal from './NewAccountModal';

const CreateOrderForm = ({ showModal, handleClose }) => {
  const navigate = useNavigate();

  const [salesOrderNumber, setSalesOrderNumber] = useState('');

  

  const handleNewAccountCreated = (newAccountData) => {
    setFormData((prevData) => ({
      ...prevData,
      customerAccount: newAccountData.customerAccount,
      name: newAccountData.name,
      email: newAccountData.email,
      phoneNumber: newAccountData.phoneNumber,
      address: newAccountData.address,
    }));

    // Hide the "Create Account" button and the "Account does not exist" text
    setAccountError('');
    setFilteredAccounts([]);
    setShowNewAccountModal(false);
  };

  const [formData, setFormData] = useState({
    customerAccount: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    currency: '',
    salesOrderNumber: '',
    orderType: 'Sales Order',
    deliveryDate: new Date(),
    deliveryMethod: '',
   
  });



  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [query, setQuery] = useState('');
 

  const [accountError, setAccountError] = useState('');
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/filtered-accounts?query=${query}`);
      const filteredAccounts = response.data;

      if (filteredAccounts.length > 0) {
        setFilteredAccounts(filteredAccounts);
        setAccountError('');
      } else {
        console.error('No matching customer found.');
        setFilteredAccounts([]);
        setAccountError('Account does not exist');
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleSelectCustomer = (selectedCustomer) => {
    const selectedData = {
      customerAccount: selectedCustomer.account || '',
      name: selectedCustomer.name || '',
      email: selectedCustomer.email || '',
      phoneNumber: selectedCustomer.phoneNumber || '',
      address: selectedCustomer.address || '',
    };

    setFilteredAccounts([]);
   
    setFormData(selectedData);
  };

  useEffect(() => {
    const fetchSalesOrderNumber = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/generate-sales-order-number');
        setSalesOrderNumber(response.data.salesOrderNumber);
      } catch (error) {
        console.error('Error fetching sales order number:', error);
      }
    };
  
    const fetchData = async () => {
      await fetchSalesOrderNumber(); // Fetch sales order number first
  
      if (query) {
        try {
          const response = await axios.get(`http://localhost:5000/api/filtered-accounts?query=${query}`);
          setFilteredAccounts(response.data);
        } catch (error) {
          console.error('Error fetching filtered accounts:', error);
        }
      } else {
        setFilteredAccounts([]);
      }
    };
  
    fetchData(); // Call the combined async function
  
  }, [query]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log('After setFormData. Sales Order Number:', formData.salesOrderNumber);




  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      deliveryDate: date || new Date(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Fetch the sales order number if not available
      if (!salesOrderNumber) {
        const response = await axios.get('http://localhost:5000/api/generate-sales-order-number');
        setSalesOrderNumber(response.data.salesOrderNumber);
      }
  
      const orderData = {
        customerAccount: formData.customerAccount,
        salesOrderNumber: salesOrderNumber, // Use the updated salesOrderNumber
        currency: formData.currency || 'Naira',
        orderType: formData.orderType,
        deliveryDate: formData.deliveryDate,
        deliveryMethod: formData.deliveryMethod,
        // Add other fields as needed
      };
  
      // Save the order data in the database
      await axios.post('http://localhost:5000/api/create-order', orderData);
  
      const nextState = {
        salesOrderNumber: salesOrderNumber, // Use the updated salesOrderNumber
        customerInfo: {
          customerAccount: formData.customerAccount,
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          // Add other properties as needed
        },
      };
  
      // Set the state
      setFormData(nextState);
  
      // Navigate to sales order details
      navigate('/sales-order-details', {
        state: nextState,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  

  const handleCreateAccountClick = () => {
    setShowNewAccountModal(true);
    setAccountError('');
  };



  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Accordion defaultActiveKey="customer">
              <Accordion.Item eventKey="customer">
                <Accordion.Header>Customer Information</Accordion.Header>
                <Accordion.Body>
                  <Form.Group controlId="customerAccount">
                    <Form.Label>Customer Account</Form.Label>
                    <Form.Control
                      type="text"
                      name="customerAccount"
                      value={formData.customerAccount || ''}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        handleChange(e);
                      }}
                      onKeyDown={handleKeyPress}
                      placeholder="Search for Account"
                      autoComplete="off"
                    />
                    {accountError && <p style={{ color: 'red' }}>{accountError}</p>}
                    {filteredAccounts.length > 0 && (
                      <div className="filtered-accounts-dropdown">
                        {filteredAccounts.map((customer) => (
                          <div
                            key={customer._id}
                            className="filtered-account-option"
                            onClick={() => handleSelectCustomer(customer)}
                          >
                            {customer.account}
                          </div>
                        ))}
                      </div>
                    )}
                    {accountError && (
                      <Button variant="danger" onClick={handleCreateAccountClick}>
                        Create Account
                      </Button>
                    )}
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber || ''}
                          onChange={handleChange}
                          disabled={!formData.customerAccount}
                        />
                      </Form.Group>
                      <Form.Group controlId="address">
                        <Form.Label>Delivery Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address || ''}
                          onChange={handleChange}
                          disabled={!formData.customerAccount}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name || ''}
                          onChange={handleChange}
                          disabled={!formData.customerAccount}
                        />
                      </Form.Group>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleChange}
                          disabled={!formData.customerAccount}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="general">
                <Accordion.Header>General Information</Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col>
                      <Form.Group controlId="salesOrderNumber">
                        <Form.Label>Sales Order Number</Form.Label>
                        <Form.Control type="text" name="salesOrderNumber" value={salesOrderNumber} readOnly />
                      </Form.Group>
                      <Form.Group controlId="currency">
                        <Form.Label>Currency</Form.Label>
                        <Form.Control type="text" name="currency" value={formData.currency} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="orderType">
                        <Form.Label>Type of Order</Form.Label>
                        <Form.Control
                          as="select"
                          name="orderType"
                          value={formData.orderType}
                          onChange={handleChange}
                        >
                          <option value="Sales Order">Sales Order</option>
                          <option value="Return Order">Return Order</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="delivery">
                <Accordion.Header>Delivery Information</Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col>
                      <Form.Group controlId="deliveryDate">
                        <Form.Label>Delivery Date</Form.Label>
                        <div className="d-flex align-items-center">
                          <DatePicker
                            selected={formData.deliveryDate}
                            onChange={(date) => handleDateChange(date)}
                            dateFormat="MM/dd/yyyy"
                            className="form-control"
                            placeholderText="Select date"
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="deliveryMethod">
                        <Form.Label>Method of Delivery</Form.Label>
                        <Form.Control
                          as="select"
                          name="deliveryMethod"
                          value={formData.deliveryMethod}
                          onChange={handleChange}
                        >
                          <option value="Uber">Uber</option>
                          <option value="Bike">Bike</option>
                          <option value="PickUp">PickUp</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Form.Group controlId="createButton" className="mt-3">
              <Button variant="primary" type="submit">
                Create Order
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      <NewAccountModal
        showModal={showNewAccountModal}
        handleClose={() => setShowNewAccountModal(false)}
        onAccountCreated={handleNewAccountCreated}
      />
    </>
  );
};

export default CreateOrderForm;