// src/components/PipelineStageList.js
import React, { useEffect, useState } from 'react';
import { getPipelineStages } from '../services/api';

const PipelineStageList = () => {
    const [stages, setStages] = useState([]);

    useEffect(() => {
        const fetchStages = async () => {
            const response = await getPipelineStages();
            setStages(response.data);
        };
        fetchStages();
    }, []);

    return (
        <div className="container">
            <h2>Sales Pipeline Stages</h2>
            <ul className="list-group">
                {stages.map(stage => (
                    <li key={stage.id} className="list-group-item">
                        {stage.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PipelineStageList;
