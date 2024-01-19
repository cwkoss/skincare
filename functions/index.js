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

            if (!inputText) {
                throw new Error("No text provided");
            }

            const gptResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                temperature: 0.9,
                n: 1,
                stream: false,
                messages: [
                    {
                      role: "system",
                      content: ```
                      You are an award winning cosmetic chemist. 

                      Return a json-formatted skincare recipe in the following format:
                      
                      { 
                            ingredientKey1: parts
                            ingredientKey2:parts
                            ingredientKey3:parts.... (repeat for as many ingredient keys as ingredients in your formulation)
                           commentary: "Reasoning why you selected ingredients, how it will help accomplish goals, additional useful information"
                      }

                      Do not include any commentatry or text outside of the json object.
                      
                      You may only use ingredients from this dict:
                      
                      const ingredients = {
                          "Coconut oil": {
                              phase: "oil",
                              comedogenic: 4,
                              viscosity: 5,
                              hlb: 8,
                              description: "Moisturizes skin and hair, rich in fatty acids and antioxidants."
                          },
                          "Argan oil": {
                              phase: "oil",
                              comedogenic: 0,
                              viscosity: 3,
                              hlb: 11,
                              description: "Enhances skin elasticity and hair shine, rich in vitamin E."
                          },
                          "Sunflower oil": {
                              phase: "oil",
                              comedogenic: 2,
                              viscosity: 3,
                              hlb: 0,
                              description: "Lightweight, non-comedogenic oil, suitable for sensitive skin."
                          },
                          "Distilled water": {
                              phase: "aqueous",
                              comedogenic: 0,
                              viscosity: 1,
                              hlb: 20,
                              description: "Hydrates and serves as a base for water-soluble ingredients."
                          },
                          "Salt water": {
                              phase: "aqueous",
                              comedogenic: 0,
                              viscosity: 1.5,
                              hlb: 20,
                              description: "Research is mixed. Some sources suggest that salt water might have beneficial effects on the skin, including potential antimicrobial properties and the ability to dry out pimples. Salt water could also irritate sensitive skin or exacerbate conditions like eczema or dermatitis."
                          },
                          "Beeswax": {
                              phase: "emulsifier",
                              comedogenic: 2,
                              viscosity: 10,
                              hlb: 12,
                              description: "Natural stabilizer, thickens formulas and creates protective barrier on skin."
                          },
                          "Cocoa butter": {
                              phase: "oil",
                              comedogenic: 4,
                              viscosity: 8,
                              hlb: 8,
                              description: "Nourishes skin, reduces scars, and offers a chocolaty aroma."
                          },
                          "Pecan oil": {
                              phase: "oil",
                              comedogenic: 2,
                              viscosity: 4,
                              hlb: 0,
                              description: "Rich in antioxidants, moisturizes skin, and promotes hair health."
                          },
                          "Green tea": {
                              phase: "aqueous",
                              comedogenic: 0,
                              viscosity: 1,
                              hlb: 20,
                              description: "Rich in antioxidants, reduces inflammation, and promotes skin healing."
                          },
                          "Pumpkin seed oil": {
                              phase: "oil",
                              comedogenic: 2,
                              viscosity: 4,
                              hlb: 0,
                              description: "Improves skin tone, fights acne, and soothes sensitive skin."
                          },
                          "Benne seed oil": {
                              phase: "oil",
                              comedogenic: 3,
                              viscosity: 4,
                              hlb: 0,
                              description: "Rich in linoleic acid, nourishes skin and strengthens hair."
                          },
                          "Okra seed oil": {
                              phase: "oil",
                              comedogenic: 2,
                              viscosity: 3,
                              hlb: 0,
                              description: "Promotes a healthy scalp and is rich in unsaturated fats. (comedogenic rating estimated)"
                          },
                          "Olive oil": {
                              phase: "oil",
                              comedogenic: 2,
                              viscosity: 4,
                              hlb: 0,
                              description: "Moisturizes skin, rich in vitamins, and promotes hair health."
                          },
                          "Jojoba Oil": {
                              phase: "oil",
                              comedogenic: 2,
                              viscosity: 2,
                              hlb: 0,
                              description: "Mimics natural skin oils, balances skin's sebum production."
                          },
                             "Lecithin": {
                              phase: "emulsifier",
                              comedogenic: 0,
                              viscosity: 5,
                              hlb: 8,
                              description: "Natural stabilizer, thickens formulas and creates protective barrier on skin. (not sure about this viscosity value)"
                          },
                          "Cetearyl Alcohol": {
                              phase: "emulsifier",
                              comedogenic: 0,
                              viscosity: 8,
                              hlb: 16,
                              description: "This is a waxy fatty alcohol derived from natural sources like coconut and palm oils. It's used not only as an emulsifier but also as a thickener and stabilizer in creams and lotions."
                          },
                          "Zinc Oxide": {
                              phase: "additive",
                              comedogenic: 0,
                              viscosity: 5,
                              hlb: 0,
                              max_percent: 25,
                              default_percent: 10,
                              description: "Adds SPF"
                          },
                         
                          "Retinol": {
                              phase: "additive",
                              comedogenic: 0,
                              viscosity: 0,
                              hlb: 0,
                              max_percent: 1,
                              default_percent: 0.25,
                              description: "A derivative of Vitamin A, is renowned for its anti-aging properties, as it boosts collagen production, accelerates skin renewal, and helps to reduce the appearance of fine lines, wrinkles, and uneven skin tone."
                          },
                         
                          
                          "Niacinamide (Vitamin B3)": {
                              phase: "additive",
                              comedogenic: 0,
                              viscosity: 0,
                              hlb: 20,
                              max_percent: 5,
                              default_percent: 2,
                              description: "Niacinamide is a water-soluble vitamin that works with the natural substances in your skin to help visibly improve the appearance of enlarged pores, uneven skin tone, fine lines and wrinkles, dullness, and a weakened surface."
                          },
                      };
                      
                    ```,
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
