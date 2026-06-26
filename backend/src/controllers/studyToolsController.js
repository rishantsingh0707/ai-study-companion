import Document from "../models/Document.js";
import { generateSummary } from "../services/studyToolsService.js";

export const getSummary = async (req, res) => {
    try {
        const document = await Document.findOne({
            _id: req.params.documentId,
            userId: req.user._id,
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        const summary = await generateSummary(document.content);

        res.json({
            success: true,
            summary,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate summary",
        });
    }
};