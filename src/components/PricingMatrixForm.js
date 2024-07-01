// src/components/PricingMatrixForm.js
import React, { useState, useEffect } from 'react';
import { createPricingMatrix, getServices } from '../services/api';

const PricingMatrixForm = () => {
    const [pricingMatrix, setPricingMatrix] = useState({
        service: '',
        quantity_min: 0,
        quantity_max: 0,
        price_per_unit: 0.00,
    });
    const [services, setServices] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            const response = await getServices();
            setServices(response.data);
        };

        fetchServices();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPricingMatrix({
            ...pricingMatrix,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPricingMatrix(pricingMatrix);
            setMessage('Pricing matrix created successfully!');
        } catch (error) {
            setMessage('Error creating pricing matrix: ' + error.message);
            console.error('Pricing matrix creation error:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create Pricing Matrix</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Service</label>
                    <select
                        name="service"
                        className="form-control"
                        value={pricingMatrix.service}
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
                    <label>Quantity Min</label>
                    <input
                        type="number"
                        name="quantity_min"
                        className="form-control"
                        value={pricingMatrix.quantity_min}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Quantity Max</label>
                    <input
                        type="number"
                        name="quantity_max"
                        className="form-control"
                        value={pricingMatrix.quantity_max}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Price Per Unit</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price_per_unit"
                        className="form-control"
                        value={pricingMatrix.price_per_unit}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Pricing Matrix</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default PricingMatrixForm;
