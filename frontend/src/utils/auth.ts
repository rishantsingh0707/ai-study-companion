export const TOKEN_KEY = "nexa_token";

export const getToken = () =>
  sessionStorage.getItem(TOKEN_KEY);

export const saveToken = (token: string) =>
  sessionStorage.setItem(TOKEN_KEY, token);

export const removeToken = () =>
  sessionStorage.removeItem(TOKEN_KEY);