import Chat from "../models/Chat.js";
import Document from "../models/Document.js";
import {
    getCache,
    setCache,
    deleteCache
} from "../services/cacheService.js";


export const createChat = async (req, res) => {
    try {

        // Accept either a single documentId or an array documentIds
        const { documentId, documentIds, title } = req.body;

        const ids = Array.isArray(documentIds)
            ? documentIds
            : documentId
                ? [documentId]
                : [];

        if (ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one documentId is required",
            });
        }

        const documents = await Document.find({
            _id: { $in: ids },
            userId: req.user._id,
        });

        if (documents.length !== ids.length) {
            return res.status(404).json({
                success: false,
                message: "One or more documents were not found",
            });
        }

        const chat = await Chat.create({
            userId: req.user._id,
            documentIds: ids,
            title: title?.trim() || documents[0]?.title || "New Chat",
            messages: [],
        });

        await deleteCache(
            `user:${req.user._id}:chat-list`
        );

        const chatObj = chat.toObject();
        chatObj.documents = documents.map((doc) => ({
            _id: doc._id,
            title: doc.title,
            fileType: doc.fileType,
            fileSize: doc.fileSize,
        }));

        res.status(201).json({
            success: true,
            chat: chatObj,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create chat",
        });
    }
};

export const addDocumentsToChat = async (req, res) => {
    try {
        const { documentIds } = req.body;

        const ids = Array.isArray(documentIds) ? documentIds : [];

        if (ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "documentIds array is required",
            });
        }

        const chat = await Chat.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        const documents = await Document.find({
            _id: { $in: ids },
            userId: req.user._id,
        });

        if (documents.length !== ids.length) {
            return res.status(404).json({
                success: false,
                message: "One or more documents were not found",
            });
        }

        const existing = new Set(chat.documentIds.map((id) => id.toString()));
        ids.forEach((id) => existing.add(id.toString()));
        chat.documentIds = Array.from(existing);

        await chat.save();

        await deleteCache(`user:${req.user._id}:chat:${chat._id}`);
        await deleteCache(`user:${req.user._id}:chat-list`);

        const allDocuments = await Document.find({
            _id: { $in: chat.documentIds },
        });

        const chatObj = chat.toObject();
        chatObj.documents = allDocuments.map((doc) => ({
            _id: doc._id,
            title: doc.title,
            fileType: doc.fileType,
            fileSize: doc.fileSize,
        }));

        res.json({
            success: true,
            chat: chatObj,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to attach documents to chat",
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

    const documents = await Document.find({
        _id: { $in: chat.documentIds },
    });

    const chatObj = chat.toObject();
    chatObj.documents = documents.map((doc) => ({
        _id: doc._id,
        title: doc.title,
        fileType: doc.fileType,
        fileSize: doc.fileSize,
    }));

    await setCache(
        cacheKey,
        chatObj
    );

    res.json({
        success: true,
        source: "mongodb",
        chat: chatObj,
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

        res.json({
            success: true,
            stats: {
                documents,
                chats,
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