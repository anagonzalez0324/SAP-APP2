// src/components/ProductionTaskList.js
import React, { useState, useEffect } from 'react';
import { getProductionTasks, deleteProductionTask } from '../services/api';

const ProductionTaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await getProductionTasks();
            setTasks(response.data);
        };

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteProductionTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="container">
            <h2>Production Tasks</h2>
            <ul className="list-group">
                {tasks.map(task => (
                    <li key={task.id} className="list-group-item">
                        {task.name}
                        <button onClick={() => handleDelete(task.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductionTaskList;
