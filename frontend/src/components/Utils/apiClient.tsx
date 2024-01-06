import axios, { AxiosInstance } from "axios";

export const BASE_URL = "http://localhost:3001/graphql";

export const getAccesToken = () => {
  return localStorage.getItem("lernifyToken");
};

const errorInterceptor = (val: AxiosInstance) => {
  val.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        localStorage.removeItem("lernifyToken");
        window.location.reload();
      } else {
        return Promise.reject(err);
      }
    }
  );
};

export const authorise = () => {
  return {
    headers: {
      Authorization: `Bearer ${getAccesToken()}`,
    },
  };
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

errorInterceptor(apiClient);
