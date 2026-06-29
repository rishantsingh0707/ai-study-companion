import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    getSummary,
    getQuiz,
    getFlashcards,
    getInterviewQuestions,
    getSimpleExplanation,
    getNotes
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

router.post(
    "/flashcards/:documentId",
    protect,
    getFlashcards
);

router.post(
    "/interview/:documentId",
    protect,
    getInterviewQuestions
);

router.post(
    "/explain/:documentId",
    protect,
    getSimpleExplanation
);

router.post(
    "/notes/:documentId",
    protect,
    getNotes
);
export default router;