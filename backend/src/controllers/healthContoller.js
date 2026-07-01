import mongoose from "mongoose";
import {redisClient} from "../config/redis.js";
import { getCollection } from "../services/chromaService.js";
import { groq } from "../config/groq.js";

export const healthCheck = async (req, res) => {
    const health = {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        services: {},
    };

    try {
        health.services.mongodb =
            mongoose.connection.readyState === 1
                ? "connected"
                : "disconnected";

        health.services.redis =
            redisClient.isReady
                ? "connected"
                : "disconnected";

        try {
            await getCollection();

            health.services.chroma =
                "connected";
        } catch {
            health.services.chroma =
                "disconnected";
        }

        try {
            await groq.models.list();

            health.services.groq =
                "connected";
        } catch {
            health.services.groq =
                "disconnected";
        }

        const unhealthy =
            Object.values(
                health.services
            ).includes("disconnected");

        if (unhealthy) {
            health.status =
                "degraded";

            return res
                .status(503)
                .json(health);
        }

        return res.json(health);

    } catch (error) {

        return res
            .status(500)
            .json({
                status: "unhealthy",
                error: error.message,
            });
    }
};