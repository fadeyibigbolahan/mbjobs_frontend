// src/hooks/useAuthCheck.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const expiresAt = localStorage.getItem("authTokenExpiresAt");
    if (!expiresAt) {
      dispatch(logout());
      return;
    }

    const now = new Date().getTime();
    const expiresInMs = parseInt(expiresAt) - now;

    if (expiresInMs <= 0) {
      dispatch(logout());
      return;
    }

    // Auto logout after the remaining time expires
    const timeoutId = setTimeout(() => {
      dispatch(logout());
      navigate("/signin", { replace: true });
    }, expiresInMs);

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timeoutId);
  }, [dispatch]);
};

export default useAuthCheck;
