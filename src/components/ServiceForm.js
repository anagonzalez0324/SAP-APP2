import React, { useState, useEffect } from "react";
import { createService, getServices } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const ServiceForm = () => {
  const [service, setService] = useState({
    name: "",
    description: "", // Add description field
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({
      ...service,
      [name]: value,
    });

    // Clear validation error for the changed field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!service.name.trim()) {
      newErrors.name = "Name is required";
    }
    // Add more validation rules as needed

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Don't submit if there are errors
    }

    try {
      await createService(service);
      setMessage("Service created successfully!");
      navigate("/services"); // Redirect after successful creation
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setMessage("Error creating service. Please try again.");
        console.error("Service creation error:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Create Service</h2>
      <Link to="/services" className="btn btn-secondary mb-3">
        Back to Services
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={service.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={service.description}
            onChange={handleChange}
          />
          {errors.description && (
            <div className="text-danger">{errors.description}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Create Service
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ServiceForm;
