import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from './firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateSession } from './sessionUtils';
import { useRecipe } from './RecipeContext';
import { set } from 'firebase/database';
import Layout from './Layout';

function OrderFormulation() {
    const navigate = useNavigate();
    const { state } = useRecipe();
    const [recipeData, setRecipeData] = useState(null);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [inSeattleArea, setInSeattleArea] = useState(true);
    const [pickup, setPickup] = useState(true);
    const [address, setAddress] = useState({ street1: '', street2: '', zip: '' });
    const [note, setNote] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const location = useLocation();
    const recipeId = location.state?.recipeId ? location.state.recipeId : state.recipeId;
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (state.rawRecipe && Object.keys(state.rawRecipe).length > 0) {
            setRecipeData({ name: state.recipeName, ingredients: state.rawRecipe });
            return;
        }
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

    const handleSubmit = async () => {
        console.log(recipeId);
        setHasError(false);
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

            // Update the session with the new orderId
            await updateSession({ orderId });

            navigate('/order-success');
        } catch (err) {
            console.error("Error submitting order: ", err);
            setHasError(true);
        }
    };

    if (!recipeData) return <div>Loading...</div>;

    return (
        <Layout title="Request Your Order"
            buttonText="Place Your Order"
            handleSubmit={() => { handleSubmit() }}>
            <div className="recipe">
                <strong>Recipe Name</strong>: {state.recipeName}
                {Object.keys(recipeData.ingredients).map((key, index) => (
                    <div key={index}>
                        <strong>{key}</strong>: {recipeData.ingredients[key]}
                    </div>
                ))}
            </div>
            <p>While this service is in development, we are requesting that you donate to the Palestinian Children's Relief Fund in lieu of payment!</p>
            <form className="contact-us-form">
                <div>
                    <label>Your Name:</label><br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Mobile phone number (We'll text with you to coordinate delivery):</label><br />
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div>
                    <label>Do you want to pick it up from Chris Koss's house (South Beacon Hill in Seattle)?</label><br />
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

                <label>Note:</label><br />
                <textarea placeholder="Enter your note here" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
            </form>
            {hasError && (<p className="why-disabled">Something went wrong submitting... please try again</p>)}
        </Layout>
    );
}

export default OrderFormulation;
