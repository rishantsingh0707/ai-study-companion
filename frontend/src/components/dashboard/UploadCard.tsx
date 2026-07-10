import {
    type DragEvent,
    useRef,
    useState,
} from "react";

import { UploadCloud } from "lucide-react";

type UploadCardProps = {
    onFileSelect: (files: File[]) => void;
    disabled?: boolean;
};

export default function UploadCard({ onFileSelect, disabled = false }: UploadCardProps) {

    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const [isDragging, setIsDragging] =
        useState(false);

    const handleChooseFile = () => {
        if (disabled) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (disabled) return;

        const files = Array.from(e.target.files ?? []);

        if (files.length === 0) return;

        onFileSelect(files);

        e.target.value = "";
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (disabled) return;

        setIsDragging(true);
    };

    const handleDragLeave = () => {

        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {

        e.preventDefault();

        setIsDragging(false);

        if (disabled) return;

        const files = Array.from(e.dataTransfer.files);

        if (files.length === 0) return;

        onFileSelect(files);
    };

    return (
        <>
            <input
                hidden
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
            />

            <div
                onClick={handleChooseFile}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
            group
            flex
            h-72
            w-full
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-3xl
            border-2
            border-dashed
            transition-all
            duration-300

            ${disabled ? "pointer-events-none opacity-60" : ""}

            ${isDragging
                        ? `
                  border-primary
                  bg-primary/10
                  scale-[1.01]
                  shadow-[0_0_50px_rgba(124,58,237,.35)]
                `
                        : `
                  border-primary/30
                  bg-base-200
                  hover:border-primary
                  hover:bg-base-300
                  hover:shadow-[0_0_35px_rgba(124,58,237,.2)]
                `
                    }
        `}
            >

                <UploadCloud
                    size={70}
                    className={`
            text-primary
            transition-all
            duration-300

            ${isDragging
                            ? "scale-125"
                            : "group-hover:scale-110"
                        }
          `}
                />

                <h2 className="mt-6 text-2xl font-semibold">

                    {isDragging
                        ? "Drop your document here"
                        : "Upload Your Document"}

                </h2>

                <p className="mt-3 text-base-content/70">

                    {isDragging
                        ? "Release to upload"
                        : "Click anywhere or drag & drop"}

                </p>

                <p className="mt-2 text-sm text-base-content/40">

                    PDF • DOC • DOCX • TXT

                </p>

            </div>
        </>
    );
}