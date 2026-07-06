import { useQuery } from "@tanstack/react-query";
import { History, MessageSquare, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { getRecentChats } from "../api/chatApi";
import UserMenu from "../components/common/UserMenu";
type Chat = {
    _id: string;
    title: string;
};

export default function Sidebar() {
    const { data, isLoading } = useQuery({
        queryKey: ["chats"],
        queryFn: getRecentChats,
    });

    const recentChats = data?.chats?.slice(0, 5) ?? [];

    return (
        <aside className="hidden w-72 flex-col border-r border-base-300 bg-base-200 md:flex">

            {/* Logo Section */}
            <div className="border-b border-base-300 p-4">
                <Link 
                    to="/"
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-base-100 font-bold text-lg">
                        N
                    </div>
                    <span className="text-lg font-bold text-base-content">Nexa</span>
                </Link>
            </div>

            {/* Header */}
            <div className="p-4 pb-2">
                <Link
                    to="/dashboard/chat/new"
                    className="btn btn-primary flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm text-base-content"
                >
                    <Plus size={16} />
                    New Chat
                </Link>
            </div>

            {/* Recent Chats */}
            <div className="flex-1 overflow-y-auto p-4">

                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-base-content/60">
                    Recent Chats
                </h2>

                {isLoading ? (
                    <div className="space-y-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="skeleton h-10 w-full rounded-lg"
                            />
                        ))}
                    </div>
                ) : recentChats.length === 0 ? (
                    <div className="mt-10 text-center text-sm text-base-content/60">
                        No chats yet
                    </div>
                ) : (
                    <div className="space-y-2">
                        {recentChats.map((chat: Chat) => (
                            <Link
                                key={chat._id}
                                to={`/dashboard/chat/${chat._id}`}
                                className="btn btn-ghost w-full justify-start"
                            >
                                <MessageSquare size={16} />
                                <span className="truncate">{chat.title}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}

            <div className="border-t border-base-300 p-4 space-y-3">

                <Link
                    to="/dashboard/history"
                    className="btn btn-ghost w-full justify-start"
                >
                    <History size={18} />
                    View All Chats
                </Link>

                <UserMenu />


            </div>

        </aside>
    );
}