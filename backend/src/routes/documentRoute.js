import express from "express";

import protect from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

import { uploadDocument, } from "../controllers/documentController.js";

const router = express.Router();

router.post("/upload", protect, upload.array("files", 10), uploadDocument);

export default router;