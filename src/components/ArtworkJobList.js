// src/components/ArtworkJobList.js
import React, { useEffect, useState } from "react";
import { getArtworkJobs, deleteArtworkJob } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const ArtworkJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getArtworkJobs();
        setJobs(response.data);
      } catch (err) {
        setError(err.message || "Error fetching artwork jobs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [needsRefresh]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this artwork job?")) {
      try {
        await deleteArtworkJob(id);
        setNeedsRefresh(true);
      } catch (err) {
        setError(err.message || "Error deleting artwork job");
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Artwork Job List</h2>
      <Link to="/create-artwork-job" className="btn btn-primary mb-3">
        Create Artwork Job
      </Link>
      <ul className="list-group">
        {jobs.map((job) => (
          <li key={job.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {job.job_name} - {job.status} - {job.approval_status}
              </div>
              <button
                onClick={() => handleDelete(job.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtworkJobList;
