import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY environment variable is required');
}
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const generateAnswer = async (question, chunks) => {

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
        });

    return completion
        .choices[0]
        .message.content;
};