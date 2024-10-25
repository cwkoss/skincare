import React, { useState } from 'react';
import { db } from './firebase-config'; 
import { collection, addDoc } from 'firebase/firestore'

const Contact = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'contact-form-submissions'), {
        phoneNumber,
        message,
        createdAt: new Date()
      });

        setIsSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (isSubmitted) {
    return <div><h1>Thanks for contacting us! <br /> We'll get back to you soon!</h1>
    <a href="/">Back to home</a>
    </div>;
  }

  return (
    <div className='content-container'>
    <form onSubmit={handleSubmit} className='contact-us-form'>
        <h2>Contact Us</h2>
      <label>
        <strong>Phone number</strong> (if you'd like us to text you a response): <br />
        <input
        className='input'
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
        <br />
      <label>
        <strong>Message:</strong><br />
        <textarea
          className="big-text-area input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default Contact;
