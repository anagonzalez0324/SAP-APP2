// src/components/InventoryItemList.js
import React, { useState, useEffect } from 'react';
import { getInventoryItems, deleteInventoryItem } from '../services/api';

const InventoryItemList = () => {
    const [inventoryItems, setInventoryItems] = useState([]);

    useEffect(() => {
        const fetchInventoryItems = async () => {
            const response = await getInventoryItems();
            setInventoryItems(response.data);
        };

        fetchInventoryItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteInventoryItem(id);
            setInventoryItems(inventoryItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting inventory item:', error);
        }
    };

    return (
        <div className="container">
            <h2>Inventory Items</h2>
            <ul className="list-group">
                {inventoryItems.map(item => (
                    <li key={item.id} className="list-group-item">
                        {item.name}
                        <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventoryItemList;
