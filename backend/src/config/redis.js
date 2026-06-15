import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

console.log("Redis Client Created",process.env.REDIS_URL);
console.log("Redis Client Options:", process.env.MONGO_URI);

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis Connected");
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