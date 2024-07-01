// src/components/ArtworkFileUpload.js
import React, { useState, useEffect } from 'react';
import { uploadArtworkFile, getArtworkJobs } from '../services/api';

const ArtworkFileUpload = () => {
    const [file, setFile] = useState(null);
    const [job, setJob] = useState('');
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await getArtworkJobs();
            setJobs(response.data);
        };
        fetchJobs();
    }, []);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleJobChange = (e) => {
        setJob(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('job', job);

        try {
            const response = await uploadArtworkFile(formData);
            setMessage('File uploaded successfully!');
            console.log('File upload response:', response);
        } catch (err) {
            setMessage('Error uploading file: ' + err.message);
            console.error('File upload error:', err.response.data);
        }
    };

    return (
        <div className="container">
            <h2>Upload Artwork File</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Job</label>
                    <select
                        name="job"
                        className="form-control"
                        value={job}
                        onChange={handleJobChange}
                    >
                        <option value="">Select Job</option>
                        {jobs.map(job => (
                            <option key={job.id} value={job.id}>
                                {job.job_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>File</label>
                    <input
                        type="file"
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

export default ArtworkFileUpload;
