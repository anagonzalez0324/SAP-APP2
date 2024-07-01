// src/components/CategoryForm.js
import React, { useState } from 'react';
import { createCategory } from '../services/api';

const CategoryForm = () => {
    const [category, setCategory] = useState({
        name: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCategory(category);
            setMessage('Category created successfully!');
        } catch (error) {
            setMessage('Error creating category: ' + error.message);
            console.error('Category creation error:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={category.name}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Category</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default CategoryForm;
