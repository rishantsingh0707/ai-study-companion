import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
connectRedis();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());

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
app.use("/api/documents", documentRoutes);


// Auth Routes
import authRoutes
  from "./routes/authRoute.js";
app.use("/api/auth", authRoutes);

// Create NEW Chat
import chatRoutes
  from "./routes/chatRoute.js";
app.use("/api/chat", chatRoutes);

// Chat History Routes
import chatHistoryRoutes
  from "./routes/chatHistoryRoute.js";

app.use(
  "/api/chats",
  chatHistoryRoutes
);
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});