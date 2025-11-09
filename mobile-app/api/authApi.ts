// api/authApi.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "https://localhost:7017/api/Auth"; // Change si tu utilises ngrok plus tard

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post("/login", data);
  return response.data;
};

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem("userToken", token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem("userToken");
};

export const logout = async () => {
  await AsyncStorage.removeItem("userToken");
};

export default api;
