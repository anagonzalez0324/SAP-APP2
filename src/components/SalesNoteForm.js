// src/components/SalesNoteForm.js
import React, { useState, useEffect } from 'react';
import { createSalesNote, getQuotes } from '../services/api';

const SalesNoteForm = () => {
    const [note, setNote] = useState({
        quote: '',
        note: '',
    });
    const [quotes, setQuotes] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchQuotes = async () => {
            const response = await getQuotes();
            setQuotes(response.data);
        };
        fetchQuotes();
    }, []);

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createSalesNote(note);
            setMessage('Sales note created successfully!');
            console.log('Sales note creation response:', response);
        } catch (err) {
            setMessage('Error creating sales note: ' + err.message);
            console.error('Sales note creation error:', err.response.data);
        }
    };

    return (
        <div className="container">
            <h2>Create Sales Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Quote</label>
                    <select
                        name="quote"
                        className="form-control"
                        value={note.quote}
                        onChange={handleChange}
                    >
                        <option value="">Select Quote</option>
                        {quotes.map(quote => (
                            <option key={quote.id} value={quote.id}>
                                {quote.customer_name} - {quote.service.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Note</label>
                    <textarea
                        name="note"
                        className="form-control"
                        value={note.note}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Note</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default SalesNoteForm;
