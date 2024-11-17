import React, { useState } from "react";
import axios from "axios";
import './Email.css'

const Email = () => {
  // Initialize state with an empty string to prevent undefined errors
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    // Check if email, subject, and message are provided before submitting
    if (!email || !subject || !message) {
      setStatus('Please fill in all fields.');
      return;
    }

    const formData = {
      email,
      subject,
      message,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/email/send', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.success) {
        setStatus('Email sent successfully!');
      } else {
        setStatus('Failed to send email.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send email.');
    }
  };

  return (
    <div className="email-container">
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            rows="5"
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Email;
