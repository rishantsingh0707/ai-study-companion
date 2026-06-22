import { GoogleGenAI } from "@google/genai";


if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is required');
}
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const generateEmbedding = async (
    text
) => {
    try {

        const response =
            await ai.models.embedContent({
                model:
                    "gemini-embedding-001",
                contents: text,
            });

        if (!response?.embeddings?.[0]?.values) {
            throw new Error('Invalid embedding response structure');
        }

        return response.embeddings[0].values;
    } catch (error) {
        console.error('Embedding generation failed:', error);
        throw new Error(`Failed to generate embedding: ${error.message}`);
    }
};