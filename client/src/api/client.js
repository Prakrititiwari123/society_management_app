import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4500/api",
});

api.interceptors.request.use((config) => {
  const storedAuth = localStorage.getItem("societyAuth") || sessionStorage.getItem("societyAuth");

  if (storedAuth) {
    try {
      const parsedAuth = JSON.parse(storedAuth);
      if (parsedAuth?.token) {
        config.headers.Authorization = `Bearer ${parsedAuth.token}`;
      }
    } catch {
      localStorage.removeItem("societyAuth");
    }
  }

  return config;
});

export const saveAuth = (authData) => {
  const storage = authData?.remember ? localStorage : sessionStorage;
  storage.setItem("societyAuth", JSON.stringify(authData));
};

export const getAuth = () => {
  const storedAuth = localStorage.getItem("societyAuth") || sessionStorage.getItem("societyAuth");

  if (!storedAuth) {
    return null;
  }

  try {
    return JSON.parse(storedAuth);
  } catch {
    localStorage.removeItem("societyAuth");
    sessionStorage.removeItem("societyAuth");
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem("societyAuth");
  sessionStorage.removeItem("societyAuth");
};

export default api;