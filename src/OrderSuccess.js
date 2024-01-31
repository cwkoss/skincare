import React from 'react';
import { Link } from 'react-router-dom';

function OrderSuccess() {
    return (
        <div className="order-success body-container">
            <h2>Order Submitted Successfully!</h2>
            <p>Your information has been successfully submitted. Please look out for a text message from Chris.</p>
            <p>We will coordinate the mixing time with you, ensuring that your formulation is mixed within 24 hours of when you receive it for maximum freshness.</p>
            <p>Thank you for using our service!</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default OrderSuccess;
