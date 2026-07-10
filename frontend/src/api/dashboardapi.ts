import api from "./client";

export const getDashboardStats = async () => {
    const { data } = await api.get("/api/chats/stats");

    return data.stats;
};