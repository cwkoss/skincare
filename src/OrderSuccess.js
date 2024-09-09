import React from 'react';
import { Link } from 'react-router-dom';

function OrderSuccess() {
    return (
        <div className="order-success body-container" style={{"text-align": "center"}}>
            <h2>Order Submitted Successfully!</h2>
            <p>Please watch for a text message from Chris. We will coordinate the mixing time with you, ensuring that your formulation is mixed within 24 hours of when you receive it for maximum freshness.</p>
            <p>While this service is in development, we are requesting that you donate to the <br /><a href="https://www.pcrf.net/">Palestinian Children's Relief Fund</a> <br />in lieu of payment!<br />Suggested donation is $30, but any amount is wonderful!</p>
            <p>Thank you for using our service!</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default OrderSuccess;
