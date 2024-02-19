import React from 'react';
import './ContactForm.tsx'; // Import the CSS file

const ContactForm: React.FC = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission and data storage
        const formData = new FormData(e.currentTarget);
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });
        // Send data to backend
        try {
            const response = await fetch('http://localhost:5000/api/submit-contact', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });
            if (response.ok) {
                // Handle success
                console.log('Data submitted successfully');
            } else {
                // Handle failure
                console.error('Failed to submit data');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="form-container">
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
