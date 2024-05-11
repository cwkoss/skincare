import { getIngredientsByType } from "./ingredients";

const phaseExamples =
{
  "carrier": ```
[{
  "title": "Gentle Moisturizing",
  "ingredients": {
    "Argan Oil": 10,
    "Jojoba Oil": 10,
    "Sunflower Oil": 5
  },
  {
    "title": "Soothing",
    "ingredients": {
      "Jojoba Oil": 10,
      "Sweet Almond Oil": 5,
      "Shea Butter": 8
    },
    {
      "title": "Anti Aging Nourishment",
      "ingredients": {
        "Argan Oil": 10,
        "Rosehip Seed oil": 5,
        "Vitamin E": 2
      }
    }
  }
}]```,
  "aqueous": ```
[{
  "title": "Hydrating",
  "ingredients": {
    "Aloe Vera Gel": 2,
    "Distilled Water": 10,
    "Glycerin": 2
  },
  {
    "title": "Soothing",
    "ingredients": {
      "Aloe Vera Gel": 5,
      "Distilled Water": 5
    },
    {
      "title": "Balancing",
      "ingredients": {
        "Witch Hazel": 5,
        "Distilled Water": 5
      }
    }
  }
}]```,
};


export const getPhaseSuggestions = (phase) => {
  const endpoint = 'https://us-central1-skincare-recipe-tool.cloudfunctions.net/getPhaseSuggestions';
  const systemPrompt = ```You are an award winning cosmetic chemist helping the user formulate a 
  new skincare product customized to the particulars of their skin. This recipe is being written 
  one phase at a time, and you are currently working on the ${phase} phase of the formulation. 
  Please provide three examples of ${phase} formulations with ingredients and proportions.
  
  Here are examples of ${phase} formulations: ${phaseExamples[phase]}.  
  
  Output your examples as an array
  of JSON formated including a title and 1-sentence description of the phase to help the user understand the 
  contrasting benefits of each phase option.  Do not include any commentary outside of array of JSON objects.```;
  
  const userPrompt = ```Hello please assist me in the formulation 
  ```;
  return ["one", "two", "three"];
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      setLoading(false);
      console.log('Success:', data);
      const recipeResponse = data.reply.choices[0].message.content;
      const parsedResponse = JSON.parse(recipeResponse);
      console.log(parsedResponse);
      return parsedResponse;
    })
    .catch((error) => {
      setLoading(false);
      console.error('Error:', error);
      // Handle error state here, e.g., display an error message
    });
};
