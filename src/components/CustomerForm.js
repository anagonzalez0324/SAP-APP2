// src/components/CustomerForm.js
import React, { useState } from 'react';
import { createCustomer } from '../services/api';

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCustomer({
            ...customer,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCustomer(customer);
            setMessage('Customer created successfully!');
        } catch (error) {
            setMessage('Error creating customer: ' + error.message);
            console.error('Customer creation error:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create Customer</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={customer.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={customer.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={customer.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea
                        name="address"
                        className="form-control"
                        value={customer.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Customer Type</label>
                    <select
                        name="customer_type"
                        className="form-control"
                        value={customer.customer_type}
                        onChange={handleChange}
                    >
                        <option value="regular">Regular</option>
                        <option value="contract">Contract/Wholesale</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Preferences</label>
                    <textarea
                        name="preferences"
                        className="form-control"
                        value={customer.preferences}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Branding Options</label>
                    <textarea
                        name="branding_options"
                        className="form-control"
                        value={customer.branding_options}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="white_label_shipping"
                            checked={customer.white_label_shipping}
                            onChange={handleChange}
                        />{' '}
                        White Label Shipping
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Create Customer</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default CustomerForm;
