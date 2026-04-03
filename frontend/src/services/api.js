import axios from "axios";

const API = axios.create({
    baseURL: "https://deptconnect-1kcc.onrender.com/api",
});

// token auto attach
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
