import mongoose from "mongoose";

const embeddingSchema =
    new mongoose.Schema(
        {
            chunkId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Chunk",
                required: true,
            },

            documentId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "Document",
                required: true,
            },

            userId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            vector: {
                type: [Number],
                required: true,
            },
        },
        {
            timestamps: true,
        }
    );

export default mongoose.model(
    "Embedding",
    embeddingSchema
);