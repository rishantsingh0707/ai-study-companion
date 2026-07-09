
export const UPLOAD_STAGE_MESSAGES = [
    "Uploading file...",
    "Extracting text...",
    "Splitting into chunks...",
    "Generating embeddings...",
    "Indexing your content...",
    "Preparing your chat...",
    "Almost done...",
    "Finalizing results...",
    "Getting everything ready...",
    "...."
];

export const runWithStagedProgress = (
    onStageChange: (message: string) => void,
    intervalMs = 3500
) => {
    let index = 0;
    onStageChange(UPLOAD_STAGE_MESSAGES[0]);

    const timer = setInterval(() => {
        index = Math.min(index + 1, UPLOAD_STAGE_MESSAGES.length - 1);
        onStageChange(UPLOAD_STAGE_MESSAGES[index]);
    }, intervalMs);

    return () => clearInterval(timer);
};