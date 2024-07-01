// src/components/SupplierForm.js
import React, { useState } from 'react';
import { createSupplier } from '../services/api';

const SupplierForm = () => {
    const [supplier, setSupplier] = useState({
        name: '',
        contact_info: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({
            ...supplier,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSupplier(supplier);
            setMessage('Supplier created successfully!');
        } catch (error) {
            setMessage('Error creating supplier: ' + error.message);
            console.error('Supplier creation error:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create Supplier</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={supplier.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Contact Info</label>
                    <textarea
                        name="contact_info"
                        className="form-control"
                        value={supplier.contact_info}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Supplier</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default SupplierForm;
