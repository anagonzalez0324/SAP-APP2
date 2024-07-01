// src/components/ProductionFileUpload.js
import React, { useState, useEffect } from 'react';
import { uploadProductionFile, getProductionTasks } from '../services/api';

const ProductionFileUpload = () => {
    const [productionFile, setProductionFile] = useState({
        task: '',
        file: null,
    });
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await getProductionTasks();
            setTasks(response.data);
        };

        fetchTasks();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProductionFile({
            ...productionFile,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('task', productionFile.task);
        formData.append('file', productionFile.file);

        try {
            await uploadProductionFile(formData);
            setMessage('Production file uploaded successfully!');
        } catch (error) {
            setMessage('Error uploading production file: ' + error.message);
            console.error('Production file upload error:', error);
        }
    };

    return (
        <div className="container">
            <h2>Upload Production File</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Task</label>
                    <select
                        name="task"
                        className="form-control"
                        value={productionFile.task}
                        onChange={handleChange}
                    >
                        <option value="">Select Task</option>
                        {tasks.map(task => (
                            <option key={task.id} value={task.id}>
                                {task.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>File</label>
                    <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Upload File</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ProductionFileUpload;
