// src/middleware/Admin/axiosInstance.ts
import axios from "axios";
import { BASE_URL } from "../../utils";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmIzODhmODZmNWViMjUyZWYwODE0ZGYiLCJpYXQiOjE3MjMxMzUzMTd9.7qCo8cnU_S0RbsbQFK5HkSHdF5bttgT8g-WW0NNuV0Y`,
  },
});

export default axiosInstance;
