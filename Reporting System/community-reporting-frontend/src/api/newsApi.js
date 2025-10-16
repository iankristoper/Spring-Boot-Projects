// src/api/newsApi.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const fetchAllNews = () => API.get("/api/news/fetch_all");
export const createNews = (data) => API.post("/api/news/create", data);
export const updateNews = (id, data) => API.put(`/api/news/update/${id}`, data);
export const deleteNews = (id) => API.delete(`/api/news/delete/${id}`);
export const publishNews = (id) => API.put(`/api/news/publish/${id}`);
export const unpublishNews = (id) => API.put(`/api/news/unpublish/${id}`);
