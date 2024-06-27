import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});



axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Accept = "application/json";
      config.headers["Content-Type"] = "application/json";
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (request) => {
    request.headers["Content-Type"] = "application/json";
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
