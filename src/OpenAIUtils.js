import ingredients, { getIngredientsByType } from "./ingredients";

const phaseExamples = {
  "carrier": [
    {
      "title": "Gentle Moisturizing",
      "ingredients": {
        "Argan Oil": 10,
        "Jojoba Oil": 10,
        "Sunflower Oil": 5
      },
      "description": "Offers a light, non-greasy feel ideal for daily use and suitable for most skin types, providing balanced hydration without clogging pores."
    },
    {
      "title": "Soothing",
      "ingredients": {
        "Jojoba Oil": 10,
        "Sweet Almond Oil": 5,
        "Shea Butter": 8
      },
      "description": "Focuses on calming sensitive skin and reducing irritation, featuring a higher content of Shea Butter for enhanced soothing effects."
    },
    {
      "title": "Anti Aging Nourishment",
      "ingredients": {
        "Argan Oil": 10,
        "Rosehip Seed Oil": 5,
        "Vitamin E": 2
      },
      "description": "Targets mature skin with active ingredients for regeneration and antioxidant protection, more potent in anti-aging properties compared to other options."
    }
  ],
  "aqueous": [
    {
      "title": "Hydrating",
      "ingredients": {
        "Hyaluronic Acid Serum (2%)" : 2
      },
      "description": "Provides intense hydration with a high concentration of Hyaluronic Acid, perfect for dry skin or as a boost of moisture in any skincare routine."
    },
    {
      "title": "Skin Soothing",
      "ingredients": {
        "Aloe Vera Gel": 5,
        "Distilled Water": 5,
        "Oat Milk": 5
      },
      "description": "Focuses on calming and soothing irritated skin with Aloe Vera and Oat Milk, offering a gentle and hydrating formula suitable for sensitive skin types."
    },
    {
      "title": "Cooling",
      "ingredients": {
        "Aloe Vera Gel": 4,
        "Glycerin": 2,
        "Cucumber Juice": 4
      },
      "description": "Delivers a refreshing and cooling sensation with Cucumber Juice and Aloe Vera, perfect for hot weather or as a post-sun exposure treatment."
    }
  ],
  "fragrance": [
    {
      "title": "No Fragrance",
      "description": "Opt for a fragrance-free formulation to minimize the risk of irritation and maintain a neutral scent, suitable for sensitive skin or those preferring a natural product."
    },
    {
      "title": "Floral Elegance",
      "ingredients": {
        "Jasmine Oil": 1,
        "Geranium Oil": 2
      },
      "description": "Offers a luxurious floral scent with Jasmine and Geranium essential oils, providing a sophisticated and elegant fragrance profile with skin balancing properties."
    },
    {
      "title": "Forest Harmony",
      "ingredients": {
        "Rosemary Oil": 2,
        "Cedar Oil": 2,
        "Pine Oil": 1
      },
      "description": "Creates a grounding and calming aroma reminiscent of a forest setting, combining Rosemary, Cedarwood, and Pine essential oils for a refreshing and earthy scent."
    },
    {
      "title": "Soothing Lavender",
      "ingredients": {
        "Lavender Oil": 3
      },
      "description": "Focuses on relaxation and stress relief with Lavender essential oil, known for its calming and soothing effects on both the skin and mind."
    },
    {
      "title": "Refreshing and Invigorating",
      "ingredients": {
        "Peppermint Oil": 2,
        "Eucalyptus Oil": 2,
        "Pine Oil": 1
      },
      "description": "Provides a cooling and refreshing sensation with Peppermint and Eucalyptus essential oils, perfect for revitalizing the senses and awakening the skin."
    }
  ],
  "preservative": [

    {
      "title": "Phenoxyethanol",
      "ingredients": {
        "Phenoxyethanol": 0.5
      },
      "description": "A widely used synthetic preservative effective against a broad spectrum of bacteria and fungi, providing reliable protection and extending product shelf life. Approximate shelf life: 24 months."
    },
    {
      "title": "AntiMicro Root Blend",
      "ingredients": {
        "AntiMicro Root Blend": 1
      },
      "description": "A natural plant-based preservative blend derived from root extracts, offering antimicrobial properties while being gentle on the skin, suitable for organic and natural formulations. Approximate shelf life: 6 months."
    },
    {
      "title": "AntiMicro Banana",
      "ingredients": {
        "AntiMicro Banana": 2
      },
      "description": "A natural plant-based, banana-derived antimicrobial blend, providing effective preservation with a mild sweet scent, ideal for those looking for natural preservation options with added sensory appeal. Approximate shelf life: 6 months."
    },
    {
      "title": "No Preservative",
      "description": "Ideal for people with specific skin sensitivities who plan to use the product rapidly.  Approximate shelf life: 2-8 weeks."
    }
  ],
  "active": [
    {
      "title": "No Active Ingredients",
      "description": "Embrace simplicity with a plant-based formula that harnesses the natural benefits of oils and extracts, free from added active ingredients."
    },
    {
      "title": "Ultimate Sun Protection",
      "ingredients": {
        "Zinc Oxide": 10,
        "Vitamin E": 0.5
      },
      "description": "Provides broad-spectrum UV protection with Zinc Oxide, enhanced with Vitamin E for its antioxidant properties, perfect for daily sun protection and skin health."
    },
    {
      "title": "Anti-Aging Night Treatment",
      "ingredients": {
        "Retinyl Palmitate": 1,
        "Vitamin E": 0.5,
        "Niacinamide (Vitamin B3)": 2
      },
      "description": "A powerful night treatment combining Retinyl Palmitate, Vitamin E, and Niacinamide to target fine lines, wrinkles, and uneven skin tone, promoting smoother and younger-looking skin."
    },
    {
      "title": "Calming and Protective",
      "ingredients": {
        "Niacinamide (Vitamin B3)": 2,
        "Zinc Oxide": 5,
        "Vitamin E": 0.5
      },
      "description": "A soothing formulation with Niacinamide to reduce redness and irritation, Zinc Oxide for soothing and protection, and Vitamin E for its moisturizing and healing properties, suitable for sensitive skin."
    }
  ]
  
  
};

const phaseSpecificInstructions = {
  "fragrance": "Focus on the skin benefits over the aromatic profile of the fragrance phase, highlighting the sensory experience and therapeutic properties of essential oils to enhance the overall product appeal.",
};

export const getPhaseSuggestions = (state, somethingElseText) => {
  console.log("State received in getPhaseSuggestions:", {
    currentPhase: state.currentPhase,
    productData: state.productData,
    goalsData: state.goalsData,
    fullState: state
  });

  if (!state.currentPhase || !state.productData || !state.goalsData) {
    console.error("Invalid state data provided. Missing:", {
      currentPhase: !state.currentPhase,
      productData: !state.productData,
      goalsData: !state.goalsData
    });
    return Promise.reject("Invalid state data provided.");
  }

  // Preservative phase has static phase suggestions
  if (state.currentPhase === "preservative") {
    return Promise.resolve(phaseExamples["preservative"]);
  }

  let phase = state.currentPhase;
  let productType = state.productData;
  
  // Parse new product type format if present (e.g., "face_cream" -> "Face Cream")
  if (productType.includes('_')) {
    const [area, type] = productType.split('_');
    productType = `${area.charAt(0).toUpperCase() + area.slice(1)} ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  }

  console.log("Phase and state: ", phase, state);
  const endpoint = 'https://us-central1-skincare-recipe-tool.cloudfunctions.net/getPhaseSuggestions';
  
  // Modify system prompt based on product type
  const systemPrompt = `You are an award winning cosmetic chemist helping the user formulate a 
  new ${productType} customized to the particulars of their skin. This recipe is being written 
  one phase at a time, and you are currently working on the ${phase} phase of the formulation. 
  Please provide three examples of ${phase} formulations with ingredients and proportions that are specifically appropriate for a ${productType}. ${phaseSpecificInstructions[phase] || ""}
  
  Here are examples of ${phase} formulations: ${JSON.stringify(phaseExamples[phase])}.
  The units after each ingredient represent the number of 'parts' of that ingredient to include in the formulation, and may be integers between 1-10.

  You may only use the ingredients found in this object: ${JSON.stringify(getIngredientsByType(phase))}. 
  
  Output your examples as an array of JSON formatted including a title and 1-sentence description of the phase to help the user understand the 
  contrasting benefits of each phase option.  Do not include any commentary outside of array of JSON objects.`;

  const userPrompt = `Hello please assist me in the formulation of a customized skincare product for my individual skin type and concerns.
  My skincare concerns are ${state.goalsData.join(", ")}. The product I would like to make is a ${state.productData}.

  ${somethingElseText ? `The user is specifically asking for: ${somethingElseText}.` : ""}

  What are three possible phase formulations for the ${phase} phase of my skincare product?  Please include the ingredients and proportions for each formulation
  `;
  const data = {
    systemPrompt: systemPrompt,
    userPrompt: userPrompt
  };
  console.log("Sending OpenAI request: ", data.systemPrompt, data.userPrompt);
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      console.log("response: " + data.reply.choices[0].message.content);
      const recipeResponse = data.reply.choices[0].message.content;
      const parsedResponse = JSON.parse(recipeResponse);

      // Prepend "No Active Ingredients" or "No Fragrance" option if applicable
      if (phase === "active" || phase === "fragrance") {
        const noOption = phaseExamples[phase].find(example => example.title.startsWith("No "));
        if (noOption) {
          parsedResponse.push(noOption);  // Add the "No ___" option to the beginning of the array
        }
      }

      console.log(parsedResponse);
      return parsedResponse;
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error state here, e.g., display an error message
    });
};
