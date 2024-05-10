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
