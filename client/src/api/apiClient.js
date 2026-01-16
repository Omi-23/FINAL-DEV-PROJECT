import axios from "axios";
import { auth } from "../firebase/firebase.config.js";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001",
  timeout: 15000
});

export function setApiAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

// Interceptor to automatically add fresh token to requests
api.interceptors.request.use(
  async (config) => {
    // Get fresh token for authenticated requests
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        // Force refresh token to ensure it's valid
        const idToken = await currentUser.getIdToken(true);
        // Always set token in request config (only if not already set manually)
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${idToken}`;
        }
      } catch (error) {
        console.error("Error getting token:", error);
        // Don't block request if token retrieval fails
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token might be expired, try to refresh
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const newToken = await currentUser.getIdToken(true);
          // Retry the original request with new token
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return api.request(error.config);
        } catch (refreshError) {
          // If refresh fails, user needs to login again
          console.error("Token refresh failed:", refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
