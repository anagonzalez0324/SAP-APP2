// src/components/StockAdjustmentList.js
import React, { useState, useEffect } from 'react';
import { getStockAdjustments, deleteStockAdjustment } from '../services/api';

const StockAdjustmentList = () => {
    const [stockAdjustments, setStockAdjustments] = useState([]);

    useEffect(() => {
        const fetchStockAdjustments = async () => {
            const response = await getStockAdjustments();
            setStockAdjustments(response.data);
        };

        fetchStockAdjustments();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteStockAdjustment(id);
            setStockAdjustments(stockAdjustments.filter(adjustment => adjustment.id !== id));
        } catch (error) {
            console.error('Error deleting stock adjustment:', error);
        }
    };

    return (
        <div className="container">
            <h2>Stock Adjustments</h2>
            <ul className="list-group">
                {stockAdjustments.map(adjustment => (
                    <li key={adjustment.id} className="list-group-item">
                        {adjustment.adjustment_reason}
                        <button onClick={() => handleDelete(adjustment.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockAdjustmentList;
