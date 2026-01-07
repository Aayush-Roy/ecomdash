// src/api/axiosInstance.js
import axios from 'axios'
// https://ecommerce-api-tn5a.onrender.com
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
})

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')
    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance