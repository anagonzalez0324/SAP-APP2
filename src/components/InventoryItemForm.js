// src/components/InventoryItemForm.js
import React, { useState, useEffect } from 'react';
import { createInventoryItem, getCategories, getSuppliers } from '../services/api';

const InventoryItemForm = () => {
    const [inventoryItem, setInventoryItem] = useState({
        name: '',
        category: '',
        supplier: '',
        quantity: 0,
        low_stock_threshold: 0,
        price_per_unit: 0.00,
    });
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategories(response.data);
        };

        const fetchSuppliers = async () => {
            const response = await getSuppliers();
            setSuppliers(response.data);
        };

        fetchCategories();
        fetchSuppliers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryItem({
            ...inventoryItem,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createInventoryItem(inventoryItem);
            setMessage('Inventory item created successfully!');
        } catch (error) {
            setMessage('Error creating inventory item: ' + error.message);
            console.error('Inventory item creation error:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create Inventory Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={inventoryItem.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        className="form-control"
                        value={inventoryItem.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Supplier</label>
                    <select
                        name="supplier"
                        className="form-control"
                        value={inventoryItem.supplier}
                        onChange={handleChange}
                    >
                        <option value="">Select Supplier</option>
                        {suppliers.map(supplier => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
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
                        value={inventoryItem.quantity}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Low Stock Threshold</label>
                    <input
                        type="number"
                        name="low_stock_threshold"
                        className="form-control"
                        value={inventoryItem.low_stock_threshold}
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
                        value={inventoryItem.price_per_unit}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Inventory Item</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default InventoryItemForm;
