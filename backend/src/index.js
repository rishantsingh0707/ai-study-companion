import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { healthCheck } from "./controllers/healthContoller.js";

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
connectRedis();
app.get("/health", healthCheck);

app.use(cookieParser());
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