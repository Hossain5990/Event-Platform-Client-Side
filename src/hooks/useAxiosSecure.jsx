
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000' 
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutUser } = useContext(AuthContext); 

  // Attach token before each request
  axiosSecure.interceptors.request.use(
    config => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  // Handle 401/403 responses
  axiosSecure.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        await signOutUser();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
