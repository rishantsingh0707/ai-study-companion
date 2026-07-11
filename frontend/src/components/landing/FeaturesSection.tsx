import { motion } from "framer-motion";
import {
    Upload,
    Sparkles,
    MessageCircle,
    BookOpen,
    HelpCircle,
    Layers,
    Briefcase,
    Smile,
    StickyNote,
} from "lucide-react";

const pipeline = [
    {
        step: "01",
        title: "Upload",
        description: "Drop in a PDF, DOCX or TXT file.",
        icon: Upload,
    },
    {
        step: "02",
        title: "Embed",
        description: "It's chunked and embedded the moment you select it.",
        icon: Sparkles,
    },
    {
        step: "03",
        title: "Ask",
        description: "Chat about it, grounded only in what's on the page.",
        icon: MessageCircle,
    },
];

const studyModes = [
    { label: "Summary", description: "The key ideas, distilled.", icon: BookOpen },
    { label: "Quiz", description: "Multiple choice, with answers marked.", icon: HelpCircle },
    { label: "Flashcards", description: "Question and answer pairs to drill.", icon: Layers },
    { label: "Interview Qs", description: "Practice questions with pointers.", icon: Briefcase },
    { label: "Explain Like I'm 10", description: "Same content, no jargon.", icon: Smile },
    { label: "Notes", description: "Structured, scannable, revision-ready.", icon: StickyNote },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="relative scroll-mt-32 px-6 py-28">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl"
                >
                    <div className="badge badge-primary badge-outline mb-4 px-4 py-3">
                        Features
                    </div>
                    <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                        Your notes, turned into
                        <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            answers and study tools
                        </span>
                    </h2>
                </motion.div>

                {/* Pipeline */}
                <div className="mt-16 grid gap-6 md:grid-cols-3">
                    {pipeline.map((item, index) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card relative rounded-2xl p-6"
                        >
                            <span className="font-mono text-sm text-primary/60">
                                {item.step}
                            </span>
                            <div className="mt-3 mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                                <item.icon size={20} className="text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="mt-1.5 text-sm text-base-content/70">
                                {item.description}
                            </p>

                            {index < pipeline.length - 1 && (
                                <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-gradient-to-r from-primary/40 to-transparent md:block" />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Study modes grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {studyModes.map((mode) => (
                        <div
                            key={mode.label}
                            className="
                                flex items-start gap-4 rounded-2xl border border-white/10
                                bg-base-200/50 p-5 transition-colors duration-300
                                hover:border-primary/40 hover:bg-base-200
                            "
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                                <mode.icon size={18} className="text-accent" />
                            </div>
                            <div>
                                <p className="font-medium">{mode.label}</p>
                                <p className="mt-0.5 text-sm text-base-content/60">
                                    {mode.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}