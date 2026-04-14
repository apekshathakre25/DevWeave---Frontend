import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token || token === "undefined" || token === "null") {
    return null;
  }

  return token;
};

export const setAuthToken = (token) => {
  if (!token) {
    localStorage.removeItem("token");
    return;
  }

  localStorage.setItem("token", token);
};

export const clearAuthToken = () => {
  localStorage.removeItem("token");
};

export const getAuthConfig = () => {
  const token = getAuthToken();

  if (!token) {
    return null;
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
