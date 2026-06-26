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

export const generateQuiz = async (content, difficulty = "easy", count = 10) => {

    const completion =
        await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",

            response_format: {
                type: "json_object",
            },

            messages: [
                {
                    role: "system",

                    content: `
Generate exactly ${count} ${difficulty} multiple choice questions from the document.

Difficulty Guidelines:

Easy:
- Direct definition questions
- Basic facts
- Beginner level

Medium:
- Conceptual understanding
- Application based
- Requires reasoning

Hard:
- Scenario based
- Analytical
- Real interview/exam level

Rules:
- Four options per question.
- One correct answer.
- Short explanation.
- Return ONLY valid JSON.

Format:

{
    "questions":[
        {
            "question":"",
            "options":["","","",""],
            "correctAnswer":"",
            "explanation":""
        }
    ]
}
`,
                },
                {
                    role: "user",
                    content,
                },
            ],
        });

    return JSON.parse(
        completion.choices[0].message.content
    );
};

export const generateFlashcards = async (content, count = 20) => {
    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        response_format: {
            type: "json_object",
        },
        messages: [
            {
                role: "system",
                content: `
Generate exactly ${count} flashcards.

Rules:
- Return ONLY valid JSON.
- Each flashcard should test one concept.
- Keep the front side short.
- Keep the back side concise but informative.

Format:
{
    "flashcards": [
        {
            "front": "",
            "back": ""
        }
    ]
}
`,
            },
            {
                role: "user",
                content,
            },
        ],
    });

    return JSON.parse(
        completion.choices[0].message.content
    );
};

export const generateInterviewQuestions = async (content, difficulty = "easy", count = 10) => {

    const completion =
        await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",

            response_format: {
                type: "json_object",
            },

            messages: [
                {
                    role: "system",
                    content: `
Generate exactly ${count} ${difficulty} interview questions from the document.

Difficulty Guidelines:

Easy:
- Definition based
- Basic concepts
- Beginner friendly

Medium:
- Conceptual
- "Why" and "How" questions
- Requires understanding

Hard:
- Scenario based
- Comparison questions
- Real interview style
- Requires deep understanding

Return ONLY valid JSON.

Format:

{
    "questions":[
        {
            "question":"",
            "answer":""
        }
    ]
}
`,
                },
                {
                    role: "user",
                    content,
                },
            ],
        });

    return JSON.parse(
        completion.choices[0].message.content
    );
};

export const explainLikeIm10 = async (content) => {

    const completion =
        await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "system",

                    content: `
You are an expert teacher.

Explain the uploaded study material to a 10-year-old.

Structure:

1. What is it?
2. Why is it important?
3. How does it work?
4. Real-life example.
5. Key points to remember.

Use:
- Short sentences
- Bullet points where helpful
- Everyday examples
- Friendly language

Avoid unnecessary technical terms. If you must use one, explain it immediately.
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