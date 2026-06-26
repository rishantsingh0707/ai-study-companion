import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    getSummary,
} from "../controllers/studyToolsController.js";

const router = express.Router();

router.post("/summary/:documentId", protect, getSummary);

export default router;