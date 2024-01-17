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
