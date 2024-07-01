// src/components/FollowUpReminderList.js
import React, { useState, useEffect } from 'react';
import { getFollowUpReminders, deleteFollowUpReminder } from '../services/api';

const FollowUpReminderList = () => {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        const fetchReminders = async () => {
            const response = await getFollowUpReminders();
            setReminders(response.data);
        };

        fetchReminders();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteFollowUpReminder(id);
            setReminders(reminders.filter(reminder => reminder.id !== id));
        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    };

    return (
        <div className="container">
            <h2>Follow-Up Reminders</h2>
            <ul className="list-group">
                {reminders.map(reminder => (
                    <li key={reminder.id} className="list-group-item">
                        {reminder.message} on {new Date(reminder.reminder_date).toLocaleString()}
                        <button onClick={() => handleDelete(reminder.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowUpReminderList;
