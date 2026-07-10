type SkeletonProps = {
    className?: string;
};

// Base building block — daisyUI's `.skeleton` class gives the pulsing
// shimmer animation. Compose this into shapes for each part of the UI.
export function Skeleton({ className = "" }: SkeletonProps) {
    return <div className={`skeleton rounded-lg ${className}`} />;
}

export function SkeletonCircle({ className = "" }: SkeletonProps) {
    return <div className={`skeleton rounded-full ${className}`} />;
}

export function SkeletonText({
    lines = 1,
    className = "",
}: {
    lines?: number;
    className?: string;
}) {
    return (
        <div className="flex flex-col gap-2">
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className={`skeleton h-4 rounded ${className} ${i === lines - 1 && lines > 1 ? "w-2/3" : "w-full"
                        }`}
                />
            ))}
        </div>
    );
}