import chroma from "../config/chroma.js";

export const getCollection = async () => {
    return await chroma.getOrCreateCollection({
        name:
            "study-companion-documents",
    });
};

export const storeChunkEmbedding = async ({ chunkId, documentId, userId, content, embedding, }) => {
    const collection =
        await getCollection();

    await collection.add({
        ids: [chunkId.toString()],

        embeddings: [embedding],

        documents: [content],

        metadatas: [
            {
                documentId:
                    documentId.toString(),

                userId:
                    userId.toString(),

            },
        ],
    });
};