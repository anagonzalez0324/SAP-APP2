import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [needsRefresh, setNeedsRefresh] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders/');
                setOrders(response.data); // Assuming the API returns an array of orders directly
            } catch (err) {
                setError(err.message || 'Error fetching orders');
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [needsRefresh]); // Include needsRefresh dependency


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`/api/orders/${id}/`);
        setNeedsRefresh(true);
      } catch (err) {
        setError(err.message || "Error deleting order");
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Order List</h2>
      <Link to="/create-order" className="btn btn-primary mb-3">
        Create Order
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Customer</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.order_number}</td>
              <td>{order.customer}</td>
              <td>{order.due_date}</td>
              <td>{order.status}</td>
              <td>${order.total_price}</td>
              <td>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
