import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { ChatHeaderSkeleton, ChatMessagesSkeleton } from "./ChatSkeleton";
import { getChat, createChat, streamChatMessage } from "../../api/chatApi";
import type { Chat, ChatMessage as ChatMessageType, ChatDocument, StudyModeKey } from "../../types/chat";

type ChatContainerProps = {
    // null = "new chat" pending mode (no chat persisted yet)
    chatId: string | null;
    // A file the user already uploaded on the previous page (e.g. dashboard)
    initialDocuments?: ChatDocument[];
};

export default function ChatContainer({ chatId, initialDocuments }: ChatContainerProps) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [pendingDocuments, setPendingDocuments] = useState<ChatDocument[]>(
        initialDocuments ?? []
    );
    const [loading, setLoading] = useState(!!chatId);
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamingContent, setStreamingContent] = useState("");

    // Tracks a chatId we just created ourselves, so the load-effect below
    // doesn't wastefully refetch data we already have in memory.
    const skipNextLoadRef = useRef<string | null>(null);
    // Holds the streamed answer as it accumulates, read once streaming ends.
    const streamingContentRef = useRef("");

    useEffect(() => {
        if (!chatId) {
            setChat(null);
            setMessages([]);
            setLoading(false);
            return;
        }

        if (skipNextLoadRef.current === chatId) {
            skipNextLoadRef.current = null;
            setLoading(false);
            return;
        }

        let cancelled = false;

        const load = async () => {
            try {
                setLoading(true);
                const data = await getChat(chatId);

                if (cancelled) return;

                setChat(data);
                setMessages(data.messages ?? []);
                setPendingDocuments([]);
            } catch {
                if (!cancelled) toast.error("Failed to load this chat");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId]);

    const handleDocumentReady = useCallback((doc: ChatDocument) => {
        setPendingDocuments((prev) => [...prev, doc]);
    }, []);

    const handleDocumentsAttached = useCallback((updatedChat: Chat) => {
        setChat(updatedChat);
    }, []);

    const sendQuestion = useCallback(
        async (targetChatId: string, question: string, mode?: StudyModeKey) => {
            setMessages((prev) => [...prev, { role: "user", content: question }]);
            setIsStreaming(true);
            setStreamingContent("");
            streamingContentRef.current = "";

            await streamChatMessage(
                targetChatId,
                question,
                {
                    onToken: (token) => {
                        streamingContentRef.current += token;
                        setStreamingContent((prev) => prev + token);
                    },
                    onDone: () => {
                        const finalContent = streamingContentRef.current;
                        setMessages((prev) => [
                            ...prev,
                            { role: "assistant", content: finalContent },
                        ]);
                        setStreamingContent("");
                        setIsStreaming(false);
                        queryClient.invalidateQueries({ queryKey: ["chats"] });
                        queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
                    },
                    onError: (message) => {
                        toast.error(message);
                        setIsStreaming(false);
                        setStreamingContent("");
                    },
                },
                mode
            );
        },
        [queryClient]
    );

    const handleSend = useCallback(
        async (question: string, mode?: StudyModeKey) => {
            if (chat) {
                await sendQuestion(chat._id, question, mode);
                return;
            }

            if (pendingDocuments.length === 0) {
                toast.error("Please attach a file before asking a question");
                return;
            }

            setIsCreatingChat(true);

            try {
                const newChat = await createChat(
                    pendingDocuments.map((d) => d._id),
                    pendingDocuments[0].title
                );
                newChat.documents = pendingDocuments;

                skipNextLoadRef.current = newChat._id;
                setChat(newChat);
                setPendingDocuments([]);

                queryClient.invalidateQueries({ queryKey: ["chats"] });
                queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
                navigate(`/dashboard/chat/${newChat._id}`, { replace: true });

                await sendQuestion(newChat._id, question, mode);
            } catch {
                toast.error("Failed to create chat. Please try again.");
            } finally {
                setIsCreatingChat(false);
            }
        },
        [chat, pendingDocuments, navigate, queryClient, sendQuestion]
    );

    if (loading) {
        return (
            <div className="flex h-full flex-col">
                <ChatHeaderSkeleton />
                <div className="flex-1 overflow-hidden">
                    <ChatMessagesSkeleton />
                </div>
            </div>
        );
    }

    const headerTitle = chat?.title ?? pendingDocuments[0]?.title ?? "New Chat";
    const headerDocuments = chat?.documents ?? pendingDocuments;
    const canSend = !!chat || pendingDocuments.length > 0;

    return (
        <div className="flex h-full flex-col">
            <ChatHeader title={headerTitle} documents={headerDocuments} />

            <div className="flex-1 overflow-hidden">
                <ChatMessages
                    messages={messages}
                    isStreaming={isStreaming}
                    streamingContent={streamingContent}
                />
            </div>

            <ChatInput
                chatId={chat?._id ?? null}
                canSend={canSend}
                onSend={handleSend}
                onDocumentReady={handleDocumentReady}
                onDocumentsAttached={handleDocumentsAttached}
                disabled={isStreaming || isCreatingChat}
            />
        </div>
    );
}