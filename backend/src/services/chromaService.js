import chroma from "../config/chroma.js";

export const getCollection =
    async () => {
        return await chroma.getOrCreateCollection(
            {
                name:
                    "study-companion-documents",
            }
        );
    };