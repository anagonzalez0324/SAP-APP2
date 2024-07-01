// src/components/CategoryList.js
import React, { useState, useEffect } from 'react';
import { getCategories, deleteCategory } from '../services/api';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategories(response.data);
        };

        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            setCategories(categories.filter(category => category.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="container">
            <h2>Categories</h2>
            <ul className="list-group">
                {categories.map(category => (
                    <li key={category.id} className="list-group-item">
                        {category.name}
                        <button onClick={() => handleDelete(category.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
