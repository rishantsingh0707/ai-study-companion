import Chat from "../models/Chat.js";
import Document from "../models/Document.js";
import {
    getCache,
    setCache,
    deleteCache
} from "../services/cacheService.js";

export const createChat = async (req, res) => {
    try {

        const { documentId } = req.body;

        if (!documentId || typeof documentId !== "string") {
            return res.status(400).json({
                success: false,
                message: "documentId is required",
            });
        }

        const document = await Document.findOne({
            _id: documentId,
            userId: req.user._id,
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        const chat = await Chat.create({
            userId: req.user._id,
            documentId,
            messages: [],
        });

        await deleteCache(
            `user:${req.user._id}:chat-list`
        );
        res.status(201).json({
            success: true,
            chat,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create chat",
        });
    }
};

export const getChat = async (req, res) => {

    const cacheKey =
        `user:${req.user._id}:chat:${req.params.id}`;

    const cached =
        await getCache(cacheKey);

    if (cached) {
        return res.json({
            success: true,
            source: "redis",
            chat: cached,
        });
    }

    const chat =
        await Chat.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

    if (!chat) {
        return res.status(404).json({
            success: false,
            message: "Chat not found",
        });
    }

    await setCache(
        cacheKey,
        chat
    );

    res.json({
        success: true,
        source: "mongodb",
        chat,
    });
};

export const getChats = async (req, res) => {

    const cacheKey =
        `user:${req.user._id}:chat-list`;

    const cached =
        await getCache(cacheKey);

    if (cached) {
        return res.json({
            success: true,
            source: "redis",
            chats: cached,
        });
    }

    const chats =
        await Chat.find({
            userId: req.user._id,
        })
            .sort({
                updatedAt: -1,
            });

    await setCache(
        cacheKey,
        chats
    );

    res.json({
        success: true,
        source: "mongodb",
        chats,
    });
};

export const getDashboardStats = async (req, res) => {
    try {

        const documents =
            await Document.countDocuments({
                userId: req.user._id,
            });

        const chats =
            await Chat.countDocuments({
                userId: req.user._id,
            });

        const userChats =
            await Chat.find({
                userId: req.user._id,
            });

        let studySessions = 0;
        let aiGenerations = 0;

        userChats.forEach((chat) => {

            studySessions +=
                chat.messages.filter(
                    (msg) =>
                        msg.role === "assistant"
                ).length;

            aiGenerations +=
                chat.studyTools?.length || 0;

        });

        res.json({
            success: true,
            stats: {
                documents,
                chats,
                studySessions,
                aiGenerations,
            },
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch dashboard statistics",
        });

    }
};