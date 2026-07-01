import { groq } from "../config/groq.js";

if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY environment variable is required');
}

export const generateAnswer = async (question, chunks, history) => {

    const context =
        chunks.join("\n\n");

    const completion =
        await groq.chat.completions.create({
            model:
                "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "system",
                    content:
                        "Answer only using the provided context. If the answer is not found, say so.",
                },
                {
                    role: "user",
                    content: `Context:${context}Question:${question}`,
                },
            ],
            stream: true
        });

    return completion
        .choices[0]
        .message.content;
};

export const streamAnswer = async (question, chunks, history) => {

    const context = chunks.join("\n\n");

    return await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        stream: true,

        messages: [
            {
                role: "system",
                content: `You are an AI Study Assistant.

Answer ONLY from the provided context.

If the answer is not available in the context, clearly say so.

Context:

${context}`,
            },

            ...history,

            {
                role: "user",
                content: question,
            },
        ],
    });
};

