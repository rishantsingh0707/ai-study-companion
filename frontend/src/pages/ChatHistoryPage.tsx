import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { MessageSquare, Search, FileText } from "lucide-react";
import { getRecentChats } from "../api/chatApi";
import { Skeleton, SkeletonCircle } from "../components/common/Skeleton";
import type { Chat } from "../types/chat";

const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;

    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const groupLabel = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const diffDays = Math.floor(
        (startOfDay(now).getTime() - startOfDay(date).getTime()) / 86400000
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return "Previous 7 days";
    if (diffDays < 30) return "Previous 30 days";
    return "Older";
};

function ChatHistorySkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-200 p-4"
                >
                    <SkeletonCircle className="h-10 w-10 shrink-0" />
                    <div className="flex-1">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="mt-2 h-3 w-1/5" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function ChatHistoryPage() {
    const [search, setSearch] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["chats"],
        queryFn: getRecentChats,
    });

    const chats: Chat[] = data?.chats ?? [];

    const filtered = useMemo(() => {
        if (!search.trim()) return chats;
        const q = search.trim().toLowerCase();
        return chats.filter((chat) => chat.title?.toLowerCase().includes(q));
    }, [chats, search]);

    const grouped = useMemo(() => {
        const groups: Record<string, Chat[]> = {};

        filtered.forEach((chat) => {
            const label = groupLabel(chat.updatedAt);
            if (!groups[label]) groups[label] = [];
            groups[label].push(chat);
        });

        return groups;
    }, [filtered]);

    const groupOrder = ["Today", "Yesterday", "Previous 7 days", "Previous 30 days", "Older"];

    return (
        <div className="mx-auto max-w-3xl px-6 py-10">
            <h1 className="text-3xl font-bold">Chat History</h1>
            <p className="mt-1 text-base-content/60">
                Every conversation you've had with your documents.
            </p>

            <div className="relative mt-6">
                <Search
                    size={18}
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-base-content/40"
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search chats..."
                    className="input w-full rounded-xl bg-base-200 pl-11"
                />
            </div>

            <div className="mt-8">
                {isLoading ? (
                    <ChatHistorySkeleton />
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-20 text-center text-base-content/50">
                        <MessageSquare size={36} />
                        <p>
                            {search
                                ? "No chats match your search."
                                : "No chats yet — upload a document to get started."}
                        </p>
                    </div>
                ) : (
                    groupOrder
                        .filter((label) => grouped[label]?.length)
                        .map((label) => (
                            <div key={label} className="mb-8">
                                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-base-content/50">
                                    {label}
                                </h2>

                                <div className="flex flex-col gap-2">
                                    {grouped[label].map((chat) => (
                                        <Link
                                            key={chat._id}
                                            to={`/dashboard/chat/${chat._id}`}
                                            className="
                                                flex items-center gap-4 rounded-2xl border border-base-300
                                                bg-base-200 p-4 transition-colors duration-200
                                                hover:border-primary/40 hover:bg-base-300
                                            "
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                <FileText size={18} className="text-primary" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium">{chat.title}</p>
                                                <p className="mt-0.5 text-sm text-base-content/50">
                                                    {chat.messages?.length ?? 0} messages
                                                </p>
                                            </div>

                                            <span className="shrink-0 text-xs text-base-content/40">
                                                {formatRelativeTime(chat.updatedAt)}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
}