import { useState, useEffect } from "react";
import { authAPI } from "../services/api";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await authAPI.getCurrentUser();
          setUser(response.data.user);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      localStorage.setItem("token", response.token);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });
      localStorage.setItem("token", response.token);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, loading, error, login, register, logout };
};
