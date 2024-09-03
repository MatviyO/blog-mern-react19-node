import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:4444/posts",
});

export default Api;
