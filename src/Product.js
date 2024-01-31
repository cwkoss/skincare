import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ingredients from './ingredients';

function Product({ setProductData }) {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState('');

    const aqueousIngredients = getAqueousIngredients();

    function getAqueousIngredients() {
        const aqueousIngredients = [];
        Object.entries(ingredients).forEach(([key, ingredient]) => {
            if (ingredient.hlb > 16) {
                aqueousIngredients.push(key);
            }
        });
        return aqueousIngredients;
    }

    const skincareProducts = {
        "Daytime Face Moisturizing Cream with SPF": {
            description: "An invigorating morning cream that hydrates your skin while providing sun protection with natural zinc oxide, perfect for applying after your morning cleanse to keep your skin soft and shielded throughout the day.",
            bannedIngredients: ["Retinol"],
            mustIncludeIngredients: ["Zinc Oxide"],
        },
        "AM/PM Face Moisturizing Cream (No SPF)": {
            description: "Ideal for night-time nourishment or for daytime use under your preferred sunscreen, design a cream that will deeply moisturizes your skin, leaving it feeling smooth and refreshed",
            bannedIngredients: ["Retinol"],
            mustIncludeIngredients: [],
        },
        "Before Bed Face Moisturizing Cream": {
            description: "A deeply nourishing cream that will hydrate your skin while you sleep, leaving it feeling soft and refreshed in the morning.",
        },
        "Body Moisturizing Cream or Body Butter": {
            description: "Build a deeply hydrading and nourishing to lock in moisture and rejuvenate the skin. Body moisturizers are typically richer and thicker in texture than facial moisturizers, designed to hydrate the less sensitive, more robust skin of the body.",
        },
        "Face Oil": {
            description: "Formulate an oil to deeply nourish and rejuvenate your skin, best used in combination with a separate SPF product during the day to ensure full sun protection while maintaining radiant skin.",
            bannedIngredients: aqueousIngredients,
        },
        "Hair and Scalp Oil": {
            description: "Formulate a soothing and revitalizing hair and scalp oil to nourish your scalp, strengthen hair roots, and add a healthy shine to your hair.  Use as a pre-shampoo treatment or as a leave-in conditioner.",
            bannedIngredients: aqueousIngredients,
        },
    };

    console.log(aqueousIngredients);

    /*
        "Daytime Face Moisturizing Cream with SPF": "An invigorating morning cream that hydrates your skin while providing sun protection with natural zinc oxide, perfect for applying after your morning cleanse to keep your skin soft and shielded throughout the day.",
        "AM/PM Face Moisturizing Cream (No SPF)": "Ideal for night-time nourishment or for daytime use under your preferred sunscreen, design a cream that will deeply moisturizes your skin, leaving it feeling smooth and refreshed",
        "Before Bed Face Moisturizing Cream": "A deeply nourishing cream that will hydrate your skin while you sleep, leaving it feeling soft and refreshed in the morning.",
        "Body Moisturizing Cream or Body Butter": "Build a deeply hydrading and nourishing to lock in moisture and rejuvenate the skin. Body moisturizers are typically richer and thicker in texture than facial moisturizers, designed to hydrate the less sensitive, more robust skin of the body.",
        //toner: "Applied after cleansing, toner helps to remove any remaining impurities and balances the pH of the skin.",
        //serum: "Highly concentrated with active ingredients, serums target specific skin concerns such as aging, hydration, or brightening.",
        //moisturizer: "Hydrates the skin and locks in moisture. It can come in various forms like lotions, creams, and gels.",
        //sunscreen: "Protects the skin from harmful UV rays. It's essential for preventing sun damage, aging, and skin cancer.",
        // exfoliant: "Removes dead skin cells from the surface of the skin, promoting a smoother and clearer complexion.",
        //eyeCream: "Specifically formulated for the delicate eye area, it targets concerns like dark circles, puffiness, and wrinkles.",
        //mask: "Used occasionally to address specific skin concerns. Masks can hydrate, detoxify, or provide anti-aging benefits.",
        //"Lotion" : "A lightweight moisturizer, often used for normal to oily skin, providing hydration without being too heavy.",
        //"Cream": "Thicker than lotion, creams are ideal for dry skin as they provide more intensive moisturization.",
        //"Butter": "Even thicker than creams, butters are used for very dry skin areas, providing deep nourishment and hydration.",
        //"Balm": "A dense, oil-based product, balms are used for intense healing and protection, often in specific areas.",
        "Face Oil": "Formulate an oil to deeply nourish and rejuvenate your skin, best used in combination with a separate SPF product during the day to ensure full sun protection while maintaining radiant skin.",
        "Hair and Scalp Oil":"Formulate a soothing and revitalizing hair and scalp oil to nourish your scalp, strengthen hair roots, and add a healthy shine to your hair.  Use as a pre-shampoo treatment or as a leave-in conditioner.",
        //cleanser: "Used to remove dirt, oil, and makeup from the skin. It helps in keeping the pores clear and the skin clean.",
    };*/

    const handleSelection = (product) => {
        setSelectedProduct(product);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProductData(selectedProduct);
        // Navigate to the next form or a summary page
        navigate('/goals');
    };

    return (
        <div className="product-container">
            <h2>Select a Skincare Product Type</h2>
            <form onSubmit={handleSubmit} className="scrollable-content">
                {Object.entries(skincareProducts).map(([key, value]) => (
                    <div key={key}>
                        <button type="button" onClick={() => handleSelection(key)}
                            className={selectedProduct === key ? 'selected' : ''}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </button>
                        <p className={selectedProduct === key ? 'selected' : ''}>
                            {value.description}
                        </p>
                    </div>
                ))}
                <button className="submit" type="submit" disabled={!selectedProduct}>Next</button>
            </form>
        </div>
    );
}

export default Product;
