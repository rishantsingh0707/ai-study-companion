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