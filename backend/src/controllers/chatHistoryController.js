import Chat from "../models/Chat.js";
import Document from "../models/Document.js";

export const createChat = async (req, res) => {
    try {

        const { documentId } = req.body;

        console.log("User:", req.user._id);
        console.log("Document:", documentId);

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
    try {
        const chat =
            await Chat.findOne({
                _id: req.params.id,
                userId: req.user._id,
            });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found, please check the chat ID and try again",
            });
        }

        res.json({
            success: true,
            chat,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve chat",
        });
    }
};

export const getChats = async (req, res) => {

    const chats =
        await Chat.find({
            userId: req.user._id,
        });

    if (chats.length === 0) {
        return res.status(200).json({
            success: true,
            chats: [],
            message: "No chats found, Start a new chat",
        });
    }
    res.json({
        success: true,
        chats,
    });
}
