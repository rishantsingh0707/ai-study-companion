import { useRef, useState, type KeyboardEvent } from "react";
import { Paperclip, Send, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { uploadDocuments, type UploadedDocument } from "../../api/documentApi";
import { addDocumentsToChat } from "../../api/chatApi";
import { runWithStagedProgress } from "../../utils/uploadStages";
import type { Chat, ChatDocument } from "../../types/chat";

type UploadItem = {
    id: string;
    name: string;
    status: "processing" | "ready" | "failed";
    statusLabel: string;
};

type ChatInputProps = {
    // null while the chat doesn't exist yet (pending "new chat" mode)
    chatId: string | null;
    canSend: boolean;
    onSend: (question: string) => void;
    onDocumentReady: (doc: ChatDocument) => void;
    onDocumentsAttached: (chat: Chat) => void;
    disabled: boolean;
};

export default function ChatInput({
    chatId,
    canSend,
    onSend,
    onDocumentReady,
    onDocumentsAttached,
    disabled,
}: ChatInputProps) {
    const [question, setQuestion] = useState("");
    const [uploads, setUploads] = useState<UploadItem[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    const processFile = async (file: File) => {
        const itemId = `${file.name}-${Date.now()}-${Math.random()}`;

        setUploads((prev) => [
            ...prev,
            { id: itemId, name: file.name, status: "processing", statusLabel: "Uploading file..." },
        ]);

        const stopStaging = runWithStagedProgress((label) => {
            setUploads((prev) =>
                prev.map((u) =>
                    u.id === itemId && u.status === "processing" ? { ...u, statusLabel: label } : u
                )
            );
        });

        try {
            const uploaded: UploadedDocument[] = await uploadDocuments([file]);
            const doc = uploaded[0];

            if (!doc || doc.processingStatus === "failed") {
                stopStaging();
                setUploads((prev) =>
                    prev.map((u) =>
                        u.id === itemId ? { ...u, status: "failed", statusLabel: "Failed to process" } : u
                    )
                );
                toast.error(`Failed to process ${file.name}`);
                return;
            }

            if (chatId) {
                // Chat already exists — attach the document to it right away
                const updatedChat = await addDocumentsToChat(chatId, [doc._id]);
                onDocumentsAttached(updatedChat);
            } else {
                // No chat yet — hand the ready document up so it can be used
                // to create the chat once the user sends their first message
                onDocumentReady({
                    _id: doc._id,
                    title: doc.title,
                    fileType: doc.fileType,
                    fileSize: doc.fileSize,
                });
            }

            stopStaging();
            setUploads((prev) =>
                prev.map((u) =>
                    u.id === itemId
                        ? { ...u, status: "ready", statusLabel: "Uploaded successfully" }
                        : u
                )
            );

            toast.success(`${file.name} is ready to ask about`);
        } catch {
            stopStaging();
            setUploads((prev) =>
                prev.map((u) =>
                    u.id === itemId ? { ...u, status: "failed", statusLabel: "Failed to process" } : u
                )
            );
            toast.error(`Failed to process ${file.name}`);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        e.target.value = "";

        if (files.length === 0) return;

        files.forEach((file) => {
            processFile(file);
        });
    };

    const removeUpload = (id: string) => {
        setUploads((prev) => prev.filter((u) => u.id !== id));
    };

    const isAnyFileProcessing = uploads.some((u) => u.status === "processing");

    const handleSend = () => {
        const trimmed = question.trim();

        if (!trimmed || disabled) return;

        onSend(trimmed);
        setQuestion("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-base-300 bg-base-100 p-4">
            {uploads.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                    {uploads.map((u) => (
                        <div
                            key={u.id}
                            className="flex items-center gap-2 rounded-full bg-base-200 px-3 py-1.5 text-xs"
                        >
                            {u.status === "processing" && (
                                <Loader2 size={14} className="animate-spin text-primary" />
                            )}
                            {u.status === "ready" && <CheckCircle2 size={14} className="text-success" />}
                            {u.status === "failed" && <AlertCircle size={14} className="text-error" />}

                            <span className="max-w-[120px] truncate font-medium">{u.name}</span>
                            <span className="text-base-content/50">{u.statusLabel}</span>

                            <button
                                type="button"
                                onClick={() => removeUpload(u.id)}
                                className="text-base-content/50 hover:text-error"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-end gap-2 rounded-2xl border border-base-300 bg-base-200 p-2">
                <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                />

                <button
                    type="button"
                    onClick={handleAttachClick}
                    disabled={disabled}
                    className="btn btn-ghost btn-circle btn-sm shrink-0"
                    title="Attach a file"
                >
                    <Paperclip size={18} />
                </button>

                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                        canSend
                            ? "Ask a question about your document..."
                            : "Attach a file to get started..."
                    }
                    rows={1}
                    disabled={disabled}
                    className="max-h-40 min-h-[2.25rem] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-base-content/40"
                />

                <button
                    type="button"
                    onClick={handleSend}
                    disabled={disabled || !question.trim() || isAnyFileProcessing || !canSend}
                    className="btn btn-primary btn-circle btn-sm shrink-0"
                    title={
                        !canSend
                            ? "Attach a file first"
                            : isAnyFileProcessing
                                ? "Wait for the file to finish processing"
                                : "Send"
                    }
                >
                    {disabled ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
            </div>

            <p className="mt-2 text-center text-xs text-base-content/40">
                Attach PDF, DOC, DOCX or TXT files — they start processing as soon as you select them
            </p>
        </div>
    );
}