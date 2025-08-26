// src/api.ts
import axios from "axios";

// Create axios instance
const api = axios.create({
  // baseURL is not required if proxy is configured
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or sessionStorage / cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
