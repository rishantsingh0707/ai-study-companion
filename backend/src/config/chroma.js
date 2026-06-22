import { ChromaClient } from "chromadb";

const chroma = new ChromaClient({
    path: "http://localhost:8000",
});


export default chroma;