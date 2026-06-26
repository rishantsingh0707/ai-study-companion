import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    getSummary,
    getQuiz
} from "../controllers/studyToolsController.js";

const router = express.Router();

router.post("/summary/:documentId",
    protect,
    getSummary
);


router.post(
    "/quiz/:documentId",
    protect,
    getQuiz
);
export default router;