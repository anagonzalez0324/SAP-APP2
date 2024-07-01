// src/components/ProductForm.js
import React, { useState } from 'react';
import { createProduct } from '../services/api';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createProduct(product);
            setMessage('Product created successfully!');
            console.log('Product creation response:', response);
        } catch (err) {
            setMessage('Error creating product: ' + err.message);
            console.error('Product creation error:', err.response.data);
        }
    };

    return (
        <div className="container">
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        className="form-control"
                        value={product.stock}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Product</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ProductForm;
