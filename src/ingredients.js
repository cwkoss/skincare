const ingredients = {
    "Sunflower Oil": {
        phase: "oil",
        hlb: 0,
        description: "Lightweight, non-comedogenic oil, suitable for sensitive skin.",
        good_for: ["Sensitive Skin", "Dry skin"],
        bad_for: []
    },
    "Jojoba Oil": {
        phase: "oil",
        hlb: 0,
        description: "Mimics natural skin oils, balances skin's sebum production.",
        good_for: ["Adult acne", "Dry skin", "Sensitive Skin"],
        bad_for: []
    },
    "Argan Oil": {
        phase: "oil",
        hlb: 11,
        description: "Enhances skin elasticity and hair shine, rich in vitamin E.",
        good_for: ["Aging or age spots", "Dry skin", "Wrinkles"],
        bad_for: []
    },
    "Shea Butter": {
        phase: "oil",
        hlb: 8,
        description: "Moisturizes deeply, reduces inflammation, and is rich in vitamins.",
        good_for: ["Dry skin", "Atopic dermatitis"],
        bad_for: ["Adult acne"] // due to its comedogenic properties
    },
    "Cocoa Butter": {
        phase: "oil",
        hlb: 8,
        description: "Nourishes skin, reduces scars, and offers a chocolaty aroma.",
        good_for: ["Dry skin", "Wrinkles"],
        bad_for: ["Adult acne"]
    },
    "Coconut Oil": {
        phase: "oil",
        hlb: 8,
        description: "Moisturizes skin and hair, rich in fatty acids and antioxidants.",
        good_for: ["Dry skin"],
        bad_for: ["Adult acne"] // high comedogenic rating
    },
    "Pecan Oil": {
        phase: "oil",
        hlb: 0,
        description: "Rich in antioxidants, moisturizes skin, and promotes hair health.",
        good_for: ["Dry skin"],
        bad_for: []
    },
    "Pumpkin Seed Oil": {
        phase: "oil",
        hlb: 0,
        description: "Improves skin tone, fights acne, and soothes sensitive skin.",
        good_for: ["Adult acne", "Sensitive Skin"],
        bad_for: []
    },
    "Benne Seed Oil": {
        phase: "oil",
        hlb: 0,
        description: "Rich in linoleic acid, nourishes skin and strengthens hair.",
        good_for: ["Dry skin"],
        bad_for: []
    },
    "Okra Seed Oil": {
        phase: "oil",
        hlb: 0,
        description: "Promotes a healthy scalp and is rich in unsaturated fats. (comedogenic rating estimated)",
        good_for: ["Sensitive Skin"],
        bad_for: ["Adult acne"]
    },
    "Olive Oil": {
        phase: "oil",
        hlb: 0,
        description: "Moisturizes skin, rich in vitamins, and promotes hair health.",
        good_for: ["Dry skin"],
        bad_for: ["Adult acne"]
    },
    "Almond Oil": {
        phase: "oil",
        hlb: 0,
        description: "Gentle on skin, rich in vitamin E, and excellent for dry skin.",
        good_for: ["Dry skin", "Sensitive Skin"],
        bad_for: []
    },
    "Distilled Water": {
        phase: "aqueous",
        hlb: 20,
        description: "Hydrates and serves as a base for water-soluble ingredients.",
        good_for: [],
        bad_for: []
    },
    "Green Tea": {
        phase: "aqueous",
        hlb: 20,
        description: "Rich in antioxidants, reduces inflammation, and promotes skin healing.",
        good_for: ["Redness", "Puffiness", "Sensitive Skin"],
        bad_for: []
    },
    "Sea Salt": {
        phase: "aqueous",
        hlb: 20,
        description: "Rich in minerals, exfoliating, detoxifying, and promotes skin rejuvenation.",
        good_for: ["Large pores", "Atopic dermatitis"],
        bad_for: ["Dry skin"] // can be drying
    },
    "Aloe Vera Gel": {
        phase: "aqueous",
        hlb: 20,
        description: "Soothes skin irritations, hydrates, and has healing properties.",
        good_for: ["Sensitive Skin", "Sun Protection", "Redness"],
        bad_for: []
    },
    "Glycerin": {
        phase: "aqueous",
        hlb: 20,
        description: "A humectant that draws moisture into the skin, suitable for all skin types.",
        good_for: ["Dry skin"],
        bad_for: []
    },
    "Honey": {
        phase: "aqueous",
        hlb: 20,
        description: "Natural humectant, known for its soothing and antibacterial properties.",
        good_for: ["Dry skin", "Adult acne"],
        bad_for: []
    },
    "Apple Cider Vinegar": {
        phase: "aqueous",
        hlb: 20,
        description: "Balances skin's pH, has natural astringent properties, and can help clear skin.",
        good_for: ["Adult acne", "Large pores"],
        bad_for: ["Dry skin"] // can be drying
    },
    "Cucumber Juice": {
        phase: "aqueous",
        hlb: 20,
        description: "Rich in vitamins and minerals, hydrating, and soothing for the skin.",
        good_for: ["Puffiness", "Sensitive Skin"],
        bad_for: []
    },
    "Oat Milk": {
        phase: "aqueous",
        hlb: 20,
        description: "Contains lipids and water-absorbing substances, providing moisturizing and soothing benefits.",
        good_for: ["Dry skin", "Sensitive Skin"],
        bad_for: []
    },
    "Beeswax": {
        phase: "emulsifier",
        hlb: 12,
        description: "Natural stabilizer, thickens formulas and creates protective barrier on skin.",
        good_for: ["Dry skin"],
        bad_for: []
    },
    "Lecithin": {
        phase: "emulsifier",
        hlb: 8,
        description: "Natural stabilizer, thickens formulas and creates protective barrier on skin.",
        good_for: [],
        bad_for: []
    },
    "Cetearyl Alcohol": {
        phase: "emulsifier",
        hlb: 16,
        description: "A waxy fatty alcohol used as an emulsifier, thickener and stabilizer in creams and lotions.",
        good_for: [],
        bad_for: ["Sensitive Skin"] // can be irritating for some sensitive skins
    },
    "Castille Soap": {
        phase: "surfactant",
        hlb: "10",
        description: "Gentle and versatile cleanser, suitable for sensitive skin.",
        good_for: ["Sensitive Skin"],
        bad_for: []
    },
    "Zinc Oxide": {
        phase: "additive",
        hlb: 0,
        max_percent: 25,
        default_percent: 10,
        description: "Adds SPF",
        good_for: ["Sun Protection"],
        bad_for: []
    },
    "Hyaluronic Acid": {
        phase: "additive",
        hlb: 20,
        max_percent: 2,
        default_percent: 0.5,
        description: "Hydrates and plumps the skin by retaining moisture.",
        good_for: ["Dry skin", "Wrinkles", "Aging or age spots"],
        bad_for: []
    },
    "Retinol": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.1,
        description: "Boosts collagen production, accelerates skin renewal.",
        good_for: ["Wrinkles", "Aging or age spots"],
        bad_for: ["Sensitive Skin"] // can be irritating
    },
    "Vitamin C": {
        phase: "additive",
        hlb: 20,
        max_percent: 20,
        default_percent: 5,
        description: "Reduces skin inflammation, irregular pigmentation, promotes collagen production.",
        good_for: ["Aging or age spots", "Sun Protection"],
        bad_for: []
    },
    "Vitamin E": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Reduces UV damage in skin.",
        good_for: ["Sun Protection", "Aging or age spots"],
        bad_for: []
    },
    "Niacinamide (Vitamin B3)": {
        phase: "additive",
        hlb: 20,
        max_percent: 5,
        default_percent: 2,
        description: "Improves appearance of enlarged pores, uneven skin tone, fine lines.",
        good_for: ["Large pores", "Wrinkles", "Redness"],
        bad_for: []
    },
    "Lavender Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Lavender oil is known for its calming and relaxing properties and can be used to soothe irritated skin.",
        good_for: ["Sensitive Skin", "Redness"],
        bad_for: []
    },
    "Rosemary Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 1,
        description: "Rosemary oil is reputed to rejuvenate skin, improve hair growth and scalp health, and has antioxidant properties.",
        good_for: ["Aging or age spots"],
        bad_for: ["Sensitive Skin"] // can be irritating for some people
    },
    "Tea Tree Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 1,
        description: "Tea tree oil is known for its anti-inflammatory and antimicrobial properties, making it a popular choice for treating acne.",
        good_for: ["Adult acne"],
        bad_for: ["Dry skin"] // can be drying if overused
    },
    "Jasmine Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Jasmine oil is valued for its soothing, moisturizing properties and a rich, floral fragrance.",
        good_for: ["Dry skin"],
        bad_for: []
    },
    "Eucalyptus Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 1,
        description: "Eucalyptus oil has a refreshing scent and is known for its antibacterial, anti-inflammatory properties.",
        good_for: ["Adult acne"],
        bad_for: ["Sensitive Skin", "Dry skin"] // can be irritating and drying
    },
    /*"Cedarwood Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Cedarwood oil is used for its soothing effect on the skin and its woodsy, warm fragrance.",
        good_for: ["Dry skin"],
        bad_for: []
    },
    "Noble Fir Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Noble Fir oil is known for its crisp, clean fragrance and can help to refresh and invigorate the skin.",
        good_for: [],
        bad_for: []
    },
    "Ponderosa Pine Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Ponderosa Pine oil, with its fresh forest scent, is used for its invigorating properties and potential skin benefits.",
        good_for: [],
        bad_for: []
    },*/
    "Turmeric": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Turmeric is known for its anti-inflammatory, antimicrobial properties, and ability to improve skin tone and reduce scarring.",
        good_for: ["Redness", "Adult acne", "Atopic dermatitis"],
        bad_for: []
    },
    "Cinnamon": {
        phase: "additive",
        hlb: 0,
        max_percent: 0.5,
        default_percent: 0.2,
        description: "Cinnamon is used for its antimicrobial properties and warming sensation, but should be used with caution as it can be irritating to the skin.",
        good_for: ["Adult acne"],
        bad_for: ["Sensitive Skin", "Dry skin"] // potential irritant
    },
    "Black Pepper": {
        phase: "additive",
        hlb: 0,
        max_percent: 0.5,
        default_percent: 0.2,
        description: "Black Pepper is known for its antioxidant properties and stimulating effect, which can enhance blood circulation to the skin.",
        good_for: ["Aging or age spots"],
        bad_for: ["Sensitive Skin"] // can be irritating
    },
    "Nutmeg": {
        phase: "additive",
        hlb: 0,
        max_percent: 0.5,
        default_percent: 0.2,
        description: "Nutmeg, with its anti-inflammatory and antibacterial properties, is used in small amounts to soothe skin and improve its appearance.",
        good_for: ["Redness", "Atopic dermatitis"],
        bad_for: ["Sensitive Skin"] // can be irritating in higher concentrations
    }


};

export default ingredients;
