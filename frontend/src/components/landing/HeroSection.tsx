import {
  ArrowRight,
  Brain,
  FileText,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useInViewport } from "../../hooks/useInViewport";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ref: sectionRef, isVisible } = useInViewport<HTMLElement>(0.15);

  // Pause video decode entirely once the hero scrolls out of view (or the
  // tab isn't active) — this is what was competing with the background
  // animation for GPU time and causing the stutter/buffering feeling.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {
        // Autoplay can be rejected before user interaction — harmless here.
      });
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen overflow-hidden"
    >

      {/* Background Video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 h-full w-full object-cover brightness-60 contrast-100 saturate-100"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}

      <div className="absolute inset-0 z-0 bg-black/55" />

      {/* Gradient Overlay */}

      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[`#09090B`]/95 via-[`#09090B`]/70 to-transparent" />

      {/* Hero Content */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >

          {/* Badge */}

          <div className="badge badge-primary badge-outline mb-6 px-5 py-4">
            AI Powered Learning
          </div>

          {/* Heading */}

          <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">

            Study Smarter

            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">

              with LearnIQ

            </span>

          </h1>

          {/* Description */}

          <p className="mt-8 max-w-2xl text-lg leading-8 text-base-content/80">

            Upload your notes, chat with AI, generate summaries,
            quizzes, flashcards and interview questions.
            Everything you need to study better in one place.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/login"
              className="
                btn
                border-0
                bg-gradient-to-r
                from-primary
                to-secondary
                px-8
                text-white
                shadow-[0_0_30px_rgba(124,58,237,.45)]
                transition-all
                duration-300
                hover:scale-105
              "
            >
              Get Started

              <ArrowRight size={18} />

            </Link>

          </div>

          {/* Features */}

          <div className="mt-12 flex flex-wrap gap-8 text-base-content/80">

            <div className="flex items-center gap-2">

              <FileText size={18} />

              PDF / DOCX

            </div>

            <div className="flex items-center gap-2">

              <Brain size={18} />

              Flashcards

            </div>

            <div className="flex items-center gap-2">

              <Sparkles size={18} />

              AI Quiz

            </div>

          </div>

        </motion.div>

      </div>

      {/* Scroll Indicator */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          duration: 1,
        }}
        className="
          absolute
          bottom-10
          left-1/2
          z-20
          -translate-x-1/2
          text-center
        "
      >

        <p className="mb-2 text-sm text-white/70">

          Scroll to explore

        </p>

        <div className="mx-auto h-10 w-6 rounded-full border border-white/30">

          <motion.div
            animate={{
              y: [2, 18, 2],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
            }}
            className="
              mx-auto
              mt-2
              h-2
              w-2
              rounded-full
              bg-white
            "
          />

        </div>

      </motion.div>

    </section >
  );
}