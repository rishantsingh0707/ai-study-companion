import { searchRelevantChunks }
    from "../services/searchService.js";

import { generateAnswer }
    from "../services/chatService.js";

export const chatWithDocuments =
    async (req, res) => {

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

            const chunks =
                await searchRelevantChunks(
                    question
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