// src/components/SalesPipeline.js
import React, { useState, useEffect } from 'react';
import { getSalesPipelineStages } from '../services/api';

const SalesPipeline = () => {
    const [stages, setStages] = useState([]);

    useEffect(() => {
        const fetchStages = async () => {
            const response = await getSalesPipelineStages();
            setStages(response.data);
        };

        fetchStages();
    }, []);

    return (
        <div className="container">
            <h2>Sales Pipeline</h2>
            <ul className="list-group">
                {stages.map(stage => (
                    <li key={stage.id} className="list-group-item">
                        {stage.name} - {stage.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SalesPipeline;
