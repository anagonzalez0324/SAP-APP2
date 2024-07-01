// src/components/OrderList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders/'); // First request
                const ordersUrl = response.data.orders; // Get the orders URL

                const ordersResponse = await axios.get(ordersUrl); // Second request
                setOrders(ordersResponse.data); 
                setIsLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching orders');
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container">
            <h2>Order List</h2>
            <ul className="list-group">
                {orders.map(order => (
                    <li key={order.id} className="list-group-item">
                        {order.order_number} - {order.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;