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
