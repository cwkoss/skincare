const ingredients = {
    "Coconut oil": {
        phase: "oil",
        comedogenic: 4,
        viscosity: 5,
        hlb: 8,
        description: "Moisturizes skin and hair, rich in fatty acids and antioxidants."
    },
    "Argan oil": {
        phase: "oil",
        comedogenic: 0,
        viscosity: 3,
        hlb: 11,
        description: "Enhances skin elasticity and hair shine, rich in vitamin E."
    },
    "Sunflower oil": {
        phase: "oil",
        comedogenic: 2,
        viscosity: 3,
        hlb: 0,
        description: "Lightweight, non-comedogenic oil, suitable for sensitive skin."
    },
    "Distilled water": {
        phase: "aqueous",
        comedogenic: 0,
        viscosity: 1,
        hlb: 20,
        description: "Hydrates and serves as a base for water-soluble ingredients."
    },
    "Salt water": {
        phase: "aqueous",
        comedogenic: 0,
        viscosity: 1.5,
        hlb: 20,
        description: "Research is mixed. Some sources suggest that salt water might have beneficial effects on the skin, including potential antimicrobial properties and the ability to dry out pimples. Salt water could also irritate sensitive skin or exacerbate conditions like eczema or dermatitis."
    },
    "Beeswax": {
        phase: "emulsifier",
        comedogenic: 2,
        viscosity: 10,
        hlb: 12,
        description: "Natural stabilizer, thickens formulas and creates protective barrier on skin."
    },
    "Cocoa butter": {
        phase: "oil",
        comedogenic: 4,
        viscosity: 8,
        hlb: 8,
        description: "Nourishes skin, reduces scars, and offers a chocolaty aroma."
    },
    "Pecan oil": {
        phase: "oil",
        comedogenic: 2,
        viscosity: 4,
        hlb: 0,
        description: "Rich in antioxidants, moisturizes skin, and promotes hair health."
    },
    "Green tea": {
        phase: "aqueous",
        comedogenic: 0,
        viscosity: 1,
        hlb: 20,
        description: "Rich in antioxidants, reduces inflammation, and promotes skin healing."
    },
    "Pumpkin seed oil": {
        phase: "oil",
        comedogenic: 2,
        viscosity: 4,
        hlb: 0,
        description: "Improves skin tone, fights acne, and soothes sensitive skin."
    },
    "Benne seed oil": {
        phase: "oil",
        comedogenic: 3,
        viscosity: 4,
        hlb: 0,
        description: "Rich in linoleic acid, nourishes skin and strengthens hair."
    },
    "Okra seed oil": {
        phase: "oil",
        comedogenic: 2,
        viscosity: 3,
        hlb: 0,
        description: "Promotes a healthy scalp and is rich in unsaturated fats. (comedogenic rating estimated)"
    },
    "Olive oil": {
        phase: "oil",
        comedogenic: 2,
        viscosity: 4,
        hlb: 0,
        description: "Moisturizes skin, rich in vitamins, and promotes hair health."
    },
    "Aloe Vera Gel": {
        phase: "aqueous",
        comedogenic: 0,
        viscosity: 2,
        hlb: 20,
        description: "Soothes skin irritations, hydrates, and has healing properties."
    },
    "Shea Butter": {
        phase: "oil",
        comedogenic: 0,
        viscosity: 6,
        hlb: 8,
        description: "Moisturizes deeply, reduces inflammation, and is rich in vitamins."
    },
    "Jojoba Oil": {
        phase: "oil",
        comedogenic: 2,
        viscosity: 2,
        hlb: 0,
        description: "Mimics natural skin oils, balances skin's sebum production."
    },
    "Glycerin": {
        phase: "aqueous",
        comedogenic: 0,
        viscosity: 2,
        hlb: 20,
        description: "A humectant that draws moisture into the skin, suitable for all skin types."
    },
    "Almond Oil": {
        phase: "oil",
        comedogenic: 2,
        viscosity: 3,
        hlb: 0,
        description: "Gentle on skin, rich in vitamin E, and excellent for dry skin."
    },
    "Lecithin": {
        phase: "emulsifier",
        comedogenic: 0,
        viscosity: 5,
        hlb: 8,
        description: "Natural stabilizer, thickens formulas and creates protective barrier on skin. (not sure about this viscosity value)"
    },
    "Cetearyl Alcohol": {
        phase: "emulsifier",
        comedogenic: 0,
        viscosity: 8,
        hlb: 16,
        description: "This is a waxy fatty alcohol derived from natural sources like coconut and palm oils. It's used not only as an emulsifier but also as a thickener and stabilizer in creams and lotions."
    },
    "Zinc Oxide": {
        phase: "additive",
        comedogenic: 0,
        viscosity: 5,
        hlb: 0,
        max_percent: 25,
        description: "Adds SPF"
    },
    "Hyaluronic Acid": {
        phase: "additive",
        comedogenic: 0,
        viscosity: 8,
        hlb: 20,
        max_percent: 2,
        description: "A powerful humectant, helps to hydrate and plump the skin by retaining moisture, making it a vital ingredient for maintaining a youthful, radiant complexion."
    },
    "Retinol": {
        phase: "additive",
        comedogenic: 0,
        viscosity: 0,
        hlb: 0,
        max_percent: 1,
        description: "A derivative of Vitamin A, is renowned for its anti-aging properties, as it boosts collagen production, accelerates skin renewal, and helps to reduce the appearance of fine lines, wrinkles, and uneven skin tone."
    },
    "Vitamin C": {
        phase: "additive",
        comedogenic: 0,
        viscosity: 0,
        hlb: 20,
        max_percent: 20,
        description: "A potent antioxidant that helps to reduce skin inflammation, irregular pigmentation, and promotes healthy collagen production."
    },
    "Vitamin E": {
        phase: "additive",
        comedogenic: 0,
        viscosity: 0,
        hlb: 0,
        max_percent: 1,
        description: "A powerful antioxidant that may be effective at reducing UV damage in skin. And vitamin E applied topically may help nourish and protect your skin from damage caused by free radicals."
    },
    "Niacinamide (Vitamin B3)": {
        phase: "additive",
        comedogenic: 0,
        viscosity: 0,
        hlb: 20,
        max_percent: 5,
        description: "Niacinamide is a water-soluble vitamin that works with the natural substances in your skin to help visibly improve the appearance of enlarged pores, uneven skin tone, fine lines and wrinkles, dullness, and a weakened surface."
    },
};
  
  export default ingredients;
  