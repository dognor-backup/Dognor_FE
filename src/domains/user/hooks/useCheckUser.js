import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../api/user";

export const useCheckUser = (setValidationError) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: checkUser,
    onSuccess: ({ success }) => {
      if (success) {
        navigate("/accountsettings");
      } else {
        setValidationError("error");
      }
    },

    onError: () => {
      setValidationError("error");
    },
  });
};
