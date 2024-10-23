import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';
import Login from './Login';

function OrderSuccess() {
    const location = useLocation();
    const { orderId } = location.state || {};
    const { user } = useUser();

    return (
        <div className="order-success body-container" style={{"textAlign": "center"}}>
            <h2>Order Submitted Successfully!</h2>
            <p>Your order ID is: {orderId}</p>
            <p>Please watch for a text message from Chris. We will coordinate the mixing time with you, ensuring that your formulation is mixed within 24 hours of when you receive it for maximum freshness.</p>
            <p>While this service is in development, we are requesting that you donate to the <br /><a href="https://www.pcrf.net/">Palestinian Children's Relief Fund</a> <br />in lieu of payment!<br />Suggested donation is $30, but any amount is wonderful!</p>
            
            {!user && (
                <div>
                    <h3>Create an Account to Track Your Order</h3>
                    <p>Sign up now to easily check your order status, reorder your favorite recipes, and get personalized skincare recommendations!</p>
                    <Login />
                </div>
            )}
            
            <p>Thank you for using our service!</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default OrderSuccess;
