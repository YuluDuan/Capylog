const {CohereClient} = require("cohere-ai");

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
})

const generateResponse = async(prompt: string) => {
    const response = await cohere.chat({
        message: `can you rephrase my diary with a positive tone ${prompt}? so that I can view the things in a different way`,
        connectors: [{ id: "web-search" }],
        stream: false,
    })
    return response.text;
}

export {cohere, generateResponse}