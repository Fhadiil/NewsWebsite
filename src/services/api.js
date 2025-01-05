import axios from "axios";

const API = axios.create({
  baseURL: "https://newswebsite-backend-d4ve.onrender.com/api/",
});

export default API;
