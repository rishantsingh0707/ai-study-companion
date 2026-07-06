import { generateEmbedding } from "./embeddingService.js";
import { getCollection } from "./chromaService.js";

export const searchRelevantChunks = async (
    query,
    userId,
    documentIds,
    limit = 3
) => {

    if (!Array.isArray(documentIds)) {

        if (!documentIds) {
            documentIds = [];
        } else {
            documentIds = [documentIds];
        }

    }

    if (documentIds.length === 0) {
        return [];
    }

    const embedding =
        await generateEmbedding(query);

    const collection =
        await getCollection();

    const results =
        await collection.query({

            queryEmbeddings: [embedding],

            nResults: limit,

            where: {

                $and: [

                    {
                        userId: userId.toString(),
                    },

                    {
                        documentId: {
                            $in: documentIds.map(id =>
                                id.toString()
                            ),
                        },
                    },

                ],

            },

        });

    return {
        documents: results?.documents?.[0] ?? [],
        metadatas: results?.metadatas?.[0] ?? [],
    };

};