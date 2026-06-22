import Document from "../models/Document.js";
import Chunk from "../models/Chunk.js";
import { extractText } from "../services/textExtractionService.js";
import { chunkText } from "../services/chunkingService.js";
import { generateEmbedding } from "../services/embeddingService.js";


export const uploadDocument = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded",
            });
        }

        const uploadedDocuments = [];

        for (const file of req.files) {
            try {
                // Extract text
                const text = await extractText(file);

                // Remove unnecessary whitespace
                const cleanedText = text
                    .replace(/\s+/g, " ")
                    .trim();

                const chunks = chunkText(
                    cleanedText
                );

                console.log(
                    `Created ${chunks.length} chunks`
                );
                const document = await Document.create({
                    userId: req.user._id,

                    title: file.originalname,

                    fileType: file.mimetype,

                    fileSize: file.size,

                    content: cleanedText,

                    processingStatus: "completed",
                });

                for (let i = 0; i < chunks.length; i++) {

                    await Chunk.create({
                        documentId: document._id,

                        userId: req.user._id,

                        content: chunks[i],

                        chunkIndex: i,
                    });
                }

                uploadedDocuments.push(document);
            } catch (error) {
                console.error(
                    `Failed to process ${file.originalname}:`,
                    error.message
                );

                const document = await Document.create({
                    userId: req.user._id,

                    title: file.originalname,

                    fileType: file.mimetype,

                    fileSize: file.size,

                    content: "",

                    processingStatus: "failed",
                });

                uploadedDocuments.push(document);
            }
        }

        res.status(201).json({
            success: true,
            count: uploadedDocuments.length,
            documents: uploadedDocuments,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to upload documents",
        });
    }
};
