import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const generateSummary = async (content) => {
    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `
You are an AI Study Assistant.

Generate a concise study summary.

Rules:
- Use headings.
- Use bullet points.
- Keep important concepts.
- Ignore references and acknowledgements.
- Maximum 500 words.
`,
            },
            {
                role: "user",
                content,
            },
        ],
    });

    return completion.choices[0].message.content;
};