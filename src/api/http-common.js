import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://restaurant-review-mern-backend.vercel.app/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export default API;
