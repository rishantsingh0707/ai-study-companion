import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import Chunk from "../models/Chunk.js";
import chroma from "../config/chroma.js";
import { generateEmbedding } from "../services/embeddingService.js";
import { getCollection, } from "../services/chromaService.js";
import { searchRelevantChunks } from "../services/searchService.js";
import { uploadDocument, } from "../controllers/documentController.js";

const router = express.Router();

router.post("/upload", protect, upload.array("files", 10), uploadDocument);

router.get("/test-chroma-add", async (req, res) => {
    try {
        const collection =
            await getCollection();

        await collection.add({
            ids: ["test-1"],

            embeddings: [
                [0.1, 0.2, 0.3]
            ],

            documents: [
                "TCP is a transport layer protocol"
            ],

            metadatas: [
                {
                    source: "test"
                }
            ]
        });

        res.json({
            success: true
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.post("/search", async (req, res) => {

    const { query } = req.body;

    const results =
        await searchRelevantChunks(
            query
        );

    res.json(results);
}
);

router.delete("/reset-chroma", async (req, res) => {
    await chroma.deleteCollection({
        name: "study-companion-documents",
    });

    res.json({
        success: true,
    });
});

export default router;