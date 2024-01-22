const ingredients = {
    "Sunflower Oil": {
        phase: "oil",
        hlb: 0,
        description: "Lightweight, non-comedogenic oil, suitable for sensitive skin."
    },
    "Jojoba Oil": {
        phase: "oil",
        hlb: 0,
        description: "Mimics natural skin oils, balances skin's sebum production."
    },
    "Argan Oil": {
        phase: "oil",
        hlb: 11,
        description: "Enhances skin elasticity and hair shine, rich in vitamin E."
    },
    "Shea Butter": {
        phase: "oil",
        hlb: 8,
        description: "Moisturizes deeply, reduces inflammation, and is rich in vitamins."
    },
    "Cocoa Butter": {
        phase: "oil",
        hlb: 8,
        description: "Nourishes skin, reduces scars, and offers a chocolaty aroma."
    },
    "Coconut Oil": {
        phase: "oil",
        hlb: 8,
        description: "Moisturizes skin and hair, rich in fatty acids and antioxidants."
    },
    "Pecan Oil": {
        phase: "oil",
        hlb: 0,
        description: "Rich in antioxidants, moisturizes skin, and promotes hair health."
    },
    "Pumpkin Seed Oil": {
        phase: "oil",
        hlb: 0,
        description: "Improves skin tone, fights acne, and soothes sensitive skin."
    },
    "Benne Seed Oil": {
        phase: "oil",
        hlb: 0,
        description: "Rich in linoleic acid, nourishes skin and strengthens hair."
    },
    "Okra Seed Oil": {
        phase: "oil",
        hlb: 0,
        description: "Promotes a healthy scalp and is rich in unsaturated fats. (comedogenic rating estimated)"
    },
    "Olive Oil": {
        phase: "oil",
        hlb: 0,
        description: "Moisturizes skin, rich in vitamins, and promotes hair health."
    },
    "Almond Oil": {
        phase: "oil",
        hlb: 0,
        description: "Gentle on skin, rich in vitamin E, and excellent for dry skin."
    },
    "Distilled Water": {
        phase: "aqueous",
        hlb: 20,
        description: "Hydrates and serves as a base for water-soluble ingredients."
    },
    "Green Tea": {
        phase: "aqueous",
        hlb: 20,
        description: "Rich in antioxidants, reduces inflammation, and promotes skin healing."
    },
    "Sea Salt": {
        phase: "aqueous",
        hlb: 20,
        description: "Sea salt, rich in minerals like magnesium, calcium, and potassium, is known for its exfoliating and detoxifying properties. It helps to cleanse pores deeply, balance oil production, and thwart bacteria that can instigate breakouts and acne. Its gentle abrasive texture aids in removing dead skin cells, promoting rejuvenated and smoother skin. Ideal for use in scrubs and bath soaks, sea salt can also help to relieve sore muscles and reduce inflammation when used in bath products."
    },
    "Aloe Vera Gel": {
        phase: "aqueous",
        hlb: 20,
        description: "Soothes skin irritations, hydrates, and has healing properties."
    },
    "Glycerin": {
        phase: "aqueous",
        hlb: 20,
        description: "A humectant that draws moisture into the skin, suitable for all skin types."
    },
    "Honey": {
        phase: "aqueous",
        hlb: 20,
        description: "Natural humectant, known for its soothing and antibacterial properties."
    },
    "Apple Cider Vinegar": {
        phase: "aqueous",
        hlb: 20,
        description: "Balances skin's pH, has natural astringent properties, and can help clear skin."
    },
    "Cucumber Juice": {
        phase: "aqueous",
        hlb: 20,
        description: "Rich in vitamins and minerals, hydrating, and soothing for the skin."
    },
    "Oat Milk": {
        phase: "aqueous",
        hlb: 20,
        description: "Contains lipids and water-absorbing substances, providing moisturizing and soothing benefits."
    },
    "Beeswax": {
        phase: "emulsifier",
        hlb: 12,
        description: "Natural stabilizer, thickens formulas and creates protective barrier on skin."
    },
    "Lecithin": {
        phase: "emulsifier",
        hlb: 8,
        description: "Natural stabilizer, thickens formulas and creates protective barrier on skin. (not sure about this viscosity value)"
    },
    "Cetearyl Alcohol": {
        phase: "emulsifier",
        hlb: 16,
        description: "This is a waxy fatty alcohol derived from natural sources like coconut and palm oils. It's used not only as an emulsifier but also as a thickener and stabilizer in creams and lotions."
    },
    "Castille Soap": {
        phase: "surfactant",
        hlb: "10",
        description: "Castille Soap is a gentle and versatile cleanser used in a variety of personal care products. It's known for its mild, skin-friendly properties, making it suitable for sensitive skin."
    },
    "Zinc Oxide": {
        phase: "additive",
        hlb: 0,
        max_percent: 25,
        default_percent: 10,
        description: "Adds SPF"
    },
    "Hyaluronic Acid": {
        phase: "additive",
        hlb: 20,
        max_percent: 2,
        default_percent: 0.5,
        description: "A powerful humectant, helps to hydrate and plump the skin by retaining moisture, making it a vital ingredient for maintaining a youthful, radiant complexion."
    },
    "Retinol": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.1,
        description: "A derivative of Vitamin A, is renowned for its anti-aging properties, as it boosts collagen production, accelerates skin renewal, and helps to reduce the appearance of fine lines, wrinkles, and uneven skin tone."
    },
    "Vitamin C": {
        phase: "additive",
        hlb: 20,
        max_percent: 20,
        default_percent: 5,
        description: "A potent antioxidant that helps to reduce skin inflammation, irregular pigmentation, and promotes healthy collagen production."
    },
    "Vitamin E": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "A powerful antioxidant that may be effective at reducing UV damage in skin. And vitamin E applied topically may help nourish and protect your skin from damage caused by free radicals."
    },
    "Niacinamide (Vitamin B3)": {
        phase: "additive",
        hlb: 20,
        max_percent: 5,
        default_percent: 2,
        description: "Niacinamide is a water-soluble vitamin that works with the natural substances in your skin to help visibly improve the appearance of enlarged pores, uneven skin tone, fine lines and wrinkles, dullness, and a weakened surface."
    },
    "Lavender Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Lavender oil is known for its calming and relaxing properties and can be used to soothe irritated skin."
    },
    "Rosemary Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 1,
        description: "Rosemary oil is reputed to rejuvenate skin, improve hair growth and scalp health, and has antioxidant properties."
    },
    "Tea Tree Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 1,
        description: "Tea tree oil is known for its anti-inflammatory and antimicrobial properties, making it a popular choice for treating acne."
    },
    "Jasmine Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Jasmine oil is valued for its soothing, moisturizing properties and a rich, floral fragrance."
    },
    "Eucalyptus Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 1,
        description: "Eucalyptus oil has a refreshing scent and is known for its antibacterial, anti-inflammatory properties."
    },
    "Cedarwood Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Cedarwood oil is used for its soothing effect on the skin and its woodsy, warm fragrance."
    },
    "Noble Fir Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Noble Fir oil is known for its crisp, clean fragrance and can help to refresh and invigorate the skin."
    },
    "Ponderosa Pine Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Ponderosa Pine oil, with its fresh forest scent, is used for its invigorating properties and potential skin benefits."
    },
    "Turmeric": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Turmeric is known for its anti-inflammatory, antimicrobial properties, and ability to improve skin tone and reduce scarring."
    },
    "Cinnamon": {
        phase: "additive",
        hlb: 0,
        max_percent: 0.5,
        default_percent: 0.2,
        description: "Cinnamon is used for its antimicrobial properties and warming sensation, but should be used with caution as it can be irritating to the skin."
    },
    "Black Pepper": {
        phase: "additive",
        hlb: 0,
        max_percent: 0.5,
        default_percent: 0.2,
        description: "Black Pepper is known for its antioxidant properties and stimulating effect, which can enhance blood circulation to the skin."
    },
    "Nutmeg": {
        phase: "additive",
        hlb: 0,
        max_percent: 0.5,
        default_percent: 0.2,
        description: "Nutmeg, with its anti-inflammatory and antibacterial properties, is used in small amounts to soothe skin and improve its appearance."
    }


};

export default ingredients;
