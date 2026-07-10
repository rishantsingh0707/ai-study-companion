// Each mode maps to a system-prompt instruction and a fallback question
// used when the user clicks the action without typing anything themselves.
export const STUDY_MODES = {
    generateSummary: {
        label: "Summary",
        instruction:
            "Summarize the provided context clearly and concisely. Use short paragraphs, and use bullet points for key ideas. Leave a blank line between sections.",
        defaultQuestion: "Generate a summary of this document.",
    },
    generateQuiz: {
        label: "Quiz",
        instruction:
            `Create a quiz based on the provided context, using this exact markdown structure for every question:

### Q1. <question text>

- A) <option>
- B) <option>
- C) <option>
- D) <option>

**Correct answer:** <letter>

Leave a blank line between each question block. Generate 5-8 questions total.`,
        defaultQuestion: "Generate a quiz based on this document.",
    },
    generateFlashcards: {
        label: "Flashcards",
        instruction:
            `Create flashcards based on the provided context, using this exact markdown structure for every card:

### Q: <question>

<answer, 1-2 sentences>

Leave a blank line between each card. Generate 8-12 flashcards covering the most important concepts.`,
        defaultQuestion: "Generate flashcards based on this document.",
    },
    generateInterviewQuestions: {
        label: "Interview Questions",
        instruction:
            `Generate interview-style questions someone might be asked about the content in the provided context, using this exact markdown structure for each one:

### Q1. <question text>

**What a strong answer covers:** <1-2 sentence pointer>

Leave a blank line between each question block. Include 6-10 questions ranging from basic to in-depth.`,
        defaultQuestion: "Generate interview questions based on this document.",
    },
    explainLikeIm10: {
        label: "Explain Like I'm 10",
        instruction:
            "Explain the provided context in very simple terms, as if explaining to a 10-year-old. Use short sentences, simple words, and relatable everyday analogies. Break the explanation into short paragraphs with blank lines between them. Avoid jargon, or explain it simply if it has to be used.",
        defaultQuestion: "Explain this document like I'm 10 years old.",
    },
    generateNotes: {
        label: "Notes",
        instruction:
            "Create concise, well-organized study notes based on the provided context. Use ## headings for each topic, bullet points underneath, and bold the key terms. Leave a blank line between sections. Keep it scannable and easy to revise from.",
        defaultQuestion: "Generate study notes based on this document.",
    },
};

export const getStudyMode = (mode) => STUDY_MODES[mode] ?? null;