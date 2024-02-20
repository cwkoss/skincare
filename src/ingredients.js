import { skincareProducts } from "./Product";

const ingredients = {
    "Sunflower Oil": {
        phase: "oil",
        type: "carrier",
        hlb: 0,
        description: "Moisturizer, rich in Vitamin E, non-comedogenic, suitable for sensitive skin.",
        good_for: ["Sensitive Skin", "Dry skin"],
        bad_for: [],
        cost: "$20/half gallon",
        density: 0.92,
        cost_per_g: 0.01148,
        light_heavy: 4,
        penetrating_occlusive: 4,
        soothing_stimulating: 2,
        gentle_active: 5,
    },
    "Jojoba Oil": {
        phase: "oil",
        type: "carrier",
        hlb: 0,
        description: "Moisturizer, mimics natural skin oils, balances sebum production, good for acne-prone skin.",
        good_for: ["Adult acne", "Dry skin", "Sensitive Skin"],
        bad_for: [],
        cost: "$9.99/8oz",
        density: 0.87,
        cost_per_g: 0.0485,
        light_heavy: 4,
        penetrating_occlusive: 3,
        soothing_stimulating: 2,
        gentle_active: 5,
    },
    "Argan Oil": {
        phase: "oil",
        type: "carrier",
        hlb: 11,
        description: "Rich in antioxidants and Vitamin E, moisturizes, reduces signs of aging, improves skin elasticity and enhances hair shine.",
        good_for: ["Aging or age spots", "Dry skin", "Wrinkles"],
        bad_for: [],
        cost: "$54.99/32oz",
        density: 0.91,
        cost_per_g: 0.0639,
        buy_again_url:"https://www.organicpureoil.com/product/pure-1-oz-organic-argan-oil-extra-virgin-unrefined-cold-pressed/",
        light_heavy: 4,
        penetrating_occlusive: 3,
        soothing_stimulating: 3,
        gentle_active: 3,
    },
    "Shea Butter": {
        phase: "oil",
        type: "carrier",
        hlb: 8,
        description: "Moisturizer, rich in fatty acids and vitamins, anti-inflammatory, helps with skin healing.",
        good_for: ["Dry skin", "Atopic dermatitis"],
        bad_for: ["Adult acne"], // due to its comedogenic properties
        cost: "$9.99/16oz",
        density: 0.927,
        cost_per_g: 0.0228,
        light_heavy: 7,
        penetrating_occlusive: 7,
        soothing_stimulating: 5,
        gentle_active: 3,
    },
    "Cocoa Butter": {
        phase: "oil",
        type: "carrier",
        hlb: 8,
        description: "Moisturizer, high in fatty acids, helps to hydrate and nourish the skin, reduces the appearance of scars.",
        good_for: ["Dry skin", "Wrinkles"],
        bad_for: ["Adult acne"],
        cost: "$1/oz",
        cost_per_g: 0.0338,
        buy_again_url: "https://simply-ingredients.com/collections/butters-waxes/products/fair-trade-cocoa-butter?variant=37889946484922",
        light_heavy: 8,
        penetrating_occlusive: 8,
        soothing_stimulating: 5,
        gentle_active: 3,
    },
    "Coconut Oil": {
        phase: "oil",
        type: "carrier",
        hlb: 8,
        description: "Moisturizes skin and hair, rich in fatty acids and antioxidants. Can be comedogenic (acne-causing) for some.",
        good_for: ["Dry skin"],
        bad_for: ["Adult acne"], // high comedogenic rating
        cost: "$6.96/15oz",
        density: 0.924,
        cost_per_g: 0.0170,
        light_heavy: 7,
        penetrating_occlusive: 4,
        soothing_stimulating: 4,
        gentle_active: 4,
    },
    "Pecan Oil": {
        phase: "oil",
        type: "carrier",
        hlb: 0,
        description: "Moisturizer, rich in antioxidants, promotes skin and hair health, hydrating properties.",
        good_for: ["Dry skin"],
        bad_for: [],
        cost: "$17/8oz",
        density: 0.95,
        cost_per_g: 0.0756,
        light_heavy: 6,
        penetrating_occlusive: 5,
        soothing_stimulating: 4,
        gentle_active: 3,
    },
    "Pumpkin Seed Oil": {
        phase: "oil",
        type: "carrier",
        hlb: 0,
        description: "Rich in zinc and vitamins, improves skin tone, fights acne, and soothes sensitive skin.",
        good_for: ["Adult acne", "Sensitive Skin"],
        bad_for: [],
        cost: "$3/2oz",
        density: 0.95,
        cost_per_g: 0.0534,
        light_heavy: 5,
        penetrating_occlusive: 4,
        soothing_stimulating: 4,
        gentle_active: 4, 
    },
    "Rosehip Seed Oil": {
        phase: "oil",
        type: "carrier",
        hlb: 0,
        max_percent: 10,
        default_percent: 2,
        description: "Rosehip Seed Oil is rich in essential fatty acids and antioxidants. It's renowned for its skin-regenerative properties, aiding in reducing scars and fine lines. High in vitamins A and C, it helps in evening out skin tone and improving hydration.",
        good_for: ["Wrinkles", "Dry skin", "Sun Protection", "Aging or age spots"],
        bad_for: [], // Generally well-tolerated, but always patch test
        density: 0.92,
        cost_per_g: 0.6159,
        light_heavy: 3,
        penetrating_occlusive: 3,
        soothing_stimulating: 4,
        gentle_active: 4,
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
        type: "carrier",
        hlb: 0,
        description: "Moisturizer, rich in vitamins and antioxidants, promotes skin and hair health, but can be comedogenic (acne-causing) for some.",
        good_for: ["Dry skin"],
        bad_for: ["Adult acne"],
        cost: "$18.99/68oz",
        density: 0.9,
        cost_per_g: 0.0105,
        light_heavy: 6,
        penetrating_occlusive: 5,
        soothing_stimulating: 3,
        gentle_active: 6,
        nourishing_acnefighting: 3,
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
        type: "aqueous",
        hlb: 20,
        description: "Hydrates and serves as a base for water-soluble ingredients.",
        good_for: [],
        bad_for: [],
        cost_per_g: 0.0001,
        endogenous: true,
        light_heavy: 1,
        penetrating_occlusive: 1,
        soothing_stimulating: 2,
        gentle_active: 1,
    },
    "Green Tea": {
        phase: "aqueous",
        type: "aqueous",
        hlb: 20,
        description: "Antioxidant-rich, reduces inflammation and redness, can protect against environmental stressors and promotes skin healing.",
        good_for: ["Redness", "Puffiness", "Sensitive Skin"],
        bad_for: [],
        cost_per_g: 0.0070,
        light_heavy: 2,
        penetrating_occlusive: 2,
        soothing_stimulating: 3,
        gentle_active: 6,
    },
    /*"Sea Salt": {
        phase: "aqueous",
        hlb: 20,
        description: "Rich in minerals, helps in detoxifying and cleansing the skin, can balance oil production.",
        good_for: ["Large pores", "Atopic dermatitis"],
        bad_for: ["Dry skin"], // can be drying,
        light_heavy: 1,
        penetrating_occlusive: 1,
        soothing_stimulating: 9,
        gentle_active: 7,
    },*/
    "Aloe Vera Gel": {
        phase: "aqueous",
        type: "aqueous",
        hlb: 20,
        description: "Soothes skin irritations, hydrates, promotes healing, good for sunburns and inflammation",
        good_for: ["Sensitive Skin", "Sun Protection", "Redness"],
        bad_for: [],
        cost: "9.99/300ml",
        density: 1.2,
        cost_per_g: 0.02775,
        light_heavy: 2,
        penetrating_occlusive: 2,
        soothing_stimulating: 1,
        gentle_active: 2,
    },
    "Glycerin": {
        phase: "aqueous",
        type: "aqueous",
        hlb: 20,
        description: "Humectant, draws moisture into the skin, suitable for all skin types, enhances skin hydration.",
        good_for: ["Dry skin"],
        bad_for: [],
        cost: "3.66/4oz",
        density: 1.26,
        cost_per_g: 0.0246,
        endogenous: true,
        light_heavy: 3,
        penetrating_occlusive: 2,
        soothing_stimulating: 2,
        gentle_active: 3,
    },
    "Honey": {
        phase: "aqueous",
        type: "aqueous",
        hlb: 20,
        description: "Natural humectant, antibacterial, great for acne treatment and hydration, soothing for the skin.",
        good_for: ["Dry skin", "Adult acne"],
        bad_for: [],
        light_heavy: 6,
        penetrating_occlusive: 3,
        soothing_stimulating: 2,
        gentle_active: 4,
    },
    /*"Apple Cider Vinegar": {
        phase: "aqueous",
        hlb: 20,
        description: "Balances skin's pH, astringent properties, good for acne-prone skin but can be drying.",
        good_for: ["Adult acne", "Large pores"],
        bad_for: ["Dry skin"], // can be drying
        light_heavy: 1,
        penetrating_occlusive: 1,
        soothing_stimulating: 9,
        gentle_active: 7,
    },*/
    "Cucumber Juice": {
        phase: "aqueous",
        type: "aqueous",
        hlb: 20,
        description: " Hydrating, soothing, rich in vitamins and minerals, good for puffiness and calming irritated skin.",
        good_for: ["Puffiness", "Sensitive Skin"],
        bad_for: [],
        light_heavy: 2,
        penetrating_occlusive: 2,
        soothing_stimulating: 1,
        gentle_active: 2,
    },
    "Oat Milk": {
        phase: "aqueous",
        type: "aqueous",
        hlb: 20,
        description: "Contains lipids and water-absorbing substances, providing moisturizing and soothing benefits. Helps in reducing inflammation",
        good_for: ["Dry skin", "Sensitive Skin"],
        bad_for: [],
        cost_per_g: 0.0008,
        light_heavy: 3,
        penetrating_occlusive: 2,
        soothing_stimulating: 1,
        gentle_active: 3,
    },
    "Beeswax": {
        phase: "emulsifier",
        type: "emulsifier",
        hlb: 12,
        description: " Emulsifier and stabilizer in formulations, creates a protective barrier on the skin, retains moisture.",
        good_for: ["Dry skin"],
        bad_for: [],
        cost_per_g: 0.1706,
        light_heavy: 9,
        penetrating_occlusive: 9,
        soothing_stimulating: 3,
        gentle_active: 4,
    },
    "Lecithin": {
        phase: "emulsifier",
        type: "emulsifier",
        hlb: 8,
        description: "Natural stabilizer, thickens formulas and creates protective barrier on skin.",
        good_for: [],
        bad_for: [],
        cost_per_g: 0.0884,
        endogenous: true,
        light_heavy: 6,
        penetrating_occlusive: 5,
        soothing_stimulating: 4,
        gentle_active: 5,
    },
    "Cetearyl Alcohol": {
        phase: "emulsifier",
        type: "emulsifier",
        hlb: 16,
        description: "A waxy fatty alcohol used as an emulsifier, thickener and stabilizer in creams and lotions. Extracted from Coconut and Palm Kernel oils",
        good_for: [],
        bad_for: ["Sensitive Skin"], // can be irritating for some sensitive skins
        cost_per_g: 0.0439,
        light_heavy: 7,
        penetrating_occlusive: 6,
        soothing_stimulating: 2,
        gentle_active: 3,
    },
    /*"Castille Soap": {
        phase: "surfactant",
        hlb: 10,
        description: "Gentle and versatile cleanser, made from olive and hemp oils, suitable for sensitive skin.",
        good_for: ["Sensitive Skin"],
        bad_for: [],
        density: 1.04,
        cost_per_g: 0.0172,
    },*/
    "Zinc Oxide": {
        phase: "additive",
        hlb: 20,
        max_percent: 25,
        default_percent: 10,
        description: "Sunscreen agent, provides broad-spectrum UV protection, also known for its soothing and astringent properties.",
        good_for: ["Sun Protection"],
        bad_for: [],
        cost_per_g: 0.0958,
        light_heavy: 7,
        penetrating_occlusive: 8,
        soothing_stimulating: 1,
        gentle_active: 2,
    },
    "Hyaluronic Acid": {
        phase: "additive",
        hlb: 20,
        max_percent: 2,
        default_percent: 0.5,
        description: "Powerful humectant, helps to hydrate and plump the skin by retaining moisture, reduces the appearance of fine lines and wrinkles.",
        good_for: ["Dry skin", "Wrinkles", "Aging or age spots"],
        bad_for: [],
        cost_per_g: 0.4639,
        endogenous: true,
        light_heavy: 2,
        penetrating_occlusive: 1,
        soothing_stimulating: 1,
        gentle_active: 2,
    },
    "Retinol": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.1,
        description: "Retinyl Palmitate is an ester of Retinol (Vitamin A) and Palmitic Acid.  It is a powerful antioxidant that may help boosts collagen in the skin, minimizes fine lines and wrinkles, as well as smooths the texture of the skin. Should be used intermittently until skin aclimates to it. Sun sensitizing, so should only be used at night.",
        good_for: ["Wrinkles", "Aging or age spots"],
        bad_for: ["Sensitive Skin"], // can be 
        cost_per_g: 0.4282,
        deprecated: true,
        light_heavy: 4,
        penetrating_occlusive: 3,
        soothing_stimulating: 7,
        gentle_active: 6,
    },
    "Retinyl Palmitate": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.1,
        description: "An ester of Retinol (Vitamin A) and Palmitic Acid, it is the weakest form of Retinol. It is a powerful antioxidant that may help boosts collagen in the skin, minimizes fine lines and wrinkles, as well as smooths the texture of the skin. Should be used intermittently until skin aclimates to it. Sun sensitizing, so should only be used at night.",
        good_for: ["Wrinkles", "Aging or age spots"],
        bad_for: ["Sensitive Skin"], // can be 
        cost_per_g: 0.4282,
        endogenous: true,
        light_heavy: 4,
        penetrating_occlusive: 3,
        soothing_stimulating: 9,
        gentle_active: 9,
    },
    "Vitamin C": {
        phase: "additive",
        hlb: 20,
        max_percent: 20,
        default_percent: 5,
        description: "Antioxidant, aids in skin repair and regeneration, can help in reducing pigmentation and promoting collagen production.",
        good_for: ["Aging or age spots", "Sun Protection"],
        bad_for: [],
        cost_per_g: 0.0288,
        endogenous: true,
        light_heavy: 3,
        penetrating_occlusive: 2,
        soothing_stimulating: 7,
        gentle_active: 7,
    },
    "Vitamin E": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Antioxidant, helps in protecting the skin from environmental damage, moisturizes, and heals. Extends shelf life of oils.",
        good_for: ["Sun Protection", "Aging or age spots"],
        bad_for: [],
        density: 0.95,
        cost_per_g: 0.3505,
        endogenous: true,
        light_heavy: 4,
        penetrating_occlusive: 3,
        soothing_stimulating: 3,
        gentle_active: 4,
    },
    "Niacinamide (Vitamin B3)": {
        phase: "additive",
        hlb: 20,
        max_percent: 5,
        default_percent: 2,
        description: "Improves appearance of enlarged pores, uneven skin tone, fine lines. Reduces redness and irritation.",
        good_for: ["Large pores", "Wrinkles", "Redness"],
        bad_for: [],
        cost_per_g: 0.3567,
        endogenous: true,
        light_heavy: 2,
        penetrating_occlusive: 1,
        soothing_stimulating: 6,
        gentle_active: 6,
    },
    "Lavender Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Calming and relaxing, and can be used to soothe irritated skin. Anti-inflammatory and antimicrobial properties.",
        good_for: ["Sensitive Skin", "Redness"],
        bad_for: [],
        density: 0.885,
        cost_per_g: 1.1578,
        light_heavy: 5,
        penetrating_occlusive: 4,
        soothing_stimulating: 6,
        gentle_active: 5,
    },
    "Rosemary Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 1,
        description: "Rejuvenates skin, improves hair growth and scalp health, and has antioxidant properties. Improves circulation and can help with puffiness.",
        good_for: ["Aging or age spots"],
        bad_for: ["Sensitive Skin"], // can be irritating for some people
        density: 0.895,
        cost_per_g: 0.1214,
        light_heavy: 5,
        penetrating_occlusive: 4,
        soothing_stimulating: 7,
        gentle_active: 6,
    },
    "Tea Tree Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 1,
        description: "Antimicrobial and anti-inflammatory, very effective against acne, helps in cleansing the skin.",
        good_for: ["Adult acne"],
        bad_for: ["Dry skin"], // can be drying if overused
        density: 0.878,
        cost_per_g: 0.3792,
        light_heavy: 4,
        penetrating_occlusive: 4,
        soothing_stimulating: 8,
        gentle_active: 7,
    },
    "Jasmine Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Moisturizes, soothes, often used for its fragrance and hydrating properties.",
        good_for: ["Dry skin"],
        bad_for: [],
        density: 0.947,
        cost_per_g: 2.7434, // expensive,
        light_heavy: 4,
        penetrating_occlusive: 4,
        soothing_stimulating: 5,
        gentle_active: 5,
    },
    "Eucalyptus Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 1,
        description: "Antiseptic and anti-inflammatory properties, good for healing. Refreshing scent.",
        good_for: ["Adult acne"],
        bad_for: ["Sensitive Skin", "Dry skin"], // can be irritating and drying
        densitY: 0.914 ,
        cost_per_g: 0.1530,
        light_heavy: 4,
        penetrating_occlusive: 4,
        soothing_stimulating: 7,
        gentle_active: 6,
    },
    "Peppermint Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Cooling sensation and refreshing scent. It has antiseptic and antimicrobial properties. Can help with acne and oily skin, but can be irritating.",
        good_for: ["Adult acne", "Puffiness"],
        bad_for: ["Sensitive Skin", "Redness"], // can be irritating and cause a burning sensation for sensitive skin types
        density: 0.898,
        cost_per_g: 0.0942,
        light_heavy: 4,
        penetrating_occlusive: 4,
        soothing_stimulating: 8,
        gentle_active: 6,
    },
    "Pine Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "Known for its invigorating and refreshing scent, has antimicrobial and anti-inflammatory properties. It's often used in skincare for its soothing effects on the skin and its ability to help with respiratory issues.",
        good_for: ["Atopic dermatitis", "Adult acne"],
        bad_for: ["Sensitive Skin"], // can be irritating due to its potent nature
        cost_per_g: 1.155,
        light_heavy: 4,
        penetrating_occlusive: 4,
        soothing_stimulating: 8,
        gentle_active: 7,
    },
    "Cedar Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 1,
        default_percent: 0.5,
        description: "With its woodsy aroma, is known for its calming and grounding effects. It has antiseptic, anti-inflammatory, and astringent properties, making it beneficial for skin conditions like acne and aiding in soothing irritated skin.",
        good_for: ["Adult acne", "Atopic dermatitis"],
        bad_for: ["Sensitive Skin"], // may cause irritation in higher concentrations or sensitive individuals
        density: 0.952,
        cost_per_g: 1.7507,
        light_heavy: 5,
        penetrating_occlusive: 5,
        soothing_stimulating: 7,
        gentle_active: 6,
    },


    "Geranium Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 2,
        default_percent: 0.5,
        description: "Geranium Oil, known for its floral scent, is used for its astringent, antiseptic, and anti-inflammatory properties. It helps in balancing sebum production, enhancing skin elasticity, and promoting the healing of scars and spots.",
        good_for: ["Adult acne", "Large pores", "Wrinkles"],
        bad_for: ["Sensitive Skin"], // Can be irritating for some sensitive skin types
        density: 0.887,
        cost_per_g: 1.5031,
        light_heavy: 4,
        penetrating_occlusive: 4,
        soothing_stimulating: 6,
        gentle_active: 5,
    },

    "Carrot Seed Oil": {
        phase: "additive",
        hlb: 0,
        max_percent: 5,
        default_percent: 1,
        description: "Carrot Seed Oil is valued for its antioxidant properties and high vitamin A content. It's considered excellent for sun protection, rejuvenating aged skin, and promoting skin healing. Also known for its ability to rejuvenate and regenerate skin tissues.",
        good_for: ["Aging or age spots", "Sun Protection", "Wrinkles"],
        bad_for: ["Sensitive Skin"], // Can be potent; patch test recommended
        density: 0.92,
        cost_per_g: 1.5942,
        light_heavy: 5,
        penetrating_occlusive: 4,
        soothing_stimulating: 4,
        gentle_active: 5,
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
    },
    "Turmeric": {
        phase: "additive",
        hlb: 20,
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
        hlb: 20, 
        max_percent: 10,
        default_percent: 5,
        description: "Rich in tannins and antioxidants, known for its healing, regenerative, and antimicrobial properties. Used to soothe skin conditions, promote wound healing, and provide anti-aging benefits. Also known as Jurema.",
        good_for: ["Atopic dermatitis", "Wrinkles", "Redness"],
        bad_for: ["Sensitive Skin"] // can be irritating due to tannins
    }*/


};

export const getFilteredIngredientList = (productName) => {
    return Object.keys(ingredients) // Get the keys of the object.
        .filter(ingredient => !skincareProducts[productName].bannedIngredients.includes(ingredient)) // Filter keys based on their values.
        .filter(ingredient => ingredients[ingredient].deprecated !== true) // Filter out deprecated ingredients
        .reduce((acc, key) => {
            acc[key] = ingredients[key]; // Add the filtered keys to a new object.
            return acc;
        }, {});
    //return ingredients.filter(ingredient => skincareProducts[productName].bannedIngredients.includes(ingredient));
}

export const getIngredientsByType = (type) => {
    return Object.keys(ingredients)
        .filter(ingredient => ingredients[ingredient].type === type)
        .reduce((acc, key) => {
            acc[key] = ingredients[key];
            return acc;
        }, {});
}

export const getFormatedIngredientsList = () => {
        let formattedString = "";
    
        Object.keys(ingredients).forEach((key, index, array) => {
          formattedString += key;
    
          if (ingredients[key].hasOwnProperty('default_percent') || ingredients[key].hasOwnProperty('max_percent')) {
            formattedString += " (";
    
            if (ingredients[key].hasOwnProperty('default_percent')) {
              formattedString += `default: ${ingredients[key].default_percent}`;
              if (ingredients[key].hasOwnProperty('max_percent')) {
                formattedString += ", ";
              }
            }
    
            if (ingredients[key].hasOwnProperty('max_percent')) {
              formattedString += `max: ${ingredients[key].max_percent}`;
            }
    
            formattedString += ")";
          }
    
          if (index < array.length - 1) {
            formattedString += ", ";
          }
        });
    
        return formattedString;
      
}

export default ingredients;


