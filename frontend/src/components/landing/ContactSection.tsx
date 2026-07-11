import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { GitBranchIcon, Mail, Send } from "lucide-react";

// Replace with your real contact details
const CONTACT_EMAIL = "rishant3333@gmail.com";
const GITHUB_URL = "https://github.com/rishantsingh0707";

export default function ContactSection() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const subject = encodeURIComponent(`Message from ${name || "LearnIQ visitor"}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    };

    return (
        <section id="contact" className="relative scroll-mt-32 px-6 py-28">
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="badge badge-primary badge-outline mb-4 px-4 py-3">
                            Contact
                        </div>
                        <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                            Questions, bugs,
                            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                or ideas?
                            </span>
                        </h2>
                        <p className="mt-6 max-w-md text-base leading-7 text-base-content/70">
                            Send a message and it'll open straight in your email client —
                            or find the project on GitHub.
                        </p>

                        <div className="mt-8 flex flex-col gap-3">
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="flex w-fit items-center gap-3 text-sm text-base-content/70 transition hover:text-primary"
                            >
                                <Mail size={18} />
                                {CONTACT_EMAIL}
                            </a>
                            <a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="flex w-fit items-center gap-3 text-sm text-base-content/70 transition hover:text-primary"
                            >
                                <GitBranchIcon size={18} />
                                View on GitHub
                            </a>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        onSubmit={handleSubmit}
                        className="glass-card flex flex-col gap-4 rounded-2xl p-6"
                    >
                        <div>
                            <label htmlFor="contact-name" className="mb-1.5 block text-sm text-base-content/70">
                                Name
                            </label>
                            <input
                                id="contact-name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input w-full rounded-xl bg-base-200/50"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="contact-email" className="mb-1.5 block text-sm text-base-content/70">
                                Email
                            </label>
                            <input
                                id="contact-email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input w-full rounded-xl bg-base-200/50"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="contact-message" className="mb-1.5 block text-sm text-base-content/70">
                                Message
                            </label>
                            <textarea
                                id="contact-message"
                                required
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="textarea w-full rounded-xl bg-base-200/50"
                                placeholder="What's on your mind?"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary mt-2 gap-2 rounded-xl"
                        >
                            Send message
                            <Send size={16} />
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}