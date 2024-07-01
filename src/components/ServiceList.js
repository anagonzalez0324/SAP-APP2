// src/components/ServiceList.js
import React, { useState, useEffect } from 'react';
import { getServices, deleteService } from '../services/api';

const ServiceList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const response = await getServices();
            setServices(response.data);
        };

        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteService(id);
            setServices(services.filter(service => service.id !== id));
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    return (
        <div className="container">
            <h2>Service List</h2>
            <ul className="list-group">
                {services.map(service => (
                    <li key={service.id} className="list-group-item">
                        {service.name}
                        <button onClick={() => handleDelete(service.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceList;
