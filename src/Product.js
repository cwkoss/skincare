import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Product({ setProductData }) {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState('');

    const skincareProducts = {
        "Daytime Moisturizing Cream with SPF": "An invigorating morning cream that hydrates your skin while providing sun protection with natural zinc oxide, perfect for applying after your morning cleanse to keep your skin soft and shielded throughout the day.",
        "Moisturizing Cream (No SPF)": "Ideal for night-time nourishment or for daytime use under your preferred sunscreen, this cream deeply moisturizes your skin, leaving it feeling smooth and refreshed",
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
        "Face Oil": "Designed to deeply nourish and rejuvenate your skin, best used in combination with a separate SPF product during the day to ensure full sun protection while maintaining radiant skin.",
        "Scalp Oil":"A soothing and revitalizing scalp oil formulated to nourish your scalp and strengthen hair roots, perfect for daily use to maintain a healthy, hydrated scalp environment.",
        //cleanser: "Used to remove dirt, oil, and makeup from the skin. It helps in keeping the pores clear and the skin clean.",
    };

    const handleSelection = (product) => {
        setSelectedProduct(product);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProductData(selectedProduct); 
        // Navigate to the next form or a summary page
        navigate('/summary'); // Replace '/summary' with the path of your next step
    };

    return (
        <div className="product-container">
            <h2>Select a Skincare Product Type</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(skincareProducts).map(([key, description]) => (
                    <div key={key}>
                        <button type="button" onClick={() => handleSelection(key)}
                            className={selectedProduct === key ? 'selected' : ''}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </button>
                        <p className={selectedProduct === key ? 'selected' : ''}>
                            {description}
                        </p>
                    </div>
                ))}
                <button className="submit" type="submit" disabled={!selectedProduct}>Next</button>
            </form>
        </div>
    );
}

export default Product;
