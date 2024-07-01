// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { createTask, getOrders } from '../services/api';

const TaskForm = () => {
    const [task, setTask] = useState({
        order: '',
        task_name: '',
        assigned_to: '',
        status: '',
        due_date: '',
    });
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await getOrders();
            setOrders(response.data);
        };
        fetchOrders();
    }, []);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createTask(task);
            setMessage('Task created successfully!');
            console.log('Task creation response:', response);
        } catch (err) {
            setMessage('Error creating task: ' + err.message);
            console.error('Task creation error:', err.response.data);
        }
    };

    return (
        <div className="container">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Order</label>
                    <select
                        name="order"
                        className="form-control"
                        value={task.order}
                        onChange={handleChange}
                    >
                        <option value="">Select Order</option>
                        {orders.map(order => (
                            <option key={order.id} value={order.id}>
                                {order.order_number}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Task Name</label>
                    <input
                        type="text"
                        name="task_name"
                        className="form-control"
                        value={task.task_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Assigned To</label>
                    <input
                        type="text"
                        name="assigned_to"
                        className="form-control"
                        value={task.assigned_to}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input
                        type="text"
                        name="status"
                        className="form-control"
                        value={task.status}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Due Date</label>
                    <input
                        type="date"
                        name="due_date"
                        className="form-control"
                        value={task.due_date}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Task</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default TaskForm;
