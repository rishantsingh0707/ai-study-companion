import Document from "../models/Document.js";
import Chunk from "../models/Chunk.js";
import { extractText } from "../services/textExtractionService.js";
import { chunkText } from "../services/chunkingService.js";
import { generateEmbedding } from "../services/embeddingService.js";
import { storeChunkEmbedding } from "../services/chromaService.js";

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
            let document = null;

            try {
                const text = await extractText(file);

                const cleanedText = text
                    .replace(/\s+/g, " ")
                    .trim();

                const chunks = chunkText(cleanedText);

                document = await Document.create({
                    userId: req.user._id,
                    title: file.originalname,
                    fileType: file.mimetype,
                    fileSize: file.size,
                    content: cleanedText,
                    processingStatus: "pending",
                });

                for (let i = 0; i < chunks.length; i++) {

                    // Create a chunk document in the CROMA
                    const chunk = await Chunk.create({
                        documentId: document._id,

                        userId: req.user._id,

                        content: chunks[i],

                        chunkIndex: i,
                    });

                    const embedding = await generateEmbedding(chunk.content);

                    await storeChunkEmbedding({
                        chunkId: chunk._id,

                        documentId:
                            document._id,

                        userId:
                            req.user._id,

                        content:
                            chunk.content,

                        embedding,
                    });
                }

                document.processingStatus = "completed";
                await document.save();

                uploadedDocuments.push(document);

            } catch (error) {
                console.error(
                    `Failed to process ${file.originalname}:`,
                    error.message
                );

                if (document) {
                    document.processingStatus = "failed";
                    await document.save();

                    uploadedDocuments.push(document);
                } else {
                    const failedDocument =
                        await Document.create({
                            userId: req.user._id,
                            title: file.originalname,
                            fileType: file.mimetype,
                            fileSize: file.size,
                            content: "",
                            processingStatus: "failed",
                        });

                    uploadedDocuments.push(
                        failedDocument
                    );
                }
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
