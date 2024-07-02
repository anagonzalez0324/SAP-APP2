// src/components/SupplierForm.js
import React, { useState, useEffect } from 'react';
import { createSupplier, getSuppliers } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const SupplierForm = () => {
    const [supplier, setSupplier] = useState({
        name: '',
        contact_name: '',  
        email: '',         
        phone: '',
        address: '',
        notes: '',          
    });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prevSupplier) => ({
            ...prevSupplier,
            [name]: value,
        }));

        // Clear validation error for the changed field
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation (replace with more robust validation as needed)
        const newErrors = {};
        if (!supplier.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Don't submit if there are errors
        }

        try {
            await createSupplier(supplier);
            setMessage("Supplier created successfully!");
            navigate("/suppliers"); 
        } catch (err) {
            if (err.response && err.response.data) {
                setErrors(err.response.data);
            } else {
                setMessage("Error creating supplier. Please try again.");
                console.error("Supplier creation error:", err);
            }
        }
    };

    return (
        <div className="container">
            <h2>Create Supplier</h2>
            <Link to="/suppliers" className="btn btn-secondary mb-3">
                Back to Suppliers
            </Link>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        value={supplier.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="contact_name">Contact Name</label>
                    <input
                        type="text"
                        name="contact_name"
                        id="contact_name"
                        className="form-control"
                        value={supplier.contact_name}
                        onChange={handleChange}
                    />
                    {errors.contact_name && <div className="text-danger">{errors.contact_name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={supplier.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        name="phone_number"  // Change the name attribute to phone_number
                        id="phone" // Optional: if using a label, make sure the id is connected
                        className="form-control"
                        value={supplier.phone}
                        onChange={handleChange}
                        />
                        {errors.phone_number && ( // Update error message reference
                        <div className="text-danger">{errors.phone_number}</div>
                        )}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                        name="address"
                        id="address"
                        className="form-control"
                        value={supplier.address}
                        onChange={handleChange}
                    />
                    {errors.address && <div className="text-danger">{errors.address}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        name="notes"
                        id="notes"
                        className="form-control"
                        value={supplier.notes}
                        onChange={handleChange}
                    />
                    {errors.notes && <div className="text-danger">{errors.notes}</div>}
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Supplier
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default SupplierForm;
