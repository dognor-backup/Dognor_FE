import apiInstance from "@/core/api/apiInstance";
import { login } from "@/core/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      apiInstance.defaults.headers.Authorization = "Bearer ".concat(
        localStorage.getItem("accessToken")
      );
      navigate("/home");
    },
    onError: (error) => {
      alert(error.message || "로그인 실패");
      console.error("Login error:", error);
    },
  });
};
