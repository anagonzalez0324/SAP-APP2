// src/components/PricingMatrixList.js
import React, { useState, useEffect } from 'react';
import { getPricingMatrices, deletePricingMatrix } from '../services/api';

const PricingMatrixList = () => {
    const [pricingMatrices, setPricingMatrices] = useState([]);

    useEffect(() => {
        const fetchPricingMatrices = async () => {
            const response = await getPricingMatrices();
            setPricingMatrices(response.data);
        };

        fetchPricingMatrices();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deletePricingMatrix(id);
            setPricingMatrices(pricingMatrices.filter(matrix => matrix.id !== id));
        } catch (error) {
            console.error('Error deleting pricing matrix:', error);
        }
    };

    return (
        <div className="container">
            <h2>Pricing Matrix List</h2>
            <ul className="list-group">
                {pricingMatrices.map(matrix => (
                    <li key={matrix.id} className="list-group-item">
                        {matrix.service.name} ({matrix.quantity_min}-{matrix.quantity_max}) - {matrix.price_per_unit}
                        <button onClick={() => handleDelete(matrix.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PricingMatrixList;
