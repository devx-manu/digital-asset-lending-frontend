import axios from "axios";

const api = axios.create({
  baseURL: "https://digital-asset-lending-backend.onrender.com",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("dal_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || "An error occurred";
    return Promise.reject({ ...error, userMessage: message });
  }
);

export default api;
