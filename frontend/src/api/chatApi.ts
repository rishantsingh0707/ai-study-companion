import api from "./client";

export const getRecentChats = async () => {
    const { data } = await api.get("/api/chats");

    return data;
};