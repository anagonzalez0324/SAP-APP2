// src/components/ArtworkJobForm.js
import React, { useState, useEffect } from 'react';
import { createArtworkJob, getCustomers } from '../services/api';

const ArtworkJobForm = () => {
    const [job, setJob] = useState({
        customer: '',
        job_name: '',
        description: '',
        due_date: '',
        status: '',
    });
    const [customers, setCustomers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await getCustomers();
            setCustomers(response.data);
        };
        fetchCustomers();
    }, []);

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createArtworkJob(job);
            setMessage('Artwork job created successfully!');
            console.log('Artwork job creation response:', response);
        } catch (err) {
            setMessage('Error creating artwork job: ' + JSON.stringify(err.response.data));
            console.error('Artwork job creation error:', err.response.data);
        }
    };

    return (
        <div className="container">
            <h2>Create Artwork Job</h2>
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
                        {customers.map(customer => (
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
