import api from "./client";
import { getToken } from "../utils/auth";
import type { Chat, StudyModeKey } from "../types/chat";

export const getRecentChats = async () => {
    const { data } = await api.get("/api/chats");

    return data;
};

export const createChat = async (
    documentIds: string[],
    title?: string
): Promise<Chat> => {
    const { data } = await api.post("/api/chats", { documentIds, title });

    return data.chat;
};

export const getChat = async (chatId: string): Promise<Chat> => {
    const { data } = await api.get(`/api/chats/${chatId}`);

    return data.chat;
};

export const addDocumentsToChat = async (
    chatId: string,
    documentIds: string[]
): Promise<Chat> => {
    const { data } = await api.post(`/api/chats/${chatId}/documents`, {
        documentIds,
    });

    return data.chat;
};

interface StreamCallbacks {
    onToken: (token: string) => void;
    onDone: (sources: unknown[]) => void;
    onError: (message: string) => void;
}

// Uses raw fetch (not axios) so we can read the SSE stream token-by-token
export const streamChatMessage = async (
    chatId: string,
    question: string,
    { onToken, onDone, onError }: StreamCallbacks,
    mode?: StudyModeKey
) => {
    try {
        const token = getToken();

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/chat/${chatId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({ question, mode }),
            }
        );

        if (!response.ok || !response.body) {
            const errBody = await response.json().catch(() => null);
            onError(errBody?.message || "Failed to get a response");
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const parts = buffer.split("\n\n");
            buffer = parts.pop() ?? "";

            for (const part of parts) {
                const line = part.trim();
                if (!line.startsWith("data:")) continue;

                const jsonStr = line.slice(5).trim();
                if (!jsonStr) continue;

                try {
                    const parsed = JSON.parse(jsonStr);

                    if (parsed.error) {
                        onError(parsed.error);
                    } else if (parsed.done) {
                        onDone(parsed.sources ?? []);
                    } else if (parsed.token) {
                        onToken(parsed.token);
                    }
                } catch {
                    // ignore malformed SSE chunk
                }
            }
        }
    } catch {
        onError("Connection lost. Please try again.");
    }
};