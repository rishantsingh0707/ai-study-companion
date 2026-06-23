import { generateEmbedding }
from "./embeddingService.js";

import { getCollection }
from "./chromaService.js";

export const searchRelevantChunks =
async (query, limit = 3) => {

    const embedding =
        await generateEmbedding(query);

    const collection =
        await getCollection();

    const results =
        await collection.query({
            queryEmbeddings: [embedding],
            nResults: limit,
        });

    return results;
};