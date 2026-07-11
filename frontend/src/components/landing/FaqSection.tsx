import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What file types can I upload?",
        answer: "PDF, DOCX and TXT files are supported right now. Drop one in and it starts processing immediately.",
    },
    {
        question: "Does the AI make things up?",
        answer:
            "No — answers are generated only from the content retrieved from your uploaded document. If something isn't in there, LearnIQ tells you it isn't, instead of guessing.",
    },
    {
        question: "What can I generate besides chat answers?",
        answer:
            "Summaries, quizzes, flashcards, interview questions, simplified explanations, and structured study notes — all pulled from the same document.",
    },
    {
        question: "Is my data private?",
        answer:
            "Your documents and chats are tied to your account and stored in the app's own database — they aren't shared with other users.",
    },
    {
        question: "What AI model powers it?",
        answer: "LearnIQ runs on Groq-hosted LLaMA models for fast, low-latency responses.",
    },
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="relative scroll-mt-32 px-6 py-28">
            <div className="mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <div className="badge badge-primary badge-outline mb-4 px-4 py-3">
                        FAQ
                    </div>
                    <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                        Common
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {" "}questions
                        </span>
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                key={faq.question}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="glass-card overflow-hidden rounded-2xl"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-medium">{faq.question}</span>
                                    <ChevronDown
                                        size={18}
                                        className={`shrink-0 text-primary transition-transform duration-300 ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-6 pb-5 text-sm leading-6 text-base-content/70">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}