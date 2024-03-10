const {CohereClient} = require("cohere-ai");

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
})

const generateResponse = async(prompt: string) => {
    const response = await cohere.chat({
        message: `Revise my sentence into a Chronicle of Positivity with an uplifting perspective. Include the revised entry only in a cute and less formal way and no other comments or format. My Diary:  ${prompt} and please directly start the revised version no sentences like 'Here is your diary entry, rewritten with a more uplifting, positive perspective:' and don't double quote the answer.`,
        stream: false,
    })
    return response.text;
}

export {cohere, generateResponse}