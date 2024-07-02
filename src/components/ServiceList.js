// src/components/ServiceList.js
import React, { useState, useEffect } from "react";
import { getServices, deleteService } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (err) {
        setError(err.message || "Error fetching services");
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, [needsRefresh]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        setNeedsRefresh(true);
      } catch (err) {
        setError(err.message || "Error deleting service");
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
      <h2>Service List</h2>
      <Link to="/create-service" className="btn btn-primary mb-3">
        Create Service
      </Link>
      <ul className="list-group">
        {services.map((service) => (
          <li key={service.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {service.name} - {service.description}
              </div>
              <button
                onClick={() => handleDelete(service.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
