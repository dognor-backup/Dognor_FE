import apiInstance from "@/core/api/apiInstance";
import { login } from "@/core/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      apiInstance.defaults.headers.Authorization = "Bearer ".concat(
        localStorage.getItem("accessToken")
      );
    },
    onError: (error) => {
      alert(error.message || "로그인 실패");
      console.error("Login error:", error);
    },
  });
};
