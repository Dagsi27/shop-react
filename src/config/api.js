import axios from "axios";
import { useNavigate } from "react-router-dom";
import localStorageService from "../services/localStorage.service";
import { useUser } from "../context/UserContext";

export const API_URL = "/api/";

const useApiInstance = (contentType) => {
  const { token, logout } = useUser();
  const navigate = useNavigate();
  
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": contentType,
    },
  });
  
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  instance.interceptors.response.use(
    (response) => response,
    (error) => {

      if (error.response?.status === 401 || error.response?.status === 403) {
        logout();
        localStorageService.clear();
        navigate('/login'); 
      }
      return Promise.reject(error);
    }
  );
  
  return instance;
};

export const useApiJson = () => useApiInstance("application/json");
export const useApiMultipart = () => useApiInstance("multipart/form-data");
export const useApi = () => useApiInstance("");