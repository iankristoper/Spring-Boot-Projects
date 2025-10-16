import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const fetchAllReports = () => API.get("/api/reports/fetch_all");
export const updateReportStatus = (id) => API.put(`/api/admin/update/report-status/${id}`);
export const archiveReport = (id) => API.put(`/api/admin/update/archive-status/${id}`);
export const deleteReport = (id) => API.delete(`/api/admin/report/delete/${id}`);
