import { motion } from "framer-motion";
import { ShieldCheck, FileStack, Cpu } from "lucide-react";

const principles = [
    {
        icon: ShieldCheck,
        title: "Grounded, not guessed",
        description:
            "Every answer comes from what's actually in your document. If it's not there, LearnIQ says so instead of making something up.",
    },
    {
        icon: FileStack,
        title: "Works with what you have",
        description: "PDF, DOCX or TXT — upload it and start asking questions right away.",
    },
    {
        icon: Cpu,
        title: "Built on a real RAG pipeline",
        description:
            "Documents are chunked and embedded, then retrieved by relevance for every question — not just dumped into a prompt.",
    },
];

const stack = ["React", "Node.js", "MongoDB", "ChromaDB", "Groq", "Redis"];

export default function AboutSection() {
    return (
        <section id="about" className="relative scroll-mt-32 px-6 py-28">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="badge badge-primary badge-outline mb-4 px-4 py-3">
                            About
                        </div>
                        <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                            Built for how you
                            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                actually study
                            </span>
                        </h2>
                        <p className="mt-6 max-w-xl text-base leading-7 text-base-content/70">
                            LearnIQ is an AI study companion that reads your material so you
                            don't have to reread it five times. Upload a document, and it
                            becomes something you can talk to, quiz yourself on, or turn
                            into notes — grounded entirely in what you gave it.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-2">
                            {stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-white/10 bg-base-200/50 px-3 py-1 text-xs text-base-content/60"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="flex flex-col gap-4"
                    >
                        {principles.map((item) => (
                            <div
                                key={item.title}
                                className="glass-card flex items-start gap-4 rounded-2xl p-5"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                    <item.icon size={20} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="mt-1 text-sm text-base-content/70">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}