// src/components/TaskAssignmentForm.js
import React, { useState, useEffect } from 'react';
import { createTaskAssignment, getUsers } from '../services/api';

const TaskAssignmentForm = () => {
    const [users, setUsers] = useState([]);
    const [taskAssignment, setTaskAssignment] = useState({
        task: '',
        user: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers();
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskAssignment({ ...taskAssignment, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTaskAssignment(taskAssignment);
            // Handle successful form submission (e.g., show a success message)
        } catch (error) {
            console.error('Error creating task assignment:', error);
            // Handle form submission error (e.g., show an error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="task">Task</label>
                <input
                    type="text"
                    className="form-control"
                    id="task"
                    name="task"
                    value={taskAssignment.task}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="user">User</label>
                <select
                    className="form-control"
                    id="user"
                    name="user"
                    value={taskAssignment.user}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a user</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Assign Task</button>
        </form>
    );
};

export default TaskAssignmentForm;
