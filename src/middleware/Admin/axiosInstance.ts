// src/utils/axiosConfig.ts
import axios from "axios";
import { BASE_URL } from "../../utils";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
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
