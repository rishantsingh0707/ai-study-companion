import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Logo from "../common/Logo";
type AuthLayoutProps = {
    title: string;
    subtitle: string;
    children: ReactNode;
};

export default function AuthLayout({
    title,
    subtitle,
    children,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-screen overflow-hidden">

            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover brightness-50"
            >
                <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/65" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black/40 to-accent/20" />

            {/* Purple Glow */}
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/20 blur-[140px]" />

            {/* Cyan Glow */}
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-[140px]" />

            {/* Content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">

                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-[0_8px_40px_rgba(0,0,0,.45)]backdrop-blur-3xl"
                >
                    {/* Logo */}
                    <div className="mb-8 flex justify-center">

                        <div className="flex items-center gap-3">

                                <Logo />
                
                        </div>

                    </div>

                    {/* Heading */}
                    <div className="mb-8 text-center">

                        <h1 className="mb-2 text-3xl font-bold">
                            {title}
                        </h1>

                        <p className="text-base-content/70">
                            {subtitle}
                        </p>

                    </div>

                    {/* Form */}
                    {children}

                </motion.div>

            </div>
        </div>
    );
}