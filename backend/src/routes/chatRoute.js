import express from "express";

import protect
    from "../middleware/authMiddleware.js";

import { chatWithDocuments }
    from "../controllers/chatController.js";

import { generateAnswer } from "../services/chatService.js";


const router = express.Router();

router.post("/:chatId", protect, chatWithDocuments);

router.get("/test-groq",
    async (req, res) => {

        const answer =
            await generateAnswer(
                "Say hello",
                ["hello world"]
            );

        res.json(answer);
    });


export default router;