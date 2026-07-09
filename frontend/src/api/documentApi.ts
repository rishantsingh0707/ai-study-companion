import api from "./client";

export interface UploadedDocument {
    _id: string;
    title: string;
    fileType: string;
    fileSize: number;
    processingStatus: "pending" | "completed" | "failed";
}

export const uploadDocuments = async (
    files: File[]
): Promise<UploadedDocument[]> => {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });

    const { data } = await api.post("/api/documents/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data.documents;
};