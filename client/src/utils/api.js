import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API functions
export const rentalAPI = {
    // Create a rental request
    create: async (rentalData) => {
        const response = await api.post("/rentals/create", rentalData);
        return response.data;
    },

    // Get all rental requests
    getAll: async () => {
        const response = await api.get("/rentals");
        return response.data;
    },

    // Get current user's rental requests
    getUserRentals: async () => {
        const response = await api.get("/rentals/user");
        return response.data;
    }
};

export const authAPI = {
    signup: async (userData) => {
        const response = await api.post("/auth/signup", userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        return response.data;
    }
};

export default api;
