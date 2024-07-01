// src/components/SupplierList.js
import React, { useState, useEffect } from 'react';
import { getSuppliers, deleteSupplier } from '../services/api';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const response = await getSuppliers();
            setSuppliers(response.data);
        };

        fetchSuppliers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteSupplier(id);
            setSuppliers(suppliers.filter(supplier => supplier.id !== id));
        } catch (error) {
            console.error('Error deleting supplier:', error);
        }
    };

    return (
        <div className="container">
            <h2>Suppliers</h2>
            <ul className="list-group">
                {suppliers.map(supplier => (
                    <li key={supplier.id} className="list-group-item">
                        {supplier.name}
                        <button onClick={() => handleDelete(supplier.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SupplierList;
