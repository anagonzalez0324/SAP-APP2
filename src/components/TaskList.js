// src/components/TaskList.js
import React, { useState, useEffect } from "react";
import { getTasks, deleteTask } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (err) {
        setError(err.message || "Error fetching tasks");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [needsRefresh]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        setNeedsRefresh(true);
      } catch (err) {
        setError(err.message || "Error deleting task");
      }
    }
  };

  const handleTaskCreated = () => {
    setNeedsRefresh(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Task List</h2>
      <Link to="/create-task" className="btn btn-primary mb-3">
        Create Task
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Task Name</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.order}</td>
              <td>{task.task_name}</td>
              <td>{task.assigned_to}</td>
              <td>{task.status}</td>
              <td>{task.due_date}</td>
              <td>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;