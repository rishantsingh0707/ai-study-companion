import { FileText, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../../api/dashboardapi";
import { useCountUp } from "../../hooks/useCountUp";

type StatCardProps = {
    title: string;
    value: number;
    icon: React.ComponentType<{ size?: number; className?: string }>;
};

function StatCard({ title, value, icon: Icon }: StatCardProps) {
    const animatedValue = useCountUp(value);

    return (
        <div
            className="
                rounded-3xl
                border
                border-base-300
                bg-base-200
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/50
                hover:shadow-xl
            "
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-base-content/60">{title}</p>
                    <h2 className="mt-3 text-4xl font-bold tabular-nums">
                        {animatedValue}
                    </h2>
                </div>

                <div className="rounded-2xl bg-primary/10 p-4">
                    <Icon size={28} className="text-primary" />
                </div>
            </div>
        </div>
    );
}

export default function DashboardStats() {
    const { data } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: getDashboardStats,
    });

    const documents = data?.documents ?? 0;
    const chats = data?.chats ?? 0;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <StatCard title="Documents" value={documents} icon={FileText} />
            <StatCard title="Chats" value={chats} icon={MessageSquare} />
        </div>
    );
}