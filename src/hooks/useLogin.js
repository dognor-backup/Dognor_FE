import { useMutation } from "@tanstack/react-query";
import { login } from "@/core/api/auth";
import { useNavigate } from "react-router-dom";

export const useLogin = (setValidationError) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      if (result.success) {
        localStorage.setItem("accessToken", result.data.data.accessToken);
        navigate("/home", { replace: true });
      } else {
        setValidationError("error");
      }
    },
    onError: (error) => {
      setValidationError(error.message || "error");
    },
  });
};
