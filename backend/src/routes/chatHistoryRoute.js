import express from "express";

import {
    createChat,
    getChats,
    getChat,
} from "../controllers/chatHistoryController.js";

import protect
    from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createChat);

router.get("/", protect, getChats);

router.get("/:id", protect, getChat);

export default router;