import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        question: {
            type: String,
            required: true,
        },

        answer: {
            type: String,
            required: true,
        },

        documentIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Document",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Chat", chatSchema);