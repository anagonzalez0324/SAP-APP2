// src/components/ArtworkJobList.js
import React, { useEffect, useState } from 'react';
import { getArtworkJobs } from '../services/api';

const ArtworkJobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await getArtworkJobs();
            setJobs(response.data);
        };
        fetchJobs();
    }, []);

    return (
        <div className="container">
            <h2>Artwork Job List</h2>
            <ul className="list-group">
                {jobs.map(job => (
                    <li key={job.id} className="list-group-item">
                        {job.job_name} - {job.status} - {job.approval_status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArtworkJobList;
