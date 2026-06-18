import mammoth from "mammoth";
import { extractPdfText } from "./extractPdfText.js";

export const extractText = async (file) => {
    if (file.mimetype === "application/pdf") {
        return await extractPdfText(file.buffer);
    }

    if (
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        const result = await mammoth.extractRawText({
            buffer: file.buffer,
        });

        return result.value;
    }

    if (file.mimetype === "text/plain") {
        return file.buffer.toString("utf8");
    }

    throw new Error("Unsupported file type");
};