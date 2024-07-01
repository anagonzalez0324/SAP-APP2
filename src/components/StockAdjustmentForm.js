// src/components/StockAdjustmentForm.js
import React, { useState, useEffect } from 'react';
import { createStockAdjustment, getInventoryItems } from '../services/api';

const StockAdjustmentForm = () => {
    const [stockAdjustment, setStockAdjustment] = useState({
        inventory_item: '',
        adjustment_quantity: 0,
        adjustment_reason: '',
    });
    const [inventoryItems, setInventoryItems] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchInventoryItems = async () => {
            const response = await getInventoryItems();
            setInventoryItems(response.data);
        };

        fetchInventoryItems();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStockAdjustment({
            ...stockAdjustment,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createStockAdjustment(stockAdjustment);
            setMessage('Stock adjustment created successfully!');
        } catch (error) {
            setMessage('Error creating stock adjustment: ' + error.message);
            console.error('Stock adjustment creation error:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create Stock Adjustment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Inventory Item</label>
                    <select
                        name="inventory_item"
                        className="form-control"
                        value={stockAdjustment.inventory_item}
                        onChange={handleChange}
                    >
                        <option value="">Select Inventory Item</option>
                        {inventoryItems.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Adjustment Quantity</label>
                    <input
                        type="number"
                        name="adjustment_quantity"
                        className="form-control"
                        value={stockAdjustment.adjustment_quantity}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Adjustment Reason</label>
                    <textarea
                        name="adjustment_reason"
                        className="form-control"
                        value={stockAdjustment.adjustment_reason}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Stock Adjustment</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default StockAdjustmentForm;
