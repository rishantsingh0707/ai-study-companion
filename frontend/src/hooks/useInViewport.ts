import { useEffect, useRef, useState } from "react";

// Tracks whether an element is currently visible in the viewport AND
// whether the browser tab itself is active. Used to pause expensive
// video/WebGL work when neither is true — this is what actually fixes
// "buffering" stutter: two GPU-heavy things (video decode + an animated
// canvas) competing for the same frame budget at once.
export function useInViewport<T extends HTMLElement>(threshold = 0.1) {
    const ref = useRef<T | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [isTabVisible, setIsTabVisible] = useState(
        typeof document !== "undefined" ? !document.hidden : true
    );

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsIntersecting(entry.isIntersecting),
            { threshold }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    useEffect(() => {
        const handleVisibilityChange = () => setIsTabVisible(!document.hidden);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () =>
            document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    return { ref, isVisible: isIntersecting && isTabVisible };
}