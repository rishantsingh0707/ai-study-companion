import {
    Brain,
    FileQuestion,
    FileText,
    GraduationCap,
    MessageSquare,
    Sparkles,
} from "lucide-react";
import { useAuth } from "../../providers/AuthProvider";
import UploadCard from "./UploadCard";
import DashboardStats from "./DashboardStats";


const features = [
    {
        title: "AI Chat",
        description: "Ask questions about your uploaded notes.",
        icon: MessageSquare,
    },
    {
        title: "Summary",
        description: "Generate concise summaries instantly.",
        icon: FileText,
    },
    {
        title: "Quiz",
        description: "Practice with AI-generated quizzes.",
        icon: FileQuestion,
    },
    {
        title: "Flashcards",
        description: "Revise concepts faster using flashcards.",
        icon: Brain,
    },
    {
        title: "Interview",
        description: "Prepare with interview questions.",
        icon: GraduationCap,
    },
    {
        title: "Explain Like I'm 10",
        description: "Understand difficult concepts easily.",
        icon: Sparkles,
    },
];

export default function WelcomeScreen() {
    const { user } = useAuth();

    const handleUpload = (files: File[]) => {
        console.log(files);

    };
    return (
        <div className="ml-4 mt-4 flex min-h-full flex-col">

            {/* Greeting */}

            <section>

                <h1 className="text-4xl font-bold">
                    Welcome back,
                    <span className="text-primary">
                        {" "}
                        {user?.name}
                    </span>
                    👋
                </h1>

                <p className="mt-3 max-w-2xl text-base-content/70">
                    Upload your study material and let Nexa transform it
                    into an interactive AI tutor.
                </p>

            </section>

            {/* Greeting */}

            ...

            {/* Stats */}

            <section className="mt-8">

                <DashboardStats />

            </section>

            {/* Upload Card */}

            <section className="mt-10">

                <UploadCard
                    onFileSelect={handleUpload}
                />

            </section>

            {/* Features */}

            <section className="mt-12">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-semibold">
                        What can Nexa do?
                    </h2>

                    <span className="text-sm text-base-content/60">
                        Available after uploading a document
                    </span>

                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="
                  rounded-2xl
                  border
                  border-base-300
                  bg-base-200
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary/50
                "
                            >

                                <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">

                                    <Icon
                                        size={24}
                                        className="text-primary"
                                    />

                                </div>

                                <h3 className="text-lg font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-base-content/65">
                                    {feature.description}
                                </p>

                            </div>
                        );

                    })}

                </div>

            </section>

        </div>
    );
}