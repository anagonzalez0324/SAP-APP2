// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h2>Product List</h2>
            <ul className="list-group">
                {products.map(product => (
                    <li key={product.id} className="list-group-item">
                        {product.name} - {product.price} - {product.stock} in stock
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
