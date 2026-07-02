import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import cookieParser from "cookie-parser";
import { healthCheck } from "./controllers/healthContoller.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
app.get("/health", healthCheck);

const PORT = process.env.PORT || 5000;

// CORS Middleware
import corsMiddleware from "./config/cors.js";
app.use(corsMiddleware);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running"
  });
});

// Routes

// Document Routes
import documentRoutes
  from "./routes/documentRoute.js";
app.use(
  "/api/documents",
  documentRoutes
);

// Auth Routes
import authRoutes
  from "./routes/authRoute.js";

app.use(
  "/api/auth",
  authRoutes
);

// Create NEW Chat
import chatRoutes
  from "./routes/chatRoute.js";

app.use(
  "/api/chat",
  chatRoutes
);

// Chat History Routes
import chatHistoryRoutes
  from "./routes/chatHistoryRoute.js";

app.use(
  "/api/chats",
  chatHistoryRoutes
);

// Study Tools Routes
import studyToolsRoutes
  from "./routes/studyToolsRoutes.js";

app.use(
  "/api/study-tools",
  studyToolsRoutes
);

// App Porting 

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});