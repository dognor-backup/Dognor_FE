import { useMutation } from "@tanstack/react-query";
import { login } from "@/domains/auth/api/auth";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

export const useLogin = (setValidationError) => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { user } = useUserStore;
  return useMutation({
    mutationFn: login,
    onSuccess: ({ success, data }) => {
      if (success) {
        const { userSeq, userId, userRole, name, accessToken } = data.data;
        setUser({ userSeq, userId, userRole, name, accessToken });
        console.log("Updated user:", useUserStore.getState().user);
        localStorage.setItem("accessToken", accessToken);
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
