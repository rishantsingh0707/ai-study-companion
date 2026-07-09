import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { User, Sparkles } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "../../types/chat";

type ChatMessageProps = {
    message: ChatMessageType;
};

export default function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === "user";

    return (
        <div
            className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
        >
            <div
                className={`
                    flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                    ${isUser ? "bg-primary/20 text-primary" : "bg-base-300 text-base-content/70"}
                `}
            >
                {isUser ? <User size={18} /> : <Sparkles size={18} />}
            </div>

            <div
                className={`
                    max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6
                    ${isUser
                        ? "bg-primary text-primary-content"
                        : "bg-base-200 text-base-content"}
                `}
            >
                <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code(props) {
                                const { className, children, ...rest } = props as {
                                    className?: string;
                                    children?: React.ReactNode;
                                    inline?: boolean;
                                };

                                const match = /language-(\w+)/.exec(className || "");
                                const isInline = (props as { inline?: boolean }).inline;

                                if (!isInline && match) {
                                    return (
                                        <SyntaxHighlighter
                                            style={oneDark}
                                            language={match[1]}
                                            PreTag="div"
                                            customStyle={{
                                                borderRadius: "0.75rem",
                                                fontSize: "0.8rem",
                                            }}
                                        >
                                            {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>
                                    );
                                }

                                return (
                                    <code
                                        className="rounded bg-base-300 px-1 py-0.5"
                                        {...rest}
                                    >
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}