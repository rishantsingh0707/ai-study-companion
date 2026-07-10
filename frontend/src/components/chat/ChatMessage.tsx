import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { User, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { ChatMessage as ChatMessageType } from "../../types/chat";

type ChatMessageProps = {
    message: ChatMessageType;
};

const OPTION_PATTERN = /^[A-Da-d1-4][).]\s/;

const looksLikeOptionList = (items: ReactNode[]) => {
    if (items.length < 2 || items.length > 4) return false;

    return items.every((item) => {
        const text = extractText(item);
        return text.length < 80 && OPTION_PATTERN.test(text.trim());
    });
};

const extractText = (node: ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (
        node &&
        typeof node === "object" &&
        "props" in node &&
        (node as { props?: { children?: ReactNode } }).props?.children
    ) {
        return extractText((node as { props: { children: ReactNode } }).props.children);
    }
    return "";
};

export default function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === "user";

    return (
        <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
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
                    ${isUser ? "bg-primary text-primary-content" : "bg-base-200 text-base-content"}
                `}
            >
                <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        components={{
                            h1: ({ children }) => (
                                <h1 className="mb-2 mt-5 text-xl font-bold first:mt-0">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="mb-2 mt-5 text-lg font-bold first:mt-0">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="mb-2 mt-5 text-base font-bold first:mt-0">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => (
                                <p className="mb-3 leading-7 last:mb-0">{children}</p>
                            ),
                            strong: ({ children }) => (
                                <strong className="font-semibold">{children}</strong>
                            ),
                            hr: () => <hr className="my-4 border-base-300" />,
                            ul: ({ children }) => {
                                const items = Array.isArray(children) ? children : [children];

                                if (looksLikeOptionList(items)) {
                                    return (
                                        <ul className="mb-3 grid list-none grid-cols-1 gap-x-4 gap-y-1.5 pl-0 sm:grid-cols-2">
                                            {children}
                                        </ul>
                                    );
                                }

                                return (
                                    <ul className="mb-3 list-disc space-y-1.5 pl-5 last:mb-0">
                                        {children}
                                    </ul>
                                );
                            },
                            ol: ({ children }) => (
                                <ol className="mb-3 list-decimal space-y-1.5 pl-5 last:mb-0">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="leading-6">{children}</li>
                            ),
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
                                    <code className="rounded bg-base-300 px-1 py-0.5" {...rest}>
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