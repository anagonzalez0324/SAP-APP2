// src/components/CustomerList.js
import React, { useState, useEffect } from "react";
import { getCustomers, deleteCustomer } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        setCustomers(response.data);
      } catch (err) {
        setError(err.message || "Error fetching customers");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, [needsRefresh]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id);
        setNeedsRefresh(true);
      } catch (err) {
        setError(err.message || "Error deleting customer");
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
      <h2>Customer List</h2>
      <Link to="/create-customer" className="btn btn-primary mb-3">
        Create Customer
      </Link>
      <ul className="list-group">
        {/* Conditionally render customers if they are available */}
        {Array.isArray(customers) && customers.length > 0 ? (
          customers.map((customer) => (
            <li key={customer.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>{customer.name} - {customer.email}</div>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No customers found.</p>
        )}
      </ul>
    </div>
  );
};

export default CustomerList;

