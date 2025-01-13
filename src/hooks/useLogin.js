import { useMutation } from "@tanstack/react-query";
import { login } from "@/core/api/auth";
import { useNavigate } from "react-router-dom";

export const useLogin = (setErrorText) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ success, data }) => {
      if (success) {
        const token = data.data.accessToken;
        localStorage.setItem("accessToken", token);
        navigate("/home", { replace: true });
      } else {
        setErrorText("아이디 혹은 비밀번호가 틀렸습니다");
      }
    },
    onError: (error) => {
      const errorMsg = error.message || "로그인 요청 중 문제가 발생했습니다.";
      setErrorText(errorMsg);
    },
  });
};
