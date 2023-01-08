import axios from "axios";
import env from "@constants/env";

const getToken = (): string | undefined => {
  const userRaw = window.localStorage.getItem("userInfo");
  if (!userRaw) return undefined;
  const user = JSON.parse(userRaw);
  return user?.token || undefined;
};

const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 1000,
});

api.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers["Authorization"] = getToken()
        ? "Bearer " + getToken()
        : undefined;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
