import { useQuery } from "@tanstack/react-query";
import { History, MessageSquare, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { getRecentChats } from "../api/chatApi";
import UserMenu from "../components/common/UserMenu";

type Chat = {
    _id: string;
    title: string;
};

type SidebarContentProps = {
    onNavigate?: () => void;
};

function SidebarContent({ onNavigate }: SidebarContentProps) {
    const location = useLocation();
    const activeChatId = location.pathname.match(/\/dashboard\/chat\/([^/]+)/)?.[1];

    const { data, isLoading } = useQuery({
        queryKey: ["chats"],
        queryFn: getRecentChats,
    });

    const recentChats = data?.chats?.slice(0, 8) ?? [];

    return (
        <>
            {/* Logo Section */}
            <div className="border-b border-base-300 p-4">
                <Link
                    to="/"
                    onClick={onNavigate}
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
                    onClick={onNavigate}
                    className={`btn flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm text-base-content ${
                        !activeChatId || activeChatId === "new"
                            ? "btn-primary"
                            : "btn-outline"
                    }`}
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
                    <div className="space-y-1">
                        {recentChats.map((chat: Chat) => {
                            const isActive = chat._id === activeChatId;

                            return (
                                <Link
                                    key={chat._id}
                                    to={`/dashboard/chat/${chat._id}`}
                                    onClick={onNavigate}
                                    className={`btn w-full justify-start gap-2 ${
                                        isActive ? "btn-active bg-base-300" : "btn-ghost"
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
            <div className="space-y-3 border-t border-base-300 p-4">
                <Link
                    to="/dashboard/history"
                    onClick={onNavigate}
                    className="btn btn-ghost w-full justify-start"
                >
                    <History size={18} />
                    View All Chats
                </Link>

                <UserMenu />
            </div>
        </>
    );
}

export default function Sidebar() {
    return (
        <aside className="hidden w-72 flex-col border-r border-base-300 bg-base-200 md:flex">
            <SidebarContent />
        </aside>
    );
}

export function MobileSidebar({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <aside className="relative flex h-full w-72 max-w-[85%] flex-col bg-base-200 shadow-2xl">
                <SidebarContent onNavigate={onClose} />
            </aside>
        </div>
    );
}