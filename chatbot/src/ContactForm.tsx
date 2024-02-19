import React, { useState } from 'react';
import './App.css'; // Import the CSS file

const ContactForm: React.FC = () => {
    const [showForm, setShowForm] = useState(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission and data storage
        const formData = new FormData(e.currentTarget);
        const jsonData: {[key: string]: string} = {}; // Define jsonData as an object with string keys and values
        formData.forEach((value, key) => {
            jsonData[key] = value as string;
        });
        // Send data to backend
        try {
            const response = await fetch('http://localhost:5000/api/contact', { // Corrected endpoint URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });
            if (response.ok) {
                // Handle success
                console.log('Data submitted successfully');
                // Assuming you want to hide the form after successful submission
                setShowForm(false);
            } else {
                // Handle failure
                console.error('Failed to submit data');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const handleClose = () => {
        // Handle close button click event
        setShowForm(false);
    };

    if (!showForm) {
        return null; // If showForm is false, return null to hide the form
    }

    return (
        <div className="form-container">
            <button className="close-button" onClick={handleClose}>Close</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ContactForm;
