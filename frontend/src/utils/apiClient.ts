import axios from "axios";

// const BASE_URL = "http://localhost:3001/api/";
const BASE_URL = "https://learnify-backend-ij3e.onrender.com/";

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
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // If 401 or 403 is encountered, remove accessToken from local storage and refresh the page
      localStorage.removeItem("learnifyToken");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
