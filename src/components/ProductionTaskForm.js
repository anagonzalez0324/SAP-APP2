// src/components/ProductionTaskForm.js
import React, { useState } from 'react';
import { createProductionTask } from '../services/api';

const ProductionTaskForm = () => {
    const [task, setTask] = useState({
        name: '',
        description: '',
        status: 'pending',
        due_date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProductionTask(task);
            // Handle successful form submission (e.g., show a success message)
        } catch (error) {
            console.error('Error creating task:', error);
            // Handle form submission error (e.g., show an error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={task.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                    required
                >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="due_date">Due Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="due_date"
                    name="due_date"
                    value={task.due_date}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Create Task</button>
        </form>
    );
};

export default ProductionTaskForm;
