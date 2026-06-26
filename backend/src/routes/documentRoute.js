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