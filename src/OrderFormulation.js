import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from './firebase-config';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';

function OrderFormulation() {
    const [recipeData, setRecipeData] = useState(null);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [pickup, setPickup] = useState(true);
    const [address, setAddress] = useState({ street1: '', street2: '', zip: '' });
    const location = useLocation();
    const recipeId = location.state?.recipeId;

    useEffect(() => {
        if (recipeId) {
            const fetchData = async () => {
                const docRef = doc(db, "formulations", recipeId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRecipeData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            };

            fetchData();
        }
    }, [recipeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "orders"), {
                name,
                recipeId,
                phoneNumber,
                pickup,
                address: pickup ? null : address
            });
            console.log("Order submitted");
            // Navigate to a success page or display a success message
        } catch (e) {
            console.error("Error submitting order: ", e);
            // Show an error message or handle the error as needed
        }
    };

    if (!recipeData) return <div>Loading...</div>;

    return (
        <div>
            <h2>{recipeData.name}</h2>
            <div className="recipe">
                {Object.keys(recipeData.ingredients).map((key, index) => (
                    <div key={index}>
                        <strong>{key}</strong>: {recipeData.ingredients[key]}
                    </div>
                ))}
            </div>
            <p>While this service is in development, formulations are free to you! We only ask that you please provide a review of your product and feedback about your experience using the service. (We'll send you a way to access that after we deliver your formulation).</p>
            <p>We currently are only serving people in the Seattle area. <a href="#">Click here</a> to be put on a waiting list for us to formulate and ship your recipe once we have that set up.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Your Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Mobile phone number (We'll text with you to coordinate delivery):</label>
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div>
                    <label>Are you willing to pick it up from Chris Koss's house?</label>
                    <select value={pickup} onChange={(e) => setPickup(e.target.value === 'true')}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                {!pickup && (
                    <div>
                        <label>Delivery Address:</label>
                        <input type="text" placeholder="Street 1" value={address.street1} onChange={(e) => setAddress({ ...address, street1: e.target.value })} />
                        <input type="text" placeholder="Street 2" value={address.street2} onChange={(e) => setAddress({ ...address, street2: e.target.value })} />
                        <input type="text" value="Seattle" readOnly />
                        <input type="text" value="WA" readOnly />
                        <input type="text" placeholder="Zip Code" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
                    </div>
                )}
                <button type="submit" className="submit">Submit Order</button>
            </form>
        </div>
    );
}

export default OrderFormulation;
