import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7122/api/",
});

export default api;
