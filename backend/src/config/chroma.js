import { CloudClient } from "chromadb";

const chroma = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY,
    tenant: process.env.CHROMA_TENANT,
    database: process.env.CHROMA_DATABASE,
});

export default chroma;