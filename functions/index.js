/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const corsOptions = {
    origin: true // 'https://cwkoss.github.io/'
};
const cors = require("cors")(corsOptions);
const functions = require("firebase-functions");

const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: functions.config().openai.key,
});

exports.chatWithOpenAI = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        try {
            const inputText = request.body.text || "what is the meaning of life?";

            const gptResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                temperature: 0.9,
                n: 1,
                stream: false,
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant designed to help people create skincare forumulations that are safe and effective.  You will receive a potential skincare recipe and should give advice on whether the recipe looks like it will be successful, what the benefits and risks of the recipe are, and suggest potential modifications. Keep your response concise and to the point - it should only include a numbered list of modifications and suggestions.",
                    },
                    { role: "user", content: inputText },
                ],
            });
            console.log("Request: " + request.body.text);
            console.log("GPT Response: ", gptResponse.choices[0].message.content);
            response.send({ reply: gptResponse });
        } catch (error) {
            console.error("Error calling OpenAI: ", error);
            response.status(500).send("Error processing your request: " + error);
        }
    });
});

exports.getInitialRecipe = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        try {
            const inputText = request.body.text;
            const inputIngredients = request.body.ingredients;

            if (!inputText) {
                throw new Error("No text provided");
            }
            if (!inputIngredients) {
                throw new Error("No ingredients provided");
            }

            const gptResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                temperature: 0.9,
                n: 1,
                stream: false,
                messages: [
                    {
                        role: "system",
                        content: `You are an award winning cosmetic chemist. 

                      Return a json-formatted skincare recipe in the following format:
                      
                      { 
                            ingredientKey1: percentage
                            ingredientKey2:percentage
                            ingredientKey3:percentage.... (repeat for as many ingredient keys as ingredients in your formulation)
                            commentary: "your commentary here"
                            shelfLifeEstimate: "A specific estimate of shelf life.  Be conservative.  If you think a product will last 4 weeks, don't say '4 weeks to 6 weeks' - just say 4 weeks."
                      }

                      Example response:
                      {
                            "Argan Oil": 10,
                            "Sunflower Oil": 20,
                            "Cetearyl Alcohol": 5,
                            "Distilled Water": 59,
                            "Glycerin": 5,
                            "Tea Tree Oil": 0.5,
                            "Rosemary Oil": 0.5,
                            "commentary": "This is a great formulation for dry skin.  It will be very moisturizing and will help with acne. It will be a little greasy, so if you want to reduce the greasiness, you can reduce the amount of sunflower oil and increase the amount of water.  If you want to make it more moisturizing, you can increase the amount of argan oil and decrease the amount of water.  If you want to make it more anti-acne, you can increase the amount of tea tree oil and decrease the amount of rosemary oil",
                            "shelfLifeEstimate": "4 weeks"
                      }

                      Commentary should include your reasoning why you selected ingredients, how it will help accomplish goals, additional useful information.  Do not mention patch testing or shelf life in your commentary - that will be covered elsewhere.

                      IngredientKeysN should exclude the parenthetical default and maximum percentages if present, ex. ""Rosemary Oil (default: 1, max: 2)" should be "Rosemary Oil".

                      Make sure the percentage of all ingredients adds up to exactly 100.  Do not include any commentatry or text outside of the json object.  Ingredients with a default and maximum percentage should typically use the default unless there is a very good reason to exceed them.  If a product will have fragrance, the sum of essential oils should never exceed 2% of the total formulation.
                      
                      You may only use ingredients from this list: ${inputIngredients}. Parentheticals represent the default and maximum percentages for each ingredient if present."
                    `,
                    },
                    { role: "user", content: inputText },
                ],
            });
            console.log("Request: " + request.body.text);
            console.log("GPT Response: ", gptResponse.choices[0].message.content);
            response.send({ reply: gptResponse });
        } catch (error) {
            console.error("Error calling OpenAI: ", error);
            response.status(500).send("Error processing your request: " + error);
        }
    });
});

exports.getRecipeVariations = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        try {
            const inputRecipe = request.body.recipe;
            const inputIngredients = request.body.ingredients;

            if (!inputRecipe) {
                throw new Error("No recipe provided");
            }
            if (!inputIngredients) {
                throw new Error("No ingredients provided");
            }
            const messageBody = [
                {
                    role: "system",
                    content: `You are an award-winning cosmetic chemist. 

                  Return an array containing 10 json-formatted skincare recipe variations following the specified format:
                  
                  [
                    { 
                      "ingredientKey1": percentageDelta,
                      "ingredientKey2": percentageDelta,
                      // Include changes for as many ingredients as are modified in this variation.
                      // Positive values for percentageDelta indicate an increase, negative values a decrease.
                      "tagline": "A brief description of the variation's purpose, ~3 words",
                      "description": "Explain the variation's purpose and its differences from the original formulation. Highlight benefits and any potential risks, concisely in 2 sentences."
                    },
                    // ... (repeat for a total of 10 variations)
                  ]

                  Example response:
                  [
                    {
                        "tagline": "Enhanced Elasticity and Shine",
                        "Argan Oil": -2,
                        "Vitamin E": 1,
                        "Rosemary Oil": 1,
                        "description": "Vitamin E and rosemary oil are introduced to improve hair's elasticity and shine. This variation focuses on enhancing the hair's natural luster and strength, complementing the existing benefits of argan and jojoba oils."
                    },
                    {
                        "tagline": "Purifying and Refreshing",
                        "Sunflower Oil": -2,
                        "Tea Tree Oil": 1,
                        "Eucalyptus Oil": 1,
                        "description": "Introducing Tea Tree and Eucalyptus Oils, this variation focuses on purifying the scalp and providing a refreshing sensation. Ideal for promoting scalp health and clarity, it combines the antimicrobial and invigorating properties of these essential oils to enhance cleanliness and vitality."
                    },
                    {
                        "tagline": "Deep Hydration and Balance",
                        "Sunflower Oil": -10,
                        "Jojoba ": 10,
                        "description": "This variation boosts Jojoba Oil for unmatched hydration and scalp balance, reducing Sunflower Oil to focus on regulating natural oil production. Ideal for deep nourishment, it promotes a healthier scalp and hair texture with enhanced moisture and balance."
                    }
                    // ... (repeat for a total of 10 variations)
                  ]

                  How to reason through this problem:
                   - First, decide which ingredients you'd like to add or increase, and what ingredientDeltas you want to use for each of them.
                   - Second, decide which ingredients you'd like to decrease or remove, and set their ingredientDeltas so the sum of all percentageDeltas equals 0.
                   - Third, double-check that the sum of all percentageDeltas equals 0.
                   - Fourth, write a brief tagline and description for each variation, highlighting the purpose and benefits of the changes.
              
                  Rules:
                  1. The sum of all percentageDeltas within each variation must equal exactly 0.
                  2. Exclude ingredients with a 0 delta from the variation.
                  3. Each response must include at least one variation that introduces an ingredient not present in the original recipe. 
                  4. At least one variation should not introduce any new ingredients but adjust the quantities of existing ones.
                  5. IngredientKeys should not include default or maximum percentages.
                  6. Description should be concise, 2-3 sentences max, without mentioning patch testing or shelf life. Description should focus on the purpose and benefits of the variation rather than describing the specific changes made.
              
                  Note: When exceeding default percentages for ingredients, provide a compelling reason within the variation's description.`,
                },
                { role: "user", content: "Please make 10 variation options for the following recipe: " + JSON.stringify(inputRecipe.ingredients) + "(only ingredients from this recipe can have negative percentageDeltas).  You may use the ingredients already in the recipe or draw from this list of ingredients: "  + JSON.stringify(inputIngredients) + ".  Make sure the sum of all percentageDeltas within each variation equals 0." },
            ];
            console.log(messageBody);
            const gptResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                temperature: 0.9,
                n: 1,
                stream: false,
                messages: messageBody,
            });
            console.log("Request: " + request.body.text);
            console.log("GPT Response: ", gptResponse.choices[0].message.content);
            response.send({ reply: gptResponse });
        } catch (error) {
            console.error("Error calling OpenAI: ", error);
            response.status(500).send("Error processing your request: " + error);
        }
    });
});

exports.getProportionSuggestion = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        try {
            const phaseProportions = request.body.phaseProportions;

            const messageBody = [
                {
                    role: "system",
                    content: `You are an award-winning cosmetic chemist. 

                  Return a json-formatted object suggesting proportions for a single phase of a skincare recipe in this specified format:
                
                  {
                    "Argan Oil": 10,
                    "Sunflower Oil": 5,
                    "Shea Butter": 5,
                    "commentary": "Argan Oil is very light and thin, Sunflower Oil is medium, and Shea Butter is heavier and will add thickness, so overall these proprotions will make a light, moisturizing cream that is not too heavy.  If you want a heavier cream, you can increase the amount of Shea Butter and decrease the amount of Sunflower Oil.  If you want a lighter cream, you can decrease the amount of Shea Butter and increase the amount of Sunflower Oil.  If you want a more moisturizing cream, you can increase the amount of Argan Oil and decrease the amount of Sunflower Oil."
                  }

                  Values must be between 1-10 Parts. Commentary should give the user an idea of what the proportions will do to the final product.  Do not mention patch testing or shelf life in your commentary - that will be covered elsewhere. Do not include any text outside of the json object. 
                  `,
                },
                { role: "user", content: "Please suggest the ideal proportions to use for these ingredients, here are my initial ingredients and number of parts of each: " + JSON.stringify(phaseProportions)},
            ];
            console.log(messageBody);
            const gptResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                temperature: 0.9,
                n: 1,
                stream: false,
                messages: messageBody,
            });
            console.log("Request: " + request.body.text);
            console.log("GPT Response: ", gptResponse.choices[0].message.content);
            response.send({ reply: gptResponse });
        } catch (error) {
            console.error("Error calling OpenAI: ", error);
            response.status(500).send("Error processing your request: " + error);
        }
    });
});
