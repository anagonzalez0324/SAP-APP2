// src/components/CustomerForm.js
import React, { useState, useEffect } from 'react';
import { createCustomer, getCustomers } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const CustomerForm = () => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    customer_type: 'regular',
    preferences: '',
    branding_options: '',
    white_label_shipping: false,
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({}); // State to store validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomer({
      ...customer,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear validation error for the changed field
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic 
    const newErrors = {};
    if (!customer.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!customer.email.trim()) {
      newErrors.email = 'Email is required';
    } 
    // Add more validation rules as needed

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Don't submit if there are errors
    }

    try {
      await createCustomer(customer);
      setMessage('Customer created successfully!');
      navigate('/customers'); // Redirect after successful creation
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setMessage('Error creating customer. Please try again.');
        console.error('Customer creation error:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Create Customer</h2>
      <Link to="/customers" className="btn btn-secondary mb-3">
        Back to Customers
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={customer.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={customer.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            value={customer.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="text-danger">{errors.phone}</div>} 
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            className="form-control"
            value={customer.address}
            onChange={handleChange}
          />
          {errors.address && <div className="text-danger">{errors.address}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="customer_type">Customer Type:</label>
          <select
            id="customer_type"
            name="customer_type"
            className="form-control"
            value={customer.customer_type}
            onChange={handleChange}
          >
            <option value="regular">Regular</option>
            <option value="contract">Contract/Wholesale</option>
          </select>
        </div>

        {/* Preferences */}
        <div className="form-group">
          <label htmlFor="preferences">Preferences:</label>
          <textarea
            id="preferences"
            name="preferences"
            className="form-control"
            value={customer.preferences}
            onChange={handleChange}
          />
          {errors.preferences && <div className="text-danger">{errors.preferences}</div>}
        </div>

        {/* Branding Options */}
        <div className="form-group">
          <label htmlFor="branding_options">Branding Options:</label>
          <textarea
            id="branding_options"
            name="branding_options"
            className="form-control"
            value={customer.branding_options}
            onChange={handleChange}
          />
          {errors.branding_options && <div className="text-danger">{errors.branding_options}</div>}
        </div>

        {/* White Label Shipping */}
        <div className="form-check">
          <input
            type="checkbox"
            id="white_label_shipping"
            name="white_label_shipping"
            className="form-check-input"
            checked={customer.white_label_shipping}
            onChange={handleChange}
          />
          <label htmlFor="white_label_shipping" className="form-check-label">
            White Label Shipping
          </label>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Create Customer
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default CustomerForm;