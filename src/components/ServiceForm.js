// src/components/ServiceForm.js
import React, { useState } from 'react';
import { createService } from '../services/api';

const ServiceForm = () => {
    const [service, setService] = useState({
        name: '',
        base_price: 0.00,
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService({
            ...service,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createService(service);
            setMessage('Service created successfully!');
        } catch (error) {
            setMessage('Error creating service: ' + error.message);
            console.error('Service creation error:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create Service</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={service.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Base Price</label>
                    <input
                        type="number"
                        step="0.01"
                        name="base_price"
                        className="form-control"
                        value={service.base_price}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Service</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ServiceForm;
