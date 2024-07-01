// src/components/TaskAssignmentList.js
import React, { useState, useEffect } from 'react';
import { getTaskAssignments, deleteTaskAssignment } from '../services/api';

const TaskAssignmentList = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            const response = await getTaskAssignments();
            setAssignments(response.data);
        };

        fetchAssignments();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteTaskAssignment(id);
            setAssignments(assignments.filter(assignment => assignment.id !== id));
        } catch (error) {
            console.error('Error deleting assignment:', error);
        }
    };

    return (
        <div className="container">
            <h2>Task Assignments</h2>
            <ul className="list-group">
                {assignments.map(assignment => (
                    <li key={assignment.id} className="list-group-item">
                        {assignment.task.name} assigned to {assignment.user.username}
                        <button onClick={() => handleDelete(assignment.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskAssignmentList;
