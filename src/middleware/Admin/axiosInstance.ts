// src/utils/axiosConfig.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem("authData");
    const token = authData ? JSON.parse(authData).token : null;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No token found in localStorage.");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
