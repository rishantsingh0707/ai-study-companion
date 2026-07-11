import {
    Brain,
    FileQuestion,
    FileText,
    GraduationCap,
    MessageSquare,
    Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../providers/AuthProvider";
import UploadCard from "./UploadCard";
import DashboardStats from "./DashboardStats";
import { uploadDocuments } from "../../api/documentApi";
import { runWithStagedProgress } from "../../utils/uploadStages";


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
    const navigate = useNavigate();
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (files: File[]) => {
        setIsUploading(true);
        const toastId = toast.loading(`Uploading ${files.length} file${files.length > 1 ? "s" : ""}...`);

        const stopStaging = runWithStagedProgress((label) => {
            toast.loading(label, { id: toastId });
        });

        try {
            const uploaded = await uploadDocuments(files);
            stopStaging();

            const successful = uploaded.filter(
                (doc) => doc.processingStatus === "completed"
            );

            if (successful.length === 0) {
                toast.error("Failed to process the uploaded file(s)", {
                    id: toastId,
                });
                return;
            }

            toast.success("Uploaded successfully! You can start chatting now.", {
                id: toastId,
            });

            // The chat isn't created yet — it's created once the user sends
            // their first message, titled after the file they just uploaded.
            navigate("/dashboard/chat/new", {
                state: {
                    readyDocuments: successful.map((doc) => ({
                        _id: doc._id,
                        title: doc.title,
                        fileType: doc.fileType,
                        fileSize: doc.fileSize,
                    })),
                },
            });
        } catch {
            stopStaging();
            toast.error("Upload failed. Please try again.", { id: toastId });
        } finally {
            setIsUploading(false);
        }
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
                    Upload your study material and let LearnIQ transform it
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
                    disabled={isUploading}
                />

            </section>

            {/* Features */}

            <section className="mt-12">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-semibold">
                        What can LearnIQ do?
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