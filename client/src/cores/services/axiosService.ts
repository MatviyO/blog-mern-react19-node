import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:4444/",
});

Api.interceptors.request.use((config) => {
  const userL = localStorage.getItem("user");
  if (userL) {
    const { token } = JSON.parse(userL);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;
