import { useQuery } from "@tanstack/react-query";
import { History, MessageSquare, Plus ,BrainCog} from "lucide-react";
import { Link, useLocation  } from "react-router-dom";

import { getRecentChats } from "../api/chatApi";
import UserMenu from "../components/common/UserMenu";
type Chat = {
    _id: string;
    title: string;
};

export default function Sidebar() {
    const location = useLocation();
    const activeChatId = location.pathname.match(/\/dashboard\/chat\/([^/]+)/)?.[1];

    const { data, isLoading } = useQuery({
        queryKey: ["chats"],
        queryFn: getRecentChats,
    });

    const recentChats = data?.chats?.slice(0, 8) ?? [];

    return (
        <aside className="hidden w-72 flex-col border-r border-base-300 bg-base-200 md:flex">

            {/* Logo Section */}
            <div className="border-b border-base-300 p-4">
                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                >
                    <BrainCog className="h-10 w-10 text-primary" />
                    <span className="text-lg font-bold text-base-content">Nexa</span>
                </Link>
            </div>

            {/* Header */}
            <div className="p-2 pb-2">
                <Link
                    to="/dashboard/chat/new"
                    className={`btn flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm border border-primary text-base-content ${!activeChatId || activeChatId === "new"
                            ? "btn-active"
                            : "btn-outline"
                        }`}
                >
                    <Plus size={16} />
                    New Chat
                </Link>
            </div>

            {/* Recent Chats */}
            <div className="flex-1 overflow-y-auto px-2 py-2">

                <h2 className="mb-4 px-2 text-sm font-semibold uppercase tracking-wide text-base-content/60">
                    Recent Chats
                </h2>

                {isLoading ? (
                    <div className="space-y-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="skeleton h-10 w-full rounded-xl"
                            />
                        ))}
                    </div>
                ) : recentChats.length === 0 ? (
                    <div className="mt-10 text-center text-sm text-base-content/60">
                        No chats yet
                    </div>
                ) : (
                    <div className="space-y-1">
                        {recentChats.map((chat: Chat) => {
                            const isActive = chat._id === activeChatId;

                            return (
                                <Link
                                    key={chat._id}
                                    to={`/dashboard/chat/${chat._id}`}
                                    className={`btn w-full rounded-xl justify-start ${isActive
                                            ? "btn-active bg-base-300"
                                            : "btn-ghost"
                                        }`}
                                >
                                    <MessageSquare size={16} className="shrink-0" />
                                    <span className="truncate">{chat.title}</span>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer */}

            <div className="space-y-2 p-1">

                <Link
                    to="/dashboard/history"
                    className="btn btn-ghost rounded-xl w-full justify-start"
                >
                    <History size={18} />
                    View All Chats
                </Link>

                <UserMenu />

            </div>

        </aside>
    );
}