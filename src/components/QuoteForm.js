// src/components/QuoteForm.js
import React, { useState, useEffect } from 'react';
import { createQuote, getCustomers, getServices } from '../services/api';

const QuoteForm = () => {
    const [quote, setQuote] = useState({
        customer: '',
        service: '',
        quantity: 0,
        total_price: 0.00,
        status: 'Pending',
    });
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await getCustomers();
            setCustomers(response.data);
        };

        const fetchServices = async () => {
            const response = await getServices();
            setServices(response.data);
        };

        fetchCustomers();
        fetchServices();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuote({
            ...quote,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createQuote(quote);
            setMessage('Quote created successfully!');
        } catch (error) {
            setMessage('Error creating quote: ' + error.message);
            console.error('Quote creation error:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create Quote</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer</label>
                    <select
                        name="customer"
                        className="form-control"
                        value={quote.customer}
                        onChange={handleChange}
                    >
                        <option value="">Select Customer</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Service</label>
                    <select
                        name="service"
                        className="form-control"
                        value={quote.service}
                        onChange={handleChange}
                    >
                        <option value="">Select Service</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        className="form-control"
                        value={quote.quantity}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Total Price</label>
                    <input
                        type="number"
                        step="0.01"
                        name="total_price"
                        className="form-control"
                        value={quote.total_price}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Quote</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default QuoteForm;
