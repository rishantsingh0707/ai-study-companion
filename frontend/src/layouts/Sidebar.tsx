import { useQuery } from "@tanstack/react-query";
import { History, MessageSquare, Plus, Settings } from "lucide-react";
import { Link } from "react-router-dom";

import api from "../api/client";

type Chat = {
    _id: string;
    title: string;
};

export default function Sidebar() {
    const { data, isLoading } = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            const { data } = await api.get("/api/chats");
            return data;
        },
    });

    const recentChats = data?.chats?.slice(0, 5) ?? [];

    return (
        <aside className="hidden w-72 flex-col border-r border-base-300 bg-base-200 md:flex">

            {/* Header */}
            <Link
                to="/dashboard/chat/new"
                className="btn btn-primary w-full"
            >
                <Plus size={18} />
                New Chat
            </Link>

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
            <div className="space-y-2 border-t border-base-300 p-4">

                <Link
                    to="/dashboard/history"
                    className="btn btn-ghost w-full justify-start"
                >
                    <History size={18} />
                    View All Chats
                </Link>

                <Link
                    to="/dashboard/settings"
                    className="btn btn-ghost w-full justify-start"
                >
                    <Settings size={18} />
                    Settings
                </Link>

            </div>

        </aside>
    );
}