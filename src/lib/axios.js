import axios from "axios";
import { host } from "./host";

const containsFiles = (data) => {
    if (typeof data !== "object" || data === null) return false;

    for (const key in data) {
        const value = (data)[key];
        if (value instanceof File || value instanceof Blob) {
            return true;
        }
    }
    return false;
};

const API = axios.create({ baseURL: host });

API.interceptors.request.use((config) => {
    let token = ""

    if (typeof window !== "undefined") {
        const stored = localStorage.getItem(process.env.PROJECT_STORAGE || "oybek_course") ;
        token = stored ? stored?.token || "" : "";
    }

    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (containsFiles(config.data)) config.headers["Content-Type"] = "multipart/form-data";
    else config.headers["Content-Type"] = "application/json";

    config.headers["Frontend-Path"] = window.location.pathname

    return config;
}, (error) => Promise.reject(error));

API.interceptors.response.use((response) => response, (error) => Promise.reject(error));

export default API;