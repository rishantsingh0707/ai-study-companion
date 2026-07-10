import { Skeleton, SkeletonCircle } from "./Skeleton";

// Mimics the dashboard shell (sidebar + content) so the very first paint
// while auth/session is resolving doesn't just show a blank screen or
// a plain "Loading..." string.
export default function AppShellSkeleton() {
    return (
        <div className="flex h-screen bg-base-100">
            {/* Sidebar */}
            <div className="hidden w-72 flex-col border-r border-base-300 p-4 md:flex">
                <Skeleton className="mb-6 h-10 w-full" />

                <div className="flex flex-col gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-9 w-full" />
                    ))}
                </div>

                <div className="mt-auto flex items-center gap-3 border-t border-base-300 pt-4">
                    <SkeletonCircle className="h-9 w-9" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-8">
                <Skeleton className="mb-8 h-8 w-64" />

                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-28 w-full rounded-3xl" />
                    <Skeleton className="h-28 w-full rounded-3xl" />
                </div>

                <Skeleton className="mt-8 h-72 w-full rounded-3xl" />
            </div>
        </div>
    );
}