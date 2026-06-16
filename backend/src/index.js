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

import uploadRoutes from "./routes/uploadRoutes.js";
app.use("/api/files", uploadRoutes);

import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});