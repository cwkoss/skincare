import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from './firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function OrderFormulation() {
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState(null);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [inSeattleArea, setInSeattleArea] = useState(true);
    const [pickup, setPickup] = useState(true);
    const [address, setAddress] = useState({ street1: '', street2: '', zip: '' });
    const [note, setNote] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const location = useLocation();
    const recipeId = location.state?.recipeId;
    const [hasError, setHasError] = useState(false);

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
        setHasError(false);
        e.preventDefault();
        try {
            const orderId = new Date().getTime() + "-" + recipeId;
            await setDoc(doc(db, "orders", orderId), {
                name,
                recipeId,
                phoneNumber,
                pickup,
                address: pickup ? null : address,
                createdAt: new Date(),
                waitlist: !inSeattleArea,
                location: userLocation,
                note
            });
            console.log("Order submitted");
            navigate('/order-success');
        } catch (e) {
            console.error("Error submitting order: ", e);
            setHasError(true);
        }
    };

    if (!recipeData) return <div>Loading...</div>;

    return (
        <div className="body-container">
            <h2>{recipeData.name}</h2>
            <div className="scrollable-content">
                <div className="recipe">
                    {Object.keys(recipeData.ingredients).map((key, index) => (
                        <div key={index}>
                            <strong>{key}</strong>: {recipeData.ingredients[key]}
                        </div>
                    ))}
                </div>
                <p>While this service is in development, formulations are free to people located in Seattle! We only ask that you please provide a review of your product and feedback about your experience using the service. (We'll send you a way to access that after we deliver your formulation).</p>
                <form onSubmit={handleSubmit} className="contact-us-form">
                    <div>
                        <label>Your Name:</label><br />
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Mobile phone number (We'll text with you to coordinate delivery):</label><br />
                        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div>
                        <label>Do you live in the Seattle area?</label><br />
                        <select value={inSeattleArea} onChange={(e) => setInSeattleArea(e.target.value === 'true')}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    {inSeattleArea ? (
                        // Form fields for Seattle area users
                        <div>
                            {/* ... existing form fields ... */}
                            <label>Do you want to pick it up from Chris Koss's house (South Beacon Hill)?</label><br />
                            <select value={pickup} onChange={(e) => setPickup(e.target.value === 'true')}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            {!pickup && (
                                <div>
                                    <label>Delivery Address:</label><br />
                                    <input type="text" placeholder="Street 1" value={address.street1} onChange={(e) => setAddress({ ...address, street1: e.target.value })} /><br />
                                    <input type="text" placeholder="Street 2" value={address.street2} onChange={(e) => setAddress({ ...address, street2: e.target.value })} /><br />
                                    <input type="text" value="Seattle" readOnly /><br />
                                    <input type="text" value="WA" readOnly /><br />
                                    <input type="text" placeholder="Zip Code" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <p>We are currently only fulfilling orders within the Seattle area. You'll be added to the waitlist and we'll contact you when we start shipping orders.</p>
                            <label>Where are you located?</label><br />
                            <input type="text" placeholder="Your Location" onChange={(e) => {setUserLocation(e.target.value)}} />
                        </div>
                    )}
                    <label>Note:</label><br />
                    <textarea placeholder="Enter your note here" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                    <button type="submit" className="submit">Submit Order</button>
                </form>
            </div>
            <div className="bottom-spacer"></div>
            <div className="bottom-spacer"></div>

            {hasError && (<p className="why-disabled">Something went wrong submitting... please try again</p>) }
        </div>
    );
}

export default OrderFormulation;
