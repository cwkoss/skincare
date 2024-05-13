import { getIngredientsByType } from "./ingredients";

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
        "Aloe Vera Gel": 2,
        "Distilled Water": 10,
        "Glycerin": 2
      },
      "description": "Maximizes hydration with a higher water content and glycerin to attract moisture, ideal for dehydrated skin."
    },
    {
      "title": "Soothing",
      "ingredients": {
        "Aloe Vera Gel": 5,
        "Distilled Water": 5
      },
      "description": "Enhances skin calming properties with a higher concentration of Aloe Vera, perfect for soothing irritation and redness."
    },
    {
      "title": "Balancing",
      "ingredients": {
        "Witch Hazel": 5,
        "Distilled Water": 5
      },
      "description": "Focuses on toning and balancing skin's pH with Witch Hazel, suitable for oily and acne-prone skin types."
    }
  ]
};



export const getPhaseSuggestions = (phase, state) => {
  console.log("Phase and state: ", phase, state);
  const endpoint = 'https://us-central1-skincare-recipe-tool.cloudfunctions.net/getPhaseSuggestions';
  const systemPrompt = `You are an award winning cosmetic chemist helping the user formulate a 
  new skincare product customized to the particulars of their skin. This recipe is being written 
  one phase at a time, and you are currently working on the ${phase} phase of the formulation. 
  Please provide three examples of ${phase} formulations with ingredients and proportions.
  
  Here are examples of ${phase} formulations: ${phaseExamples[phase]}.  

  You may only use the ingredients found in this list: ${JSON.stringify(getIngredientsByType(phase))}.
  
  Output your examples as an array
  of JSON formated including a title and 1-sentence description of the phase to help the user understand the 
  contrasting benefits of each phase option.  Do not include any commentary outside of array of JSON objects.`;

  const userPrompt = `Hello please assist me in the formulation of a customized skincare product for my individual skin type and concerns.
  My skincare concerns are ${state.goalsData.join(", ")}. The product I would like to make is a ${state.productData}.

  What are three possible phase formulations for the ${phase} phase of my skincare product?  Please include the ingredients and proportions for each formulation
  `;
  const data = {
    systemPrompt: systemPrompt,
    userPrompt: userPrompt
  };
  console.log("Sending OpenAI request: ", data.systemPrompt, data.userPrompt);
  fetch(endpoint, {
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
      console.log(parsedResponse);
      return parsedResponse;
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error state here, e.g., display an error message
    });
};
