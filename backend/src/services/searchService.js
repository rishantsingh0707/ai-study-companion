import { generateEmbedding }
    from "./embeddingService.js";

import { getCollection }
    from "./chromaService.js";

export const searchRelevantChunks = async (query, userId, documentId, limit = 3) => {

    const embedding = await generateEmbedding(query);

    const collection = await getCollection();

    const results = await collection.query({
        queryEmbeddings: [embedding],
        nResults: limit,
        where: {
            $and: [
                {
                    userId: userId.toString(),
                },
                {
                    documentId: documentId.toString(),
                },
            ],
        }

    });

    return results?.documents?.[0] ?? [];

};