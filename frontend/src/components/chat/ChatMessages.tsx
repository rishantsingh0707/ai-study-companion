import { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
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
    const containerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);

    const isNearBottom = () => {
        const el = containerRef.current;
        if (!el) return true;
        return el.scrollHeight - el.scrollTop - el.clientHeight < 2000;
    };

    const scrollToBottom = (smooth: boolean) => {
        bottomRef.current?.scrollIntoView({
            behavior: smooth ? "smooth" : "auto",
            block: "end",
        });
    };

    useEffect(() => {
        scrollToBottom(true);
    }, [messages.length]);

    useEffect(() => {
        if (!isStreaming) return;
        if (!isNearBottom()) return;

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => scrollToBottom(false));

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [streamingContent, isStreaming]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const updateScrollButton = () => {
            const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
            setShowScrollToBottom(distanceFromBottom > 120);
        };

        updateScrollButton();
        el.addEventListener("scroll", updateScrollButton);

        return () => {
            el.removeEventListener("scroll", updateScrollButton);
        };
    }, [messages.length, isStreaming]);

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
        <div className="relative h-full">
            <div ref={containerRef} className="h-full overflow-y-auto">
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
            </div>

            {showScrollToBottom && (
                <button
                    type="button"
                    onClick={() => scrollToBottom(true)}
                    aria-label="Scroll to bottom"
                    className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full border border-base-300 bg-base-100 p-2 text-base-content shadow-md transition hover:bg-base-200"
                >
                    <ArrowDown size={18} />
                </button>
            )}
        </div>
    );
}