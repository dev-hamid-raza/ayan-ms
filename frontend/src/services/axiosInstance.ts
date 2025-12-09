import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

export const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const currentPath = window.location.pathname
        if (currentPath !== '/') {
            if (error.response?.status === 401) {
                console.warn('Session expired. Redirecting to login...');
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);