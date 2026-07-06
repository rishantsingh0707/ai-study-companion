import {
  FileText,
  MessageSquare,
  Brain,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Documents",
    value: 0,
    icon: FileText,
  },
  {
    title: "Chats",
    value: 0,
    icon: MessageSquare,
  },
  {
    title: "Study Sessions",
    value: 0,
    icon: Brain,
  },
  {
    title: "AI Generations",
    value: 0,
    icon: Sparkles,
  },
];

export default function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
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

                <p className="text-sm text-base-content/60">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {stat.value}
                </h2>

              </div>

              <div
                className="
                  rounded-2xl
                  bg-primary/10
                  p-4
                "
              >
                <Icon
                  size={28}
                  className="text-primary"
                />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}