import { searchRelevantChunks }
    from "../services/searchService.js";

import { generateAnswer }
    from "../services/chatService.js";

import Chat from "../models/Chat.js";


export const chatWithDocuments = async (req, res) => {

    try {

        const { question } =
            req.body;

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
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }
        chat.messages.push({
            role: "user",
            content: question,
        });
        const chunks =
            await searchRelevantChunks(
                question,
                req.user._id
            );
        if (!Array.isArray(chunks) || chunks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No relevant document context found for this question",
                sources: [],
            });
        }

        const answer =
            await generateAnswer(
                question,
                chunks
            );
        chat.messages.push({
            role: "assistant",
            content: answer,
        });

        if (chat.title === "New Chat") {
            chat.title = question.slice(0, 50);
        }

        await chat.save();

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