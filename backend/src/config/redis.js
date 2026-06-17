import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Connection Successful");
  } catch (error) {
    console.error("Redis Connection Failed:", error.message);
  }
};

export { redisClient, connectRedis };