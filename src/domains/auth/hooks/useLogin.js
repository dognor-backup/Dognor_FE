import { useMutation } from "@tanstack/react-query";
import { login } from "@/domains/auth/api/auth";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { saveUserToDB } from "@/domains/auth/utils/indexedDB";

export const useLogin = (setValidationError) => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: login,
    onSuccess: async ({ success, data }, variables) => {
      const { rememberMe } = variables; 
      
      if (success) {
        const { userSeq, userId, userRole, name, accessToken } = data.data;

        setUser({ userSeq, userId, userRole, name, accessToken });

        await saveUserToDB({ userSeq, userId, userRole, name, accessToken }, rememberMe);
        console.log("유저 정보가 IndexedDB에 저장되었습니다.");

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
