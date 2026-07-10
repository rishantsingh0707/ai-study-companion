export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export interface ChatDocument {
    _id: string;
    title: string;
    fileType?: string;
    fileSize?: number;
}

export interface Chat {
    _id: string;
    userId: string;
    title: string;
    documentIds: string[];
    documents?: ChatDocument[];
    messages: ChatMessage[];
    createdAt: string;
    updatedAt: string;
}

export interface ChunkSource {
    documentId: string;
    content: string;
    [key: string]: unknown;
}

export type StudyModeKey =
    | "generateSummary"
    | "generateQuiz"
    | "generateFlashcards"
    | "generateInterviewQuestions"
    | "explainLikeIm10"
    | "generateNotes";

export interface StudyModeOption {
    key: StudyModeKey;
    label: string;
}

export const STUDY_MODE_OPTIONS: StudyModeOption[] = [
    { key: "generateSummary", label: "Summary" },
    { key: "generateQuiz", label: "Quiz" },
    { key: "generateFlashcards", label: "Flashcards" },
    { key: "generateInterviewQuestions", label: "Interview Qs" },
    { key: "explainLikeIm10", label: "Explain Like I'm 10" },
    { key: "generateNotes", label: "Notes" },
];