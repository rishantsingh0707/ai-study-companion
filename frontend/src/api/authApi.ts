import api from "./client";
import type { AuthResponse } from "../types/auth";

export const googleLogin = async (credential: string): Promise<AuthResponse> => {
  const { data } = await api.post("/api/auth/google", {
    credential,
  });

  return data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post(
    "/api/auth/login",
    credentials
  );

  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/api/auth/profile");
  return data.user;
};

export const logout = async () => {
  await api.post("/api/auth/logout");
};

export const register = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  const { data } = await api.post(
    "/api/auth/register",
    user
  );

  return data;
};