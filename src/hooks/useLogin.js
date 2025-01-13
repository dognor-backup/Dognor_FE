import { useMutation } from "@tanstack/react-query";
import { login } from "@/core/api/auth";
import { useNavigate } from "react-router-dom";

export const useLogin = (setValidationError) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: ({ success, data }) => {
      if (success) {
        const token = data.data.accessToken;
        localStorage.setItem("accessToken", token);
        navigate("/home", { replace: true });
      } else {
        setValidationError("error");
      }
    },

    onError: () => {
      setValidationError("error");
    },
  });
};
