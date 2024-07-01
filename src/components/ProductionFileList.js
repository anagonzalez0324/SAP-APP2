// src/components/ProductionFileList.js
import React, { useState, useEffect } from 'react';
import { getProductionFiles, deleteProductionFile } from '../services/api';

const ProductionFileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const response = await getProductionFiles();
            setFiles(response.data);
        };

        fetchFiles();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteProductionFile(id);
            setFiles(files.filter(file => file.id !== id));
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <div className="container">
            <h2>Production Files</h2>
            <ul className="list-group">
                {files.map(file => (
                    <li key={file.id} className="list-group-item">
                        {file.file}
                        <button onClick={() => handleDelete(file.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductionFileList;
