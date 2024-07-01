// src/components/CustomerList.js
import React, { useState, useEffect } from 'react';
import { getCustomers, deleteCustomer } from '../services/api';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await getCustomers();
            setCustomers(response.data);
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id);
            setCustomers(customers.filter(customer => customer.id !== id));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    return (
        <div className="container">
            <h2>Customer List</h2>
            <ul className="list-group">
                {customers.map(customer => (
                    <li key={customer.id} className="list-group-item">
                        {customer.name} ({customer.customer_type})
                        <button onClick={() => handleDelete(customer.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
