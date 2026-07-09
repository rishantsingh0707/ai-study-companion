import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import ChatMessage from "./ChatMessage";
import type { ChatMessage as ChatMessageType } from "../../types/chat";

type ChatMessagesProps = {
    messages: ChatMessageType[];
    isStreaming: boolean;
    streamingContent: string;
};

export default function ChatMessages({
    messages,
    isStreaming,
    streamingContent,
}: ChatMessagesProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, streamingContent]);

    if (messages.length === 0 && !isStreaming) {
        return (
            <div className="flex h-full flex-col items-center justify-center text-center text-base-content/60">
                <Sparkles size={40} className="mb-4 text-primary" />
                <p className="text-lg font-medium">
                    Ask anything about your uploaded document
                </p>
                <p className="mt-1 text-sm">
                    Try: "Summarize this document" or "Explain chapter 2"
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 px-2 py-4">
            {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
            ))}

            {isStreaming && (
                <ChatMessage
                    message={{
                        role: "assistant",
                        content: streamingContent || "…",
                    }}
                />
            )}

            <div ref={bottomRef} />
        </div>
    );
}