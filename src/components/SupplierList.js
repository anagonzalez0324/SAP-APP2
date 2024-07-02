// src/components/SupplierList.js
import React, { useState, useEffect } from "react";
import { getSuppliers, deleteSupplier } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [needsRefresh, setNeedsRefresh] = useState(false);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await getSuppliers();
                setSuppliers(response.data);
            } catch (err) {
                setError(err.message || "Error fetching suppliers");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuppliers();
    }, [needsRefresh]);

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this supplier?")) {
            try {
                await deleteSupplier(id);
                setNeedsRefresh(true);
            } catch (err) {
                setError(err.message || "Error deleting supplier");
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
            <h2>Supplier List</h2>
            <Link to="/create-supplier" className="btn btn-primary mb-3">
                Create Supplier
            </Link>
            <ul className="list-group">
                {suppliers.map((supplier) => (
                    <li key={supplier.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                {supplier.name} - {supplier.contact_name} -{" "}
                                {supplier.email}
                            </div>
                            <button
                                onClick={() => handleDelete(supplier.id)}
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

export default SupplierList;
