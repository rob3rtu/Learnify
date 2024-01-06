import axios from "axios";

export const BASE_URL = "http://localhost:3001/graphql";

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("learnifyToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      localStorage.removeItem("learnifyToken");
      window.location.reload();
    } else {
      return Promise.reject(err);
    }
  }
);
