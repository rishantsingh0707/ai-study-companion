import cors from "cors";

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173"
].filter(Boolean);

export default cors({
    origin(origin, callback) {

        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        callback(
            new Error("Not allowed by CORS")
        );
    },

    credentials: true,

    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization",
    ],
});