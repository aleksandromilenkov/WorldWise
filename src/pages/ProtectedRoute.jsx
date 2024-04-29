import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    !isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate]);
  return children;
};

export default ProtectedRoute;
