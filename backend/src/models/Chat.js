import mongoose from "mongoose";

const messageSchema =
    new mongoose.Schema(
        {
            role: {
                type: String,
                enum: [
                    "user",
                    "assistant",
                ],
                required: true,
            },

            content: {
                type: String,
                required: true,
            },
        },
        {
            _id: false,
        }
    );

const chatSchema =
    new mongoose.Schema(
        {
            userId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            title: {
                type: String,
                default:
                    "New Chat",
            },
            documentId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Document",
                required: true,
            },
            messages: [
                messageSchema,
            ],
        },
        {
            timestamps: true,
        }
    );

export default mongoose.model(
    "Chat",
    chatSchema
);