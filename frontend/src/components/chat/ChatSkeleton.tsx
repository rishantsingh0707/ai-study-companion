import { Skeleton, SkeletonCircle } from "../common/Skeleton";

// Mimics 3 alternating chat bubbles so the layout doesn't jump once
// real messages arrive.
export function ChatMessagesSkeleton() {
    const bubbles = [
        { align: "left", width: "60%" },
        { align: "right", width: "40%" },
        { align: "left", width: "70%" },
    ] as const;

    return (
        <div className="flex flex-col gap-6 px-2 py-4">
            {bubbles.map((bubble, i) => (
                <div
                    key={i}
                    className={`flex gap-3 ${
                        bubble.align === "right" ? "flex-row-reverse" : "flex-row"
                    }`}
                >
                    <SkeletonCircle className="h-9 w-9 shrink-0" />
                    <div
                        className="flex flex-col gap-2 rounded-2xl bg-base-200 p-3"
                        style={{ width: bubble.width }}
                    >
                        <Skeleton className="h-3.5 w-full" />
                        <Skeleton className="h-3.5 w-5/6" />
                        <Skeleton className="h-3.5 w-2/3" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ChatHeaderSkeleton() {
    return (
        <div className="flex items-center justify-between border-b border-base-300 px-4 py-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-7 w-24 rounded-full" />
        </div>
    );
}