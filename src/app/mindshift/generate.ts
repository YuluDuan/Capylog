const {CohereClient} = require("cohere-ai");

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
})

export const generateResponse = async(prompt: string) => {
    const response = await cohere.chat({
        message: `can you rephrase my diary with a positive tone ${prompt}? so that I can view the things in a different way`
    })
    return response.text;
}