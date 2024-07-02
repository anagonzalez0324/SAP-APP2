// src/components/ArtworkJobForm.js
import React, { useState, useEffect } from 'react';
import { createArtworkJob, getCustomers } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const ArtworkJobForm = () => {
    const [job, setJob] = useState({
        customer: '',
        job_name: '',
        description: '',
        due_date: '',
        status: '',
        approval_status: 'Pending',
    });
    const [customers, setCustomers] = useState([]);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getCustomers();
                setCustomers(response.data);
            } catch (err) {
                console.error("Error fetching customers:", err);
            }
        };
        fetchCustomers();
    }, []);

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation (replace with more robust validation as needed)
        const newErrors = {};
        if (!job.description) {
            newErrors.description = "Description is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await createArtworkJob(job);
            setMessage('Artwork job created successfully!');
            console.log('Artwork job creation response:', response);
            navigate("/artwork-jobs"); 
        } catch (err) {
            if (err.response && err.response.data) {
                // Handle specific error responses from the backend
                setErrors(err.response.data);
            } else {
                setMessage("Error creating artwork job. Please try again.");
                console.error('Artwork job creation error:', err);
            }
        }
    };

    return (
        <div className="container">
            <h2>Create Artwork Job</h2>
            <Link to="/artwork-jobs" className="btn btn-secondary mb-3">
                Back to Artwork Jobs
            </Link>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer</label>
                    <select
                        name="customer"
                        className="form-control"
                        value={job.customer}
                        onChange={handleChange}
                    >
                        <option value="">Select Customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Job Name</label>
                    <input
                        type="text"
                        name="job_name"
                        className="form-control"
                        value={job.job_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={job.description}
                        onChange={handleChange}
                    />
                    {errors.description && (
                        <div className="text-danger">{errors.description}</div>
                    )}
                </div>
                <div className="form-group">
                    <label>Due Date</label>
                    <input
                        type="date"
                        name="due_date"
                        className="form-control"
                        value={job.due_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input
                        type="text"
                        name="status"
                        className="form-control"
                        value={job.status}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Artwork Job</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ArtworkJobForm;
