import express from "express";

import {
    createChat,
    getChats,
    getChat,
    getDashboardStats
} from "../controllers/chatHistoryController.js";

import protect
    from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createChat);

router.get("/", protect, getChats);

router.get("/stats", protect, getDashboardStats);

router.get("/:id", protect, getChat);


export default router;