import { searchRelevantChunks }
    from "../services/searchService.js";

import { generateAnswer }
    from "../services/chatService.js";

import Chat from "../models/Chat.js";

import Document
    from "../models/Document.js";

export const chatWithDocuments = async (req, res) => {

    try {

        const { question } = req.body;

        if (!question) {
            return res
                .status(400)
                .json({
                    success: false,
                    message:
                        "Question is required",
                });
        }

        const chat =
            await Chat.findOne({
                _id: req.params.chatId,
                userId: req.user._id,
            });

        if (!chat) {
            console.error(`Chat with ID ${req.params.chatId} not found for user ${req.user._id}`);
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }
        const documentId = chat.documentId;
        console.log(`Searching for document with ID ${documentId} for user ${req.user._id}`);
        const document = await Document.findOne({
            _id: documentId,
            userId: req.user._id,
        });

        if (!document) {
            console.error(`Document with ID ${documentId} not found for user ${req.user._id}`);
            return res.status(404).json({
                success: false,
                message:
                    "Document not found",
            });
        }

        chat.messages.push({
            role: "user",
            content: question,
        });

        const chunks =
            await searchRelevantChunks(
                question,
                req.user._id,
                documentId
            );
        if (!Array.isArray(chunks) || chunks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No relevant document context found for this question",
                sources: [],
            });
        }
        const history = chat.messages.slice(-10).map(msg => ({
            role: msg.role,
            content: msg.content,
        }));

        const answer = await generateAnswer(
            question,
            chunks,
            history
        );
        chat.messages.push({
            role: "assistant",
            content: answer,
        });

        if (chat.title === "New Chat") {
            chat.title = question.slice(0, 50);
        }

        await chat.save();

        // Invalidate cache for the chat and user's chat list
        await deleteCache(
            `user:${req.user._id}:chat:${chat._id}`
        );

        await deleteCache(
            `user:${req.user._id}:chat-list`
        );

        res.json({
            success: true,
            answer,
            sources: chunks,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to generate answer",
        });
    }
};