import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { useAuth } from '../../context/AuthContext'

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const logoutUser = async () => {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        logout();
        navigate("/");
        return;
      }

      try {
        await axiosInstance.post("auth/logout/", { refresh: refreshToken });
        logout();
        navigate("/");
      } catch (error) {
        console.error("Logout failed", error);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        navigate("/");
      }
    };

    logoutUser();
  }, [navigate]);

  return null;
}
