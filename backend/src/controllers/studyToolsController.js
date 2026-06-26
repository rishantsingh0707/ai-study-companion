import Document from "../models/Document.js";
import { generateSummary, generateQuiz, generateFlashcards, generateInterviewQuestions, explainLikeIm10 } from "../services/studyToolsService.js";

export const getSummary = async (req, res) => {
    try {
        const document = await Document.findOne({
            _id: req.params.documentId,
            userId: req.user._id,
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        const summary = await generateSummary(document.content);

        res.json({
            success: true,
            summary,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate summary",
        });
    }
};

export const getQuiz = async (req, res) => {

    try {

        const document =
            await Document.findOne({
                _id: req.params.documentId,
                userId: req.user._id,
            });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        const {
            difficulty = "easy",
            count = 10,
        } = req.body;

        const allowed =
            ["easy", "medium", "hard"];

        if (!allowed.includes(difficulty)) {
            return res.status(400).json({
                success: false,
                message: "Invalid difficulty",
            });
        }

        const quiz =
            await generateQuiz(
                document.content,
                difficulty,
                count
            );

        res.json({
            success: true,
            difficulty,
            ...quiz,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to generate quiz",
        });
    }
};

export const getFlashcards = async (req, res) => {
    try {
        const document = await Document.findOne({
            _id: req.params.documentId,
            userId: req.user._id,
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        const { count = 20 } = req.body;

        const flashcards =
            await generateFlashcards(
                document.content,
                count
            );

        res.json({
            success: true,
            flashcards,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to generate flashcards",
        });
    }
};

export const getInterviewQuestions = async (req, res) => {

    try {

        const document =
            await Document.findOne({
                _id: req.params.documentId,
                userId: req.user._id,
            });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        const {
            difficulty = "easy",
            count = 10,
        } = req.body;

        const allowed =
            ["easy", "medium", "hard"];

        if (!allowed.includes(difficulty)) {
            return res.status(400).json({
                success: false,
                message: "Invalid difficulty",
            });
        }

        const questions =
            await generateInterviewQuestions(
                document.content,
                difficulty,
                count
            );

        res.json({
            success: true,
            difficulty,
            ...questions,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to generate interview questions",
        });
    }
};

export const getSimpleExplanation = async (req, res) => {

    try {

        const document =
            await Document.findOne({
                _id: req.params.documentId,
                userId: req.user._id,
            });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        const explanation =
            await explainLikeIm10(
                document.content
            );

        res.json({
            success: true,
            explanation,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to generate explanation",
        });
    }
};