import { searchRelevantChunks } from "../services/searchService.js";
import { streamAnswer } from "../services/chatService.js";
import { deleteCache } from "../services/cacheService.js";
import { getStudyMode } from "../config/studyModes.js";

import Chat from "../models/Chat.js";
import Document from "../models/Document.js";

export const chatWithDocuments = async (req, res) => {
    try {
        const { question: rawQuestion, mode } = req.body;

        const studyMode = mode ? getStudyMode(mode) : null;

        if (mode && !studyMode) {
            return res.status(400).json({
                success: false,
                message: "Invalid mode",
            });
        }

        const question = rawQuestion?.trim() || studyMode?.defaultQuestion;

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

        if (
            !Array.isArray(chat.documentIds) ||
            chat.documentIds.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "No documents attached to this chat",
            });
        }

        chat.messages.push({
            role: "user",
            content: question,
        });

        const chunks = await searchRelevantChunks(
            question,
            req.user._id,
            chat.documentIds
        );

        if (!chunks.documents || chunks.documents.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No relevant document context found",
            });
        }

        const history = chat.messages
            .slice(0, -1)
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


        const stream = await streamAnswer(
            question,
            chunks.documents,
            history,
            studyMode?.instruction
        );

        res.flushHeaders();
        let answer = "";

        for await (const chunk of stream) {
            const token =
                chunk.choices?.[0]?.delta?.content || "";

            if (!token) continue;

            answer += token;

            const canContinue = res.write(
                `data: ${JSON.stringify({
                    token,
                })}\n\n`
            );

            if (!canContinue) {
                await new Promise((resolve) => {
                    res.once("drain", resolve);
                });
            }
        }

        chat.messages.push({
            role: "assistant",
            content: answer,
        });

        await chat.save();

        await deleteCache(
            `user:${req.user._id}:chat:${chat._id}`
        );

        await deleteCache(
            `user:${req.user._id}:chat-list`
        );

        const sources = chunks.documents.map((content, i) => ({
            content,
            ...(chunks.metadatas?.[i] || {}),
        }));

        res.write(
            `data: ${JSON.stringify({
                done: true,
                sources,
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