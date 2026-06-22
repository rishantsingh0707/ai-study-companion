import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import Chunk from "../models/Chunk.js";
import { generateEmbedding } from "../services/embeddingService.js";
import { getCollection, } from "../services/chromaService.js";

import { uploadDocument, } from "../controllers/documentController.js";

const router = express.Router();

router.post("/upload", protect, upload.array("files", 10), uploadDocument);

router.get("/test-chroma", async (
    req,
    res
) => {
    const collection =
        await getCollection();

    res.json({
        name: collection.name,
    });
});


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
export default router;