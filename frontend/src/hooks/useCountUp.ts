import { useEffect, useRef, useState } from "react";

// Animates a number counting up from 0 to `target` over `duration` ms,
// using an ease-out curve so it starts fast and settles smoothly.
export function useCountUp(target: number, duration = 900) {
    const [value, setValue] = useState(0);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        const start = performance.now();
        const from = 0;

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setValue(Math.round(from + (target - from) * eased));

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(tick);
            }
        };

        frameRef.current = requestAnimationFrame(tick);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, duration]);

    return value;
}