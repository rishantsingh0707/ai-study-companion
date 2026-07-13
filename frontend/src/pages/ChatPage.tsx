import { useParams, useLocation } from "react-router-dom";
import ChatContainer from "../components/chat/ChatContainer";
import type { ChatDocument } from "../types/chat";

type LocationState = {
    readyDocuments?: ChatDocument[];
};

export default function ChatPage() {
    const { chatId } = useParams<{ chatId: string }>();
    const location = useLocation();

    const isNewChat = !chatId || chatId === "new";
    const state = location.state as LocationState | null;

    return (
        <div className="h-full">
            <ChatContainer
                chatId={isNewChat ? null : chatId!}
                initialDocuments={isNewChat ? state?.readyDocuments : undefined}
            />
        </div>
    );
}