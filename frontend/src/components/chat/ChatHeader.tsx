import { useState, useRef, useEffect } from "react";
import { FileText, ChevronDown, File } from "lucide-react";
import type { ChatDocument } from "../../types/chat";

type ChatHeaderProps = {
    title: string;
    documents: ChatDocument[];
};

const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
};

export default function ChatHeader({ title, documents }: ChatHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative px-4 py-2">
            <div className="flex items-center justify-between">
                <h1 className="truncate text-base font-semibold">{title}</h1>

                <div className="relative" ref={panelRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="btn btn-ghost btn-xs rounded-xl flex items-center gap-1.5 text-base-content/60"
                    >
                        <FileText size={16} />
                        <span>
                            {documents.length} file{documents.length === 1 ? "" : "s"}
                        </span>
                        <ChevronDown
                            size={14}
                            className={`transition-transform  ${isOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg">
                            {documents.length === 0 ? (
                                <p className="px-2 py-3 text-center text-sm text-base-content/50">
                                    No files attached yet
                                </p>
                            ) : (
                                <ul className="max-h-64 space-y-1 overflow-y-auto">
                                    {documents.map((doc) => (
                                        <li
                                            key={doc._id}
                                            className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm hover:bg-base-200"
                                        >
                                            <File size={16} className="shrink-0 text-primary" />
                                            <span className="flex-1 truncate">{doc.title}</span>
                                            {doc.fileSize && (
                                                <span className="shrink-0 text-xs text-base-content/40">
                                                    {formatFileSize(doc.fileSize)}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}