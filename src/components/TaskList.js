// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await getTasks();
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    return (
        <div className="container">
            <h2>Task List</h2>
            <ul className="list-group">
                {tasks.map(task => (
                    <li key={task.id} className="list-group-item">
                        {task.task_name} - {task.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
