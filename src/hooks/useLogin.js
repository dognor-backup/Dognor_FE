import { useMutation } from "@tanstack/react-query";
import { login } from "@/core/api/auth";

export const useLogin = (setErrorText) => {
  return useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      if (result.success) {
        localStorage.setItem("accessToken", result.data.data.accessToken);
        console.log("로그인 성공:", result.data);
      } else {
        setErrorText(result.msg);
      }
    },
    onError: (error) => {
      setErrorText(error.message || "로그인 요청 중 문제가 발생했습니다.");
    },
  });
};
