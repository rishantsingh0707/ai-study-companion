import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {

    const chat =
        await Chat.create({
            userId: req.user._id,
            messages: [],
        });

    res.status(201).json({
        success: true,
        chat,
    });
};

export const getChat = async (req, res) => {

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
