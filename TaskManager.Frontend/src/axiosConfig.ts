// src/axiosConfig.ts
import axios from "axios";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base URL for API requests
});

// Attach token dynamically on each request
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
