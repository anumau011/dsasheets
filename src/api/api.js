import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized");

      // logout()
      // navigate("/login")
    }

    return Promise.reject(error);
  }
);

export const apiHandler = async (apiCall) => {
  try {
    const response = await apiCall();
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      message:
        error.response?.data?.message || error.message,
    };
  }
};

export default api;