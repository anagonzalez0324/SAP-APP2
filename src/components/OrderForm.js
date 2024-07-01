// src/components/OrderForm.js
import React, { useState, useEffect } from 'react';
import { createOrder, getCustomers, getProducts } from '../services/api';

const OrderForm = () => {
    const [order, setOrder] = useState({
    order_number: '',
    customer: '',
    due_date: '',
    status: '',
    items: [],
    });
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoadingCustomers, setIsLoadingCustomers] = useState(true); // Loading state for customers
    const [customerError, setCustomerError] = useState(null); // Error state for customers

    useEffect(() => {
    const fetchCustomers = async () => {
        try {
        const response = await getCustomers();
        setCustomers(response.data);
        } catch (err) {
        setCustomerError('Error fetching customers: ' + err.message);
        console.error('Error fetching customers:', err);
        } finally {
        setIsLoadingCustomers(false);
        }
    };

    const fetchProducts = async () => {
        try {
        const response = await getProducts();
        setProducts(response.data);
        } catch (err) {
        console.error('Error fetching products:', err);
        }
    };

    fetchCustomers();
    fetchProducts();
    }, []);

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalPrice = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const orderData = { ...order, total_price: totalPrice };

    try {
        const response = await createOrder(orderData);
        setMessage('Order created successfully!');
        console.log('Order creation response:', response);
    } catch (err) {
        setMessage('Error creating order: ' + err.message);
        console.error('Order creation error:', err.response.data);
    }
    };

    return (
        <div className="container">
            <h2>Create Order</h2>
            <form onSubmit={handleSubmit}>
            {/* ... your other form fields ... */}

        <div className="form-group">
            <label>Customer</label>
            {isLoadingCustomers ? (
            <div>Loading customers...</div> // Loading message
            ) : customerError ? (
            <div>Error: {customerError}</div> // Error message
            ) : (
            <select
                name="customer"
                className="form-control"
                value={order.customer}
                onChange={handleChange}
            >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                    {customer.name}
                </option>
                ))}
            </select>
            )}
        </div>

        {/* ... rest of your form fields ... */}
        </form>
    </div>
    );
};

export default OrderForm;