import { searchRelevantChunks } from "../services/searchService.js";
import { streamAnswer } from "../services/chatService.js";
import { deleteCache } from "../services/cacheService.js";

import Chat from "../models/Chat.js";
import Document from "../models/Document.js";

export const chatWithDocuments = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required",
            });
        }

        const chat = await Chat.findOne({
            _id: req.params.chatId,
            userId: req.user._id,
        });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        const document = await Document.findOne({
            _id: chat.documentId,
            userId: req.user._id,
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        chat.messages.push({
            role: "user",
            content: question,
        });

        const chunks = await searchRelevantChunks(
            question,
            req.user._id,
            chat.documentId
        );

        if (!chunks.length) {
            return res.status(404).json({
                success: false,
                message: "No relevant document context found",
            });
        }

        const history = chat.messages
            .slice(-10)
            .map((msg) => ({
                role: msg.role,
                content: msg.content,
            }));

        res.setHeader(
            "Content-Type",
            "text/event-stream"
        );

        res.setHeader(
            "Cache-Control",
            "no-cache"
        );

        res.setHeader(
            "Connection",
            "keep-alive"
        );

        res.flushHeaders();

        const stream = await streamAnswer(
            question,
            chunks,
            history
        );

        let answer = "";

        for await (const chunk of stream) {
            const token =
                chunk.choices?.[0]?.delta?.content || "";

            if (!token) continue;

            answer += token;

            res.write(
                `data: ${JSON.stringify({
                    token,
                })}\n\n`
            );
        }

        chat.messages.push({
            role: "assistant",
            content: answer,
        });

        if (chat.title === "New Chat") {
            chat.title = question.slice(0, 50);
        }

        await chat.save();

        await deleteCache(
            `chat:${chat._id}`
        );

        await deleteCache(
            `user:${req.user._id}:chat-list`
        );

        res.write(
            `data: ${JSON.stringify({
                done: true,
                sources: chunks,
            })}\n\n`
        );

        res.end();

    } catch (error) {

        console.error(error);

        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: "Failed to generate answer",
            });
        }

        res.write(
            `data: ${JSON.stringify({
                error: "Failed to generate answer",
            })}\n\n`
        );

        res.end();
    }
};