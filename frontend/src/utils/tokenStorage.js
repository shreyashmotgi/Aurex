// Centralized helpers for reading/writing the auth token.
// Keeping localStorage access in one place makes it easy to change
// the storage strategy later without touching every component.

const TOKEN_KEY = "token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
