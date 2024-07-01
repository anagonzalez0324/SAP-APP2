// src/components/SalesNoteList.js
import React, { useState, useEffect } from 'react';
import { getSalesNotes, deleteSalesNote } from '../services/api';

const SalesNoteList = () => {
    const [salesNotes, setSalesNotes] = useState([]);

    useEffect(() => {
        const fetchSalesNotes = async () => {
            const response = await getSalesNotes();
            setSalesNotes(response.data);
        };

        fetchSalesNotes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteSalesNote(id);
            setSalesNotes(salesNotes.filter(note => note.id !== id));
        } catch (error) {
            console.error('Error deleting sales note:', error);
        }
    };

    return (
        <div className="container">
            <h2>Sales Notes</h2>
            <ul className="list-group">
                {salesNotes.map(note => (
                    <li key={note.id} className="list-group-item">
                        {note.note}
                        <button onClick={() => handleDelete(note.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SalesNoteList;
