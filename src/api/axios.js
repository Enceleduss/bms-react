import axios from "axios";
const BASE_URL = "http://localhost:9046";
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const axiosWithCreds = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export default axios.create({
  baseURL: BASE_URL,
});
