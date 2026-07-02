import cors from "cors";

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
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