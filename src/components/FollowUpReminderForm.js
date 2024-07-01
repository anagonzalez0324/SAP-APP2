// src/components/FollowUpReminderForm.js
import React, { useState, useEffect } from 'react';
import { createFollowUpReminder, getQuotes } from '../services/api';

const FollowUpReminderForm = () => {
    const [reminder, setReminder] = useState({
        quote: '',
        reminder_date: '',
        message: '',
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
        setReminder({ ...reminder, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createFollowUpReminder(reminder);
            setMessage('Follow-up reminder created successfully!');
            console.log('Follow-up reminder creation response:', response);
        } catch (err) {
            setMessage('Error creating follow-up reminder: ' + err.message);
            console.error('Follow-up reminder creation error:', err.response.data);
        }
    };

    return (
        <div className="container">
            <h2>Create Follow-Up Reminder</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Quote</label>
                    <select
                        name="quote"
                        className="form-control"
                        value={reminder.quote}
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
                    <label>Reminder Date</label>
                    <input
                        type="datetime-local"
                        name="reminder_date"
                        className="form-control"
                        value={reminder.reminder_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        name="message"
                        className="form-control"
                        value={reminder.message}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Reminder</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default FollowUpReminderForm;
