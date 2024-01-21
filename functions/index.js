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
            if(!inputIngredients) {
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
                            shelfLifeEstimate: "A specific estimate of shelf life.  Be conservative.  If you think a product will last 2 months, don't say '2 months to 6 months' - just say 2 months."
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
                            "shelfLifeEstimate": "3 months"
                      }

                      Commentary should include your reasoning why you selected ingredients, how it will help accomplish goals, additional useful information.

                      IngredientKeysN should exclude the parenthetical default and maximum percentages if present, ex. ""Rosemary Oil (default: 1, max: 2)" should be "Rosemary Oil".

                      Make sure the percentage of all ingredients adds up to exactly 100.  Do not include any commentatry or text outside of the json object.  Ingredients with a default and maximum percentage should typically use the default unless there is a good reason to exceed them.  If a product will have fragrance, the sum of essential oils should usually not exceed 1% of the total formulation.
                      
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
