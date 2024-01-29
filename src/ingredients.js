const ingredients = {
    "Sunflower Oil": {
        phase: "oil",
        hlb: 0,
        description: "Moisturizer, rich in Vitamin E, non-comedogenic, suitable for sensitive skin.",
        good_for: ["Sensitive Skin", "Dry skin"],
        bad_for: []
    },
    "Jojoba Oil": {
        phase: "oil",
        hlb: 0,
        description: "Moisturizer, mimics natural skin oils, balances sebum production, good for acne-prone skin.",
        good_for: ["Adult acne", "Dry skin", "Sensitive Skin"],
        bad_for: []
    },
    "Argan Oil": {
        phase: "oil",
        hlb: 11,
        description: "Rich in antioxidants and Vitamin E, moisturizes, reduces signs of aging, improves skin elasticity and enhances hair shine.",
        good_for: ["Aging or age spots", "Dry skin", "Wrinkles"],
        bad_for: []
    },
    "Shea Butter": {
        phase: "oil",
        hlb: 8,
        description: "Moisturizer, rich in fatty acids and vitamins, anti-inflammatory, helps with skin healing.",
        good_for: ["Dry skin", "Atopic dermatitis"],
        bad_for: ["Adult acne"] // due to its comedogenic properties
    },
    "Cocoa Butter": {
        phase: "oil",
        hlb: 8,
        description: "Moisturizer, high in fatty acids, helps to hydrate and nourish the skin, reduces the appearance of scars.",
        good_for: ["Dry skin", "Wrinkles"],
        bad_for: ["Adult acne"]
    },
    "Coconut Oil": {
        phase: "oil",
        hlb: 8,
        description: "Moisturizes skin and hair, rich in fatty acids and antioxidants. Can be comedogenic (acne-causing) for some.",
        good_for: ["Dry skin"],
        bad_for: ["Adult acne"] // high comedogenic rating
    },
    "Pecan Oil": {
        phase: "oil",
        hlb: 0,
        description: "Moisturizer, rich in antioxidants, promotes skin and hair health, hydrating properties.",
        good_for: ["Dry skin"],
        bad_for: []
    },
    "Pumpkin Seed Oil": {
        phase: "oil",
        hlb: 0,
        description: "Rich in zinc and vitamins, improves skin tone, fights acne, and soothes sensitive skin.",
        good_for: ["Adult acne", "Sensitive Skin"],
        bad_for: []
    },
    /*"Benne Seed Oil": {
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
    },*/
    "Olive Oil": {
        phase: "oil",
        hlb: 0,
        description: "Moisturizer, rich in vitamins and antioxidants, promotes skin and hair health, but can be comedogenic (acne-causing) for some.",
        good_for: ["Dry skin"],
        bad_for: ["Adult acne"]
    },
    /*"Almond Oil": {
        phase: "oil",
        hlb: 0,
        description: "Gentle on skin, rich in vitamin E, and excellent for dry skin.",
        good_for: ["Dry skin", "Sensitive Skin"],
        bad_for: []
    },*/
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
        description: "Antioxidant-rich, reduces inflammation and redness, can protect against environmental stressors and promotes skin healing.",
        good_for: ["Redness", "Puffiness", "Sensitive Skin"],
        bad_for: []
    },
    "Sea Salt": {
        phase: "aqueous",
        hlb: 20,
        description: "Rich in minerals, helps in detoxifying and cleansing the skin, can balance oil production.",
        good_for: ["Large pores", "Atopic dermatitis"],
        bad_for: ["Dry skin"] // can be drying
    },
    "Aloe Vera Gel": {
        phase: "aqueous",
        hlb: 20,
        description: "Soothes skin irritations, hydrates, promotes healing, good for sunburns and inflammation",
        good_for: ["Sensitive Skin", "Sun Protection", "Redness"],
        bad_for: []
    },
    "Glycerin": {
        phase: "aqueous",
        hlb: 20,
        description: "Humectant, draws moisture into the skin, suitable for all skin types, enhances skin hydration.",
        good_for: ["Dry skin"],
        bad_for: []
    },
    "Honey": {
        phase: "aqueous",
        hlb: 20,
        description: "Natural humectant, antibacterial, great for acne treatment and hydration, soothing for the skin.",
        good_for: ["Dry skin", "Adult acne"],
        bad_for: []
    },
    "Apple Cider Vinegar": {
        phase: "aqueous",
        hlb: 20,
        description: "Balances skin's pH, astringent properties, good for acne-prone skin but can be drying.",
        good_for: ["Adult acne", "Large pores"],
        bad_for: ["Dry skin"] // can be drying
    },
    "Cucumber Juice": {
        phase: "aqueous",
        hlb: 20,
        description: " Hydrating, soothing, rich in vitamins and minerals, good for puffiness and calming irritated skin.",
        good_for: ["Puffiness", "Sensitive Skin"],
        bad_for: []
    },
    "Oat Milk": {
        phase: "aqueous",
        hlb: 20,
        description: "Contains lipids and water-absorbing substances, providing moisturizing and soothing benefits. Helps in reducing inflammation",
        good_for: ["Dry skin", "Sensitive Skin"],
        bad_for: []
    },
    "Beeswax": {
        phase: "emulsifier",
        hlb: 12,
        description: " Emulsifier and stabilizer in formulations, creates a protective barrier on the skin, retains moisture.",
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
        description: "A waxy fatty alcohol used as an emulsifier, thickener and stabilizer in creams and lotions. Extracted from Coconut and Palm Kernel oils",
        good_for: [],
        bad_for: ["Sensitive Skin"] // can be irritating for some sensitive skins
    },
    "Castille Soap": {
        phase: "surfactant",
        hlb: "10",
        description: "Gentle and versatile cleanser, made from olive and hemp oils, suitable for sensitive skin.",
        good_for: ["Sensitive Skin"],
        bad_for: []
    },
    "Zinc Oxide": {
        phase: "additive",
        hlb: 0,
        max_percent: 25,
        default_percent: 10,
        description: "Sunscreen agent, provides broad-spectrum UV protection, also known for its soothing and astringent properties.",
        good_for: ["Sun Protection"],
        bad_for: []
    },
    "Hyaluronic Acid": {
        phase: "additive",
        hlb: 20,
        max_percent: 2,
        default_percent: 0.5,
        description: "Powerful humectant, helps to hydrate and plump the skin by retaining moisture, reduces the appearance of fine lines and wrinkles.",
        good_for: ["Dry skin", "Wrinkles", "Aging or age spots"],
        bad_for: []
    },
    "Retinol": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.1,
        description: "A form of Vitamin A, helps in skin renewal, boosts collagen production, effective against aging signs. Should be used intermittently until skin aclimates to it. Sun sensitizing, so should only be used at night.",
        good_for: ["Wrinkles", "Aging or age spots"],
        bad_for: ["Sensitive Skin"] // can be irritating
    },
    "Vitamin C": {
        phase: "additive",
        hlb: 20,
        max_percent: 20,
        default_percent: 5,
        description: "Antioxidant, aids in skin repair and regeneration, can help in reducing pigmentation and promoting collagen production.",
        good_for: ["Aging or age spots", "Sun Protection"],
        bad_for: []
    },
    "Vitamin E": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Antioxidant, helps in protecting the skin from environmental damage, moisturizes, and heals. Extends shelf life of oils.",
        good_for: ["Sun Protection", "Aging or age spots"],
        bad_for: []
    },
    "Niacinamide (Vitamin B3)": {
        phase: "additive",
        hlb: 20,
        max_percent: 5,
        default_percent: 2,
        description: "Improves appearance of enlarged pores, uneven skin tone, fine lines. Reduces redness and irritation.",
        good_for: ["Large pores", "Wrinkles", "Redness"],
        bad_for: []
    },
    "Lavender Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Calming and relaxing, and can be used to soothe irritated skin. Anti-inflammatory and antimicrobial properties.",
        good_for: ["Sensitive Skin", "Redness"],
        bad_for: []
    },
    "Rosemary Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 1,
        description: "Rejuvenates skin, improves hair growth and scalp health, and has antioxidant properties. Improves circulation and can help with puffiness.",
        good_for: ["Aging or age spots"],
        bad_for: ["Sensitive Skin"] // can be irritating for some people
    },
    "Tea Tree Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 1,
        description: "Antimicrobial and anti-inflammatory, very effective against acne, helps in cleansing the skin.",
        good_for: ["Adult acne"],
        bad_for: ["Dry skin"] // can be drying if overused
    },
    "Jasmine Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Moisturizes, soothes, often used for its fragrance and hydrating properties.",
        good_for: ["Dry skin"],
        bad_for: []
    },
    "Eucalyptus Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 1,
        description: "Antiseptic and anti-inflammatory properties, good for healing. Refreshing scent.",
        good_for: ["Adult acne"],
        bad_for: ["Sensitive Skin", "Dry skin"] // can be irritating and drying
    },
    "Peppermint Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Cooling sensation and refreshing scent. It has antiseptic and antimicrobial properties. Can help with acne and oily skin, but can be irritating.",
        good_for: ["Adult acne", "Puffiness"],
        bad_for: ["Sensitive Skin", "Redness"] // can be irritating and cause a burning sensation for sensitive skin types
    },
    "Pine Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Known for its invigorating and refreshing scent, has antimicrobial and anti-inflammatory properties. It's often used in skincare for its soothing effects on the skin and its ability to help with respiratory issues.",
        good_for: ["Atopic dermatitis", "Adult acne"],
        bad_for: ["Sensitive Skin"] // can be irritating due to its potent nature
    },
    "Cedar Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "With its woodsy aroma, is known for its calming and grounding effects. It has antiseptic, anti-inflammatory, and astringent properties, making it beneficial for skin conditions like acne and aiding in soothing irritated skin.",
        good_for: ["Adult acne", "Atopic dermatitis"],
        bad_for: ["Sensitive Skin"] // may cause irritation in higher concentrations or sensitive individuals
    },
    "Rosehip Seed Oil": {
        phase: "oil",
        hlb: 0,
        max_percent: 10,
        default_percent: 2,
        description: "Rosehip Seed Oil is rich in essential fatty acids and antioxidants. It's renowned for its skin-regenerative properties, aiding in reducing scars and fine lines. High in vitamins A and C, it helps in evening out skin tone and improving hydration.",
        good_for: ["Wrinkles", "Dry skin", "Sun Protection", "Aging or age spots"],
        bad_for: [] // Generally well-tolerated, but always patch test
    },

    "Geranium Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Geranium Oil, known for its floral scent, is used for its astringent, antiseptic, and anti-inflammatory properties. It helps in balancing sebum production, enhancing skin elasticity, and promoting the healing of scars and spots.",
        good_for: ["Adult acne", "Large pores", "Wrinkles"],
        bad_for: ["Sensitive Skin"] // Can be irritating for some sensitive skin types
    },

    "Carrot Seed Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Carrot Seed Oil is valued for its antioxidant properties and high vitamin A content. It's considered excellent for sun protection, rejuvenating aged skin, and promoting skin healing. Also known for its ability to rejuvenate and regenerate skin tissues.",
        good_for: ["Aging or age spots", "Sun Protection", "Wrinkles"],
        bad_for: ["Sensitive Skin"] // Can be potent; patch test recommended
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
        description: " Anti-inflammatory, antimicrobial, helps in improving skin tone and reducing scars.",
        good_for: ["Redness", "Adult acne", "Atopic dermatitis"],
        bad_for: []
    },
    "Cinnamon": {
        phase: "additive",
        hlb: 0,
        max_percent: 0.5,
        default_percent: 0.2,
        description: "Antimicrobial, stimulates blood flow, but can be irritating to the skin so should be used cautiously.",
        good_for: ["Adult acne"],
        bad_for: ["Sensitive Skin", "Dry skin"] // potential irritant
    },
    "Black Pepper": {
        phase: "additive",
        hlb: 0,
        max_percent: 0.5,
        default_percent: 0.2,
        description: "Antioxidant, stimulating, enhances blood circulation, but can be irritating to sensitive skin.",
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
    },
    "Tepezcohuite Mimosa Tenuiflora Infusion": {
        phase: "aqueous",
        hlb: 0, // Typically, herbal infusions do not have an HLB value
        max_percent: 10,
        default_percent: 5,
        description: "Rich in tannins and antioxidants, known for its healing, regenerative, and antimicrobial properties. Used to soothe skin conditions, promote wound healing, and provide anti-aging benefits. Also known as Jurema.",
        good_for: ["Atopic dermatitis", "Wrinkles", "Redness"],
        bad_for: ["Sensitive Skin"] // can be irritating due to tannins
    }


};

export default ingredients;
