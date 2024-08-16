// src/middleware/Admin/axiosInstance.ts
import axios from "axios";
import { BASE_URL, REACT_APP_AUTH_TOKEN } from "../../utils";

console.log("Using Authorization Token:", REACT_APP_AUTH_TOKEN);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${REACT_APP_AUTH_TOKEN}`,
  },
});

export default axiosInstance;
